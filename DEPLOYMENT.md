# Netlify Deployment Guide

## Prerequisites
- Node.js and npm installed
- Git repository (GitHub, GitLab, or Bitbucket)
- Netlify account (sign up at https://app.netlify.com)

## Deployment Steps

### Option 1: Deploy via Netlify CLI (Recommended for first deployment)

1. **Install Netlify CLI globally** (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Initialize Netlify in your project**:
   ```bash
   netlify init
   ```
   - Choose "Create & configure a new site"
   - Give your site a name (or leave blank for auto-generated name)
   - Select your team (if you have one)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/public`
   - **Functions directory**: `netlify/functions`

4. **Deploy to production**:
   ```bash
   netlify deploy --prod
   ```

### Option 2: Deploy via Git (Recommended for continuous deployment)

1. **Push your code to Git** (GitHub, GitLab, or Bitbucket)

2. **Connect to Netlify**:
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider and select your repository

3. **Configure build settings** (Netlify should auto-detect from `netlify.toml`):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/public`
   - **Functions directory**: `netlify/functions`

4. **Deploy**: Netlify will automatically deploy on every push to your main branch

## Environment Variables

Set these in Netlify Dashboard → Site settings → Environment variables:

### Required:
- `SESSION_SECRET` - A random secret string for session encryption (generate with: `openssl rand -base64 32`)
- `GOOGLE_SHEET_ID` - Your Google Sheets ID
- `GOOGLE_SHEET_NAME` - Sheet name (usually "Sheet1")
- `LINKEDIN_CLIENT_ID` - LinkedIn OAuth Client ID
- `LINKEDIN_CLIENT_SECRET` - LinkedIn OAuth Client Secret

### Optional:
- Any other environment variables your server uses

**Important**: After adding environment variables, you need to redeploy for them to take effect.

## Verify Deployment

After deployment, verify:

1. **Homepage loads**: Visit your Netlify site URL
2. **Client-side routing works**: Try navigating to `/waitlist` and `/about`
3. **API endpoints work**: Test form submission at `/waitlist`
4. **LinkedIn OAuth works**: Test the LinkedIn integration flow

## Troubleshooting

### Build fails
- Check Netlify build logs in the dashboard
- Ensure all dependencies are in `package.json` (not just `devDependencies`)
- Verify `node_modules` is in `.gitignore` (it should be)

### Serverless function errors
- Check function logs in Netlify Dashboard → Functions
- Verify `serverless-http` is in dependencies (not devDependencies)
- Ensure environment variables are set correctly

### Routes not working
- Verify `_redirects` file exists in `dist/public`
- Check `netlify.toml` redirect rules
- Ensure redirects are in the correct order (most specific first)

## Project Structure for Netlify

```
your-project/
├── netlify.toml          # Netlify configuration
├── netlify/
│   └── functions/
│       ├── server.cjs    # Built server bundle (auto-generated)
│       └── server.js     # Serverless wrapper (auto-generated)
├── dist/
│   ├── index.cjs         # Built server for standalone use
│   └── public/           # Built client files
│       ├── _redirects    # SPA redirect rules (auto-generated)
│       ├── index.html
│       └── assets/       # Client assets
└── package.json
```

