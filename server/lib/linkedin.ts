import { readFileSync } from "fs";

// LinkedIn API configuration
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_REDIRECT_URL = process.env.LINKEDIN_REDIRECT_URL;

if (!LINKEDIN_CLIENT_ID || !LINKEDIN_CLIENT_SECRET || !LINKEDIN_REDIRECT_URL) {
  throw new Error(
    "Missing LinkedIn credentials in environment variables. " +
    "Please set LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, and LINKEDIN_REDIRECT_URL"
  );
}

// LinkedIn OAuth endpoints
const LINKEDIN_AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization";
const LINKEDIN_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken";
const LINKEDIN_API_BASE = "https://api.linkedin.com/v2";

// Required scopes for posting
const LINKEDIN_SCOPES = [
  "openid",
  "profile",
  "email",
  "w_member_social", // Write posts on behalf of user
];

/**
 * Generate LinkedIn OAuth authorization URL
 */
export function getLinkedInAuthUrl(state: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: LINKEDIN_CLIENT_ID!,
    redirect_uri: LINKEDIN_REDIRECT_URL!,
    state: state,
    scope: LINKEDIN_SCOPES.join(" "),
  });

  return `${LINKEDIN_AUTH_URL}?${params.toString()}`;
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(code: string): Promise<string> {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: LINKEDIN_REDIRECT_URL!,
    client_id: LINKEDIN_CLIENT_ID!,
    client_secret: LINKEDIN_CLIENT_SECRET!,
  });

  const response = await fetch(LINKEDIN_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to exchange code for token: ${error}`);
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Get user's LinkedIn profile information
 */
export async function getLinkedInProfile(accessToken: string) {
  const response = await fetch(`${LINKEDIN_API_BASE}/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get LinkedIn profile");
  }

  return response.json();
}

/**
 * Register image upload to LinkedIn Assets API
 */
export async function registerImageUpload(
  accessToken: string,
  personId: string
) {
  const registerResponse = await fetch(
    `${LINKEDIN_API_BASE}/assets?action=registerUpload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify({
        registerUploadRequest: {
          recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
          owner: `urn:li:person:${personId}`,
          serviceRelationships: [
            {
              relationshipType: "OWNER",
              identifier: "urn:li:userGeneratedContent",
            },
          ],
        },
      }),
    }
  );

  if (!registerResponse.ok) {
    const error = await registerResponse.text();
    throw new Error(`Failed to register image upload: ${error}`);
  }

  return registerResponse.json();
}

/**
 * Upload image to LinkedIn
 */
export async function uploadImageToLinkedIn(
  accessToken: string,
  uploadUrl: string,
  imagePath: string
) {
  const imageBuffer = readFileSync(imagePath);

  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "image/jpeg",
    },
    body: imageBuffer,
  });

  if (!uploadResponse.ok) {
    const error = await uploadResponse.text();
    throw new Error(`Failed to upload image: ${error}`);
  }

  return uploadResponse;
}

/**
 * Create LinkedIn post with text and image
 */
export async function createLinkedInPost(
  accessToken: string,
  personId: string,
  postText: string,
  imageAssetUrn?: string
) {
  const postBody: any = {
    author: `urn:li:person:${personId}`,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: postText,
        },
        shareMediaCategory: imageAssetUrn ? "IMAGE" : "NONE",
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  // Add image if provided
  if (imageAssetUrn) {
    postBody.specificContent["com.linkedin.ugc.ShareContent"].media = [
      {
        media: imageAssetUrn,
        status: "READY",
      },
    ];
  }

  const response = await fetch(`${LINKEDIN_API_BASE}/ugcPosts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(postBody),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create LinkedIn post: ${error}`);
  }

  return response.json();
}

/**
 * Get person ID from access token
 */
export async function getPersonId(accessToken: string): Promise<string> {
  // First get userinfo to get the sub (subject)
  const userInfoResponse = await fetch(`${LINKEDIN_API_BASE}/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!userInfoResponse.ok) {
    throw new Error("Failed to get LinkedIn userinfo");
  }

  const userInfo = await userInfoResponse.json();
  const sub = userInfo.sub; // This is the person's ID

  // LinkedIn person ID format is usually just the numeric part
  // But we need to verify the format - it might be "urn:li:person:..." or just the ID
  // For UGC Posts API, we typically need just the numeric ID
  return sub.replace("urn:li:person:", "").replace("urn:li:fs_person:", "");
}

/**
 * Complete flow: Upload image and create post
 */
export async function createLinkedInPostWithImage(
  accessToken: string,
  postText: string,
  imagePath: string
) {
  // Step 1: Get person ID
  const personId = await getPersonId(accessToken);

  // Step 2: Register image upload
  const registerData = await registerImageUpload(accessToken, personId);
  const uploadUrl = registerData.value.uploadMechanism[
    "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
  ].uploadUrl;
  const assetUrn = registerData.value.asset;

  // Step 3: Upload image
  await uploadImageToLinkedIn(accessToken, uploadUrl, imagePath);

  // Step 4: Create post with image
  const postResult = await createLinkedInPost(
    accessToken,
    personId,
    postText,
    assetUrn
  );

  return postResult;
}

