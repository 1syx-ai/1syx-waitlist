import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, cp, writeFile, mkdir } from "fs/promises";
import { join } from "path";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "@neondatabase/serverless",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "googleapis",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("copying assets for server access...");
  // Copy linkedin_postimage to dist/public for server to access in production
  const linkedinImageSrc = join("client", "src", "assets", "linkedin_postimage");
  const linkedinImageDest = join("dist", "public", "linkedin_postimage");
  try {
    await cp(linkedinImageSrc, linkedinImageDest, { recursive: true });
    console.log("LinkedIn post image copied to dist/public");
  } catch (error: any) {
    console.warn(`Warning: Could not copy LinkedIn image: ${error.message}`);
  }

  console.log("creating _redirects file for SPA routing...");
  // Create _redirects file for Netlify SPA routing
  // This ensures all routes (/, /about, /waitlist, etc.) are handled by the SPA
  // All pages are bundled by Vite: Home (/), About (/about), Waitlist (/waitlist)
  const redirectsContent = `/*    /index.html   200\n`;
  const redirectsPath = join("dist", "public", "_redirects");
  await writeFile(redirectsPath, redirectsContent, "utf-8");
  console.log("_redirects file created - SPA routing configured for all pages (Home, About, Waitlist)");

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });

  console.log("creating Netlify serverless function wrapper...");
  // Create Netlify function directory
  const netlifyFunctionDir = join("netlify", "functions");
  await mkdir(netlifyFunctionDir, { recursive: true });
  
  // Copy the built server to the functions directory
  const serverSource = join("dist", "index.cjs");
  const serverDest = join(netlifyFunctionDir, "server.cjs");
  try {
    await cp(serverSource, serverDest);
    console.log("Server bundle copied to netlify/functions");
  } catch (error: any) {
    console.warn(`Warning: Could not copy server bundle: ${error.message}`);
  }

  // Create the serverless-http wrapper for Netlify
  // Note: serverless-http needs to be installed as a dependency
  const serverlessWrapper = `// Netlify serverless function wrapper
const serverless = require('serverless-http');

// Import the Express app from the built server
// We need to set NETLIFY_FUNCTION to prevent the server from starting
process.env.NETLIFY_FUNCTION = 'true';
process.env.NODE_ENV = 'production';

let app;
try {
  // The built server exports the app
  const serverModule = require('./server.cjs');
  app = serverModule.app || serverModule.default?.app || serverModule;
  
  if (!app || typeof app.use !== 'function') {
    throw new Error('Could not find Express app in server module');
  }
} catch (error) {
  console.error('Error loading server module:', error);
  // Fallback Express app
  const express = require('express');
  app = express();
  app.get('*', (req, res) => {
    res.status(500).json({ error: 'Server not properly configured', message: error.message });
  });
}

// Wrap the Express app with serverless-http
module.exports.handler = serverless(app, {
  binary: ['image/*', 'application/pdf'],
});
`;
  
  const wrapperPath = join(netlifyFunctionDir, "server.js");
  await writeFile(wrapperPath, serverlessWrapper, "utf-8");
  console.log("Netlify serverless function wrapper created");
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
