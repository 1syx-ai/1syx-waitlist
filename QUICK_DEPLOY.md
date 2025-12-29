# Quick Deployment Guide

## Using Netlify CLI (Easiest Method)

### One-time setup:
```bash
# Install Netlify CLI globally (if not installed)
npm install -g netlify-cli

# Login (opens browser)
netlify login
```

### Deploy:
```bash
# Deploy to production
netlify deploy --prod
```

That's it! The CLI will:
- ✅ Deploy your static files (`dist/public`)
- ✅ Deploy your serverless functions (`netlify/functions`)
- ✅ Use your `netlify.toml` configuration
- ✅ Set up redirects automatically

**Note**: Make sure you've run `npm run build` first!

## Setting Environment Variables

After first deployment, set environment variables in Netlify Dashboard:
1. Go to your site on Netlify
2. Site settings → Environment variables
3. Add:
   - `SESSION_SECRET`
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SHEET_NAME`
   - `LINKEDIN_CLIENT_ID`
   - `LINKEDIN_CLIENT_SECRET`
4. Redeploy (or wait for next build)

## Why Not Drag-and-Drop?

❌ Drag-and-drop **cannot** deploy serverless functions
❌ Your API routes won't work without functions
✅ Netlify CLI handles everything automatically

The CLI is just as easy as drag-and-drop, but works properly!

