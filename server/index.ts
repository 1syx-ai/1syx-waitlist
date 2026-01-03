import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { serveStatic } from "./static";
import { createServer } from "http";
import session from "express-session";
import memorystore from "memorystore";
import { appendToSheet, ensureHeaders } from "./lib/googleSheets.js";
import {
  getLinkedInAuthUrl,
  exchangeCodeForToken,
  createLinkedInPostWithImage,
} from "./lib/linkedin.js";
import { randomBytes } from "crypto";
import { join } from "path";
import { existsSync } from "fs";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

declare module "express-session" {
  interface SessionData {
    linkedinState?: string;
    pendingFormData?: any;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

// Session middleware for OAuth state management
const MemoryStore = memorystore(session);

app.use(
  session({
    name: "1syx.session", // Named session cookie for easier debugging
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    secret: process.env.SESSION_SECRET || "your-secret-key-change-in-production",
    resave: true, // Force save on every request to ensure persistence
    saveUninitialized: true, // Save even uninitialized sessions (needed for OAuth flow)
    rolling: true, // Reset expiration on activity
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax", // Important for OAuth redirects
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: "/", // Ensure cookie is sent for all paths
    },
  })
);

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

// Temporary store for OAuth state (fallback if session cookie is lost)
// This is cleared after use for security
const oauthStateStore = new Map<string, { state: string; formData: any; timestamp: number }>();

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  const maxAge = 10 * 60 * 1000; // 10 minutes
  const keys = Array.from(oauthStateStore.keys());
  for (const key of keys) {
    const value = oauthStateStore.get(key);
    if (value && now - value.timestamp > maxAge) {
      oauthStateStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

// Waitlist form submission endpoint
app.post("/api/waitlist/submit", async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      linkedin,
      hierarchy,
      function: functionField,
      companySize,
      useCase,
      painPoint,
      currentSolution,
      suggestions,
      wantsUpgrade,
    } = req.body;

    // Validate required fields
    if (!name || !email || !linkedin || !hierarchy || !functionField) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Get Google Sheet ID from environment variable or use default
    const spreadsheetId =
      process.env.GOOGLE_SHEET_ID ||
      "1OaF6GBIK7wn61t5TbWrpxEaqT4V-1wgzDDEqhosMpFw";
    const sheetName = process.env.GOOGLE_SHEET_NAME || "Sheet1";

    // Define headers
    const headers = [
      "Timestamp",
      "Name",
      "Email",
      "LinkedIn",
      "Hierarchy",
      "Function",
      "Company Size",
      "Primary Goal (Next 90 Days)",
      "Biggest Pain Point",
      "Current Solution",
      "Suggestions",
      "Wants Upgrade",
    ];

    // Ensure headers exist
    await ensureHeaders(spreadsheetId, sheetName, headers);

    // Prepare row data
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      name || "",
      email || "",
      linkedin || "",
      hierarchy || "",
      functionField || "",
      companySize || "",
      useCase || "",
      painPoint || "",
      currentSolution || "",
      suggestions || "",
      wantsUpgrade || "no",
    ];

    // Append to sheet
    await appendToSheet(spreadsheetId, `${sheetName}!A:Z`, [rowData]);

    log(`Waitlist submission received: ${email}`);

    res.json({
      success: true,
      message: "Thank you for joining the waitlist!",
    });
  } catch (error: any) {
    log(`Error submitting waitlist form: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Failed to submit form. Please try again later.",
    });
  }
});

// LinkedIn OAuth - Initiate authorization
app.get("/api/linkedin/auth", (req: Request, res: Response) => {
  try {
    // Generate state for CSRF protection
    const state = randomBytes(32).toString("hex");
    const pendingFormData = req.query.formData
      ? JSON.parse(decodeURIComponent(req.query.formData as string))
      : null;

    // Store in session (primary method)
    req.session.linkedinState = state;
    req.session.pendingFormData = pendingFormData;

    // Also store in temporary map as fallback (in case session cookie is lost)
    oauthStateStore.set(state, {
      state,
      formData: pendingFormData,
      timestamp: Date.now(),
    });

    log(`Session ID: ${req.sessionID}`);
    log(`Setting state: ${state.substring(0, 8)}...`);

    // Save session before redirect to ensure it's persisted
    req.session.save((err) => {
      if (err) {
        log(`Error saving session: ${err.message}`);
        return res.status(500).json({
          success: false,
          message: "Failed to initiate LinkedIn authorization",
        });
      }

      log(`Session saved. State: ${state.substring(0, 8)}..., Session ID: ${req.sessionID}`);
      log(`Cookie being sent: ${res.getHeader("Set-Cookie") ? "yes" : "no"}`);
      
      const authUrl = getLinkedInAuthUrl(state);
      res.redirect(authUrl);
    });
  } catch (error: any) {
    log(`Error initiating LinkedIn auth: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Failed to initiate LinkedIn authorization",
    });
  }
});

