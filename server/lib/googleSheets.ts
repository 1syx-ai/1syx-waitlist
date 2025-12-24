import { google } from "googleapis";

// Get credentials from environment variables
const getCredentials = () => {
  const projectId = process.env.GOOGLE_PROJECT_ID;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing required Google credentials in environment variables. " +
      "Please set GOOGLE_PROJECT_ID, GOOGLE_CLIENT_EMAIL, and GOOGLE_PRIVATE_KEY"
    );
  }

  // Handle private key - replace literal \n with actual newlines if needed
  const formattedPrivateKey = privateKey.replace(/\\n/g, "\n");

  return {
    type: "service_account",
    project_id: projectId,
    private_key: formattedPrivateKey,
    client_email: clientEmail,
  };
};

// Initialize Google Sheets API client
export async function getSheetsClient() {
  try {
    const credentials = getCredentials();

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    return sheets;
  } catch (error) {
    console.error("Error initializing Google Sheets client:", error);
    throw error;
  }
}

// Append a row to the Google Sheet
export async function appendToSheet(
  spreadsheetId: string,
  range: string,
  values: any[][]
) {
  try {
    const sheets = await getSheetsClient();

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error appending to sheet:", error);
    throw new Error(
      `Failed to write to Google Sheet: ${error.message || "Unknown error"}`
    );
  }
}

// Check if headers exist, if not create them
export async function ensureHeaders(
  spreadsheetId: string,
  sheetName: string,
  headers: string[]
) {
  try {
    const sheets = await getSheetsClient();

    // Check if first row exists
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:Z1`,
    });

    const existingHeaders = response.data.values?.[0] || [];

    // If headers don't exist or are different, create/update them
    if (existingHeaders.length === 0 || existingHeaders[0] === "") {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [headers],
        },
      });
    }
  } catch (error: any) {
    console.error("Error ensuring headers:", error);
    // Don't throw - headers might already exist
  }
}