// LinkedIn OAuth - Callback handler
app.get("/auth/linkedin/callback", async (req: Request, res: Response) => {
  try {
    const { code, state, error } = req.query;

    // Debug logging - check if cookie is being received
    log(`Callback received - State from query: ${state ? (state as string).substring(0, 8) + "..." : "missing"}`);
    log(`Session ID: ${req.sessionID}`);
    log(`Cookies received: ${req.headers.cookie ? "yes" : "no"}`);
    log(`Session state: ${req.session.linkedinState ? req.session.linkedinState.substring(0, 8) + "..." : "missing"}`);
    
    // Try to reload session from store if it's missing
    if (!req.session.linkedinState && req.sessionID) {
      log(`Attempting to reload session ${req.sessionID} from store...`);
      // Force session reload by accessing it
      await new Promise<void>((resolve) => {
        req.session.reload((err) => {
          if (err) {
            log(`Error reloading session: ${err.message}`);
          } else {
            log(`Session reloaded. State now: ${req.session.linkedinState ? req.session.linkedinState.substring(0, 8) + "..." : "still missing"}`);
          }
          resolve();
        });
      });
    }

    // Check for errors from LinkedIn
    if (error) {
      log(`LinkedIn OAuth error: ${error}`);
      return res.redirect(
        `/waitlist?error=linkedin_auth_failed&message=${encodeURIComponent(
          "LinkedIn authorization was cancelled or failed"
        )}`
      );
    }

    // Verify state to prevent CSRF attacks
    // First try session (primary method), then fallback to temporary store
    let isValidState = false;
    let storedFormData = null;

    if (state && req.session.linkedinState && state === req.session.linkedinState) {
      // Session-based validation (preferred)
      isValidState = true;
      storedFormData = req.session.pendingFormData;
      log(`State validated via session`);
    } else if (state && oauthStateStore.has(state as string)) {
      // Fallback to temporary store (if session cookie was lost)
      const stored = oauthStateStore.get(state as string);
      if (stored) {
        isValidState = true;
        storedFormData = stored.formData;
        // Clean up after use
        oauthStateStore.delete(state as string);
        log(`State validated via temporary store (session cookie was lost)`);
      }
    }

    if (!state || !isValidState) {
      log(`Invalid state parameter in LinkedIn callback. Expected: ${req.session.linkedinState ? req.session.linkedinState.substring(0, 8) + "..." : "undefined"}, Got: ${state ? (state as string).substring(0, 8) + "..." : "undefined"}`);
      return res.redirect(
        `/waitlist?error=invalid_state&message=${encodeURIComponent(
          "Invalid authorization state"
        )}`
      );
    }

    if (!code) {
      return res.redirect(
        `/waitlist?error=no_code&message=${encodeURIComponent(
          "No authorization code received"
        )}`
      );
    }

    // Exchange code for access token
    const accessToken = await exchangeCodeForToken(code as string);

    // Get post content from stored form data (user-edited) or use default
    let postText = `I came across 1SYX (a KLYRR Labs Product), a new tool trying to fix how brands explain what they do and turn that into content.

Felt interesting enough to back the effort, so I have joined their Jan 2026 waitlist.

If it works, it could help with clearer story, cleaner messaging and more useful content. If it does not, at least a serious attempt was made.

Doing my bit to support a budding entrepreneur who is building in public.

Check out 1SYX: https://www.linkedin.com/showcase/1syx-ai/

#1syx #1syxai #StrategicMarketing #KLYRRLabs #ContentMarketing #Marketing #MarketingOps #GoToMarketAlignment`;

    // Use user-edited content if available (from session or temp store)
    const formDataToUse = storedFormData || req.session.pendingFormData;
    if (formDataToUse?.postContent) {
      postText = formDataToUse.postContent;
      log(`Using user-edited post content (${postText.length} characters)`);
    } else {
      log(`Using default post content`);
    }

    // Image path/URL - handle different environments
    // For Netlify Functions, use the public URL since file system access is unreliable
    // For regular production/dev, use file system path
    const imageFileName = "WhatsApp Image 2025-12-23 at 20.06.11_1ed41664.jpg";
    let imagePathOrUrl: string;
    
    if (process.env.NETLIFY_FUNCTION === "true" || process.env.NETLIFY === "true") {
      // Netlify Functions environment - fetch from public URL
      // Get the site URL from environment or construct from request
      const siteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL || 
                     (req.protocol + "://" + req.get("host"));
      imagePathOrUrl = `${siteUrl}/linkedin_postimage/${imageFileName}`;
      log(`Using image URL for Netlify Functions: ${imagePathOrUrl}`);
    } else if (process.env.NODE_ENV === "production") {
      // Regular production server - use file system
      imagePathOrUrl = join(
        process.cwd(),
        "dist",
        "public",
        "linkedin_postimage",
        imageFileName
      );
    } else {
      // Development - use file system
      imagePathOrUrl = join(
        process.cwd(),
        "client",
        "src",
        "assets",
        "linkedin_postimage",
        imageFileName
      );
    }

    // Create LinkedIn post with image
    const postResult = await createLinkedInPostWithImage(
      accessToken,
      postText,
      imagePathOrUrl
    );

    log(`LinkedIn post created successfully: ${postResult.id}`);

    // If there's pending form data, save it to Google Sheets
    // Use storedFormData from validation (could be from session or temp store)
    const formDataToSave = storedFormData || req.session.pendingFormData;
    if (formDataToSave) {
      try {
        const formData = formDataToSave;
        const spreadsheetId =
          process.env.GOOGLE_SHEET_ID ||
          "1OaF6GBIK7wn61t5TbWrpxEaqT4V-1wgzDDEqhosMpFw";
        const sheetName = process.env.GOOGLE_SHEET_NAME || "Sheet1";

        const headers = [
          "Timestamp",
          "Name",
          "Email",
          "LinkedIn",
          "Hierarchy",
          "Function",
          "Company Size",
          "Primary Goal (Next 90 Days)",
          "Biggest Pain Point",
          "Current Solution",
          "Suggestions",
          "Wants Upgrade",
        ];

        await ensureHeaders(spreadsheetId, sheetName, headers);

        const timestamp = new Date().toISOString();
        const rowData = [
          timestamp,
          formData.name || "",
          formData.email || "",
          formData.linkedin || "",
          formData.hierarchy || "",
          formData.function || "",
          formData.companySize || "",
          formData.useCase || "",
          formData.painPoint || "",
          formData.currentSolution || "",
          formData.suggestions || "",
          "yes", // wantsUpgrade
        ];

        await appendToSheet(spreadsheetId, `${sheetName}!A:Z`, [rowData]);
        log(`Form data saved to Google Sheets: ${formData.email}`);
      } catch (sheetError: any) {
        log(`Error saving to Google Sheets: ${sheetError.message}`);
        // Don't fail the whole flow if sheet save fails
      }
    }

    // Clear session data
    req.session.linkedinState = undefined;
    req.session.pendingFormData = undefined;

    // Redirect to success page
    res.redirect(
      `/waitlist?success=true&message=${encodeURIComponent(
        "Your LinkedIn post has been created successfully!"
      )}`
    );
  } catch (error: any) {
    log(`Error in LinkedIn callback: ${error.message}`);
    res.redirect(
      `/waitlist?error=post_failed&message=${encodeURIComponent(
        error.message || "Failed to create LinkedIn post"
      )}`
    );
  }
});

// Setup error handler (must be after all routes)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  throw err;
});

// Initialize server setup (for standalone server mode)
async function initializeServer() {
  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }
}

// Export app for serverless use (Netlify Functions, etc.)
export { app };

// Only start the server if this file is run directly (not imported)
// For serverless deployments, we'll import and use the app without starting the server
if (process.env.NETLIFY !== "true" && !process.env.NETLIFY_FUNCTION) {
  (async () => {
    await initializeServer();

    // ALWAYS serve the app on the port specified in the environment variable PORT
    // Other ports are firewalled. Default to 5000 if not specified.
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen(port, "0.0.0.0", () => {
      log(`serving on port ${port}`);
      log(`http://localhost:${port}`);
    });
  })();
}
