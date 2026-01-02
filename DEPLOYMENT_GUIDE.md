# Complete Deployment Guide with Custom Domain

This guide will walk you through deploying your website to Netlify and connecting your custom domain.

---

## Step 1: Build Your Website

Before deploying, make sure your site builds correctly:

1. **Open terminal** in your project directory:
   ```powershell
   cd D:\1syx-waitlist
   ```

2. **Run the build command:**
   ```powershell
   npm run build
   ```

3. **Verify the build succeeded:**
   - You should see: ✓ Client built successfully
   - You should see: ✓ Server bundle created
   - Check that `dist/public` folder exists
   - Check that `netlify/functions` folder exists

✅ **If build succeeds, proceed to Step 2**

---

## Step 2: Login to Netlify

1. **Open terminal** and run:
   ```powershell
   netlify login
   ```

2. **Authorize in browser:**
   - Your browser will open automatically
   - Click "Authorize" to grant Netlify CLI access
   - Return to terminal when done

✅ **Once logged in, proceed to Step 3**

---

## Step 3: Initialize Netlify Site

1. **Make sure you're in your project directory:**
   ```powershell
   cd D:\1syx-waitlist
   ```

2. **Initialize Netlify:**
   ```powershell
   netlify init
   ```

3. **Follow the prompts:**
   - **"Create & configure a new site"** (press Enter or select this option)
   - **Team:** Select your team (or personal account)
   - **Site name:** 
     - Enter a name (e.g., `1syx-waitlist`)
     - Or press Enter for a random name
   - **Build command:** `npm run build` (press Enter)
   - **Directory to deploy:** `dist/public` (press Enter)
   - **Functions folder:** `netlify/functions` (press Enter)

4. **Wait for initialization to complete**

✅ **Site is now initialized!**

---

## Step 4: Deploy to Production

1. **First, create a draft deployment to test:**
   ```powershell
   netlify deploy
   ```
   - This creates a draft/preview URL
   - Test the URL to make sure everything works

2. **If everything looks good, deploy to production:**
   ```powershell
   netlify deploy --prod
   ```

3. **Your site is now live!**
   - You'll get a URL like: `https://your-site-name.netlify.app`
   - This is your temporary Netlify URL

✅ **Site is deployed! Now proceed to Step 5 for custom domain**

---

## Step 5: Add Your Custom Domain (Method 1 - Recommended)

### Option A: Add Domain via Netlify Dashboard

1. **Go to Netlify Dashboard:**
   - Visit: https://app.netlify.com
   - Click on your site

2. **Open Domain Settings:**
   - Click **"Domain settings"** in the left sidebar
   - Or go to: Site settings → Domain management

3. **Add Custom Domain:**
   - Click **"Add custom domain"**
   - Enter your domain (e.g., `example.com`)
   - Click **"Verify"**

4. **Choose DNS Configuration:**

   **If you want to use your root domain (example.com):**
   - Netlify will show you DNS records to add
   - You'll need to add these records to your domain registrar:
     - **A Record:** `@` → `75.2.60.5`
     - **A Record:** `@` → `99.83.190.102`
   
   **If you want to use a subdomain (www.example.com):**
   - Add a **CNAME Record:** `www` → `your-site-name.netlify.app`
   - Netlify will automatically handle both `www` and root domain

5. **Add DNS Records at Your Domain Registrar:**
   - Log in to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
   - Go to DNS settings for your domain
   - Add the records Netlify provided
   - Save changes

6. **Wait for DNS Propagation:**
   - Can take a few minutes to 48 hours
   - Netlify will automatically detect when DNS is configured
   - You'll see a green checkmark when it's ready

7. **Enable HTTPS:**
   - Netlify automatically provisions SSL certificates
   - Once DNS is verified, HTTPS will be enabled automatically
   - This usually takes a few minutes

✅ **Your custom domain is now connected!**

---

## Step 5: Add Your Custom Domain (Method 2 - Via CLI)

1. **Add domain via CLI:**
   ```powershell
   netlify domains:add yourdomain.com
   ```

2. **Follow DNS instructions:**
   - The CLI will show you the DNS records to add
   - Add them to your domain registrar
   - Wait for DNS propagation

3. **Check domain status:**
   ```powershell
   netlify domains:list
   ```

✅ **Domain added via CLI!**

---

## Step 6: Verify Your Domain is Working

1. **Check domain status in dashboard:**
   - Go to: Site settings → Domain management
   - You should see your domain with a green checkmark

2. **Test your domain:**
   - Visit `https://yourdomain.com`
   - Visit `https://www.yourdomain.com` (if configured)
   - Make sure both work and show HTTPS

3. **Test all pages:**
   - Home: `https://yourdomain.com/`
   - About: `https://yourdomain.com/about`
   - Waitlist: `https://yourdomain.com/waitlist`

✅ **Everything should be working!**

---

## Step 7: Set Up Redirects (Optional but Recommended)

If you want to redirect one version to another (e.g., redirect `example.com` to `www.example.com`):

1. **Go to Domain Settings:**
   - Site settings → Domain management

2. **Set Primary Domain:**
   - Choose which version is primary (www or non-www)
   - Netlify will automatically redirect the other

Or add to `netlify.toml`:
```toml
[[redirects]]
  from = "https://example.com/*"
  to = "https://www.example.com/:splat"
  status = 301
  force = true
```

---

## Common Domain Configurations

### Configuration 1: Root Domain Only (example.com)
```
A Record:  @ → 75.2.60.5
A Record:  @ → 99.83.190.102
```

### Configuration 2: WWW Subdomain Only (www.example.com)
```
CNAME Record:  www → your-site-name.netlify.app
```

### Configuration 3: Both Root and WWW (Recommended)
```
A Record:      @ → 75.2.60.5
A Record:      @ → 99.83.190.102
CNAME Record:  www → your-site-name.netlify.app
```
Then set `www.example.com` as primary in Netlify settings.

---

## DNS Setup for Popular Domain Registrars

### GoDaddy:
1. Log in → My Products → DNS
2. Add records as shown by Netlify
3. Save changes

### Namecheap:
1. Log in → Domain List → Manage → Advanced DNS
2. Add records as shown by Netlify
3. Save changes

### Cloudflare:
1. Log in → Select domain → DNS
2. Add records as shown by Netlify
3. Make sure proxy is OFF (gray cloud) for A records
4. Save changes

### Google Domains:
1. Log in → DNS → Custom records
2. Add records as shown by Netlify
3. Save changes

---

## Step 8: Set Environment Variables (If Needed)

If your app uses environment variables (API keys, database URLs, etc.):

### Via Dashboard:
1. Go to: Site settings → Environment variables
2. Click "Add variable"
3. Enter variable name and value
4. Save

### Via CLI:
```powershell
netlify env:set VARIABLE_NAME "value"
```

### For Production:
Make sure to set variables for "Production" environment.

---

## Updating Your Site (After Initial Deployment)

When you make changes to your code:

1. **Make your changes** to the code

2. **Rebuild:**
   ```powershell
   npm run build
   ```

3. **Deploy:**
   ```powershell
   netlify deploy --prod
   ```

That's it! Your changes will be live in a few minutes.

---

## Quick Reference Commands

```powershell
# Build site
npm run build

# Login to Netlify
netlify login

# Initialize site (first time only)
netlify init

# Deploy draft/preview
netlify deploy

# Deploy to production
netlify deploy --prod

# Add custom domain
netlify domains:add yourdomain.com

# List domains
netlify domains:list

# Set environment variable
netlify env:set VARIABLE_NAME "value"

# View site info
netlify status

# Open site dashboard
netlify open:site

# View site logs
netlify logs:function
```

---

## Troubleshooting

### Build Fails
- Check for errors in terminal output
- Make sure all dependencies are installed: `npm install`
- Verify Node.js version compatibility

### Domain Not Working
- Check DNS records are correct at your registrar
- Wait for DNS propagation (can take up to 48 hours)
- Use `nslookup yourdomain.com` to check DNS
- Make sure you're using the correct Netlify IPs

### HTTPS Not Enabled
- Wait a few minutes after DNS is verified
- Go to Domain settings → HTTPS → Force HTTPS
- Netlify automatically provisions SSL certificates

### Site Shows Old Content
- Clear browser cache
- Check Netlify dashboard for latest deployment
- Try hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

### Functions Not Working
- Verify `netlify/functions` folder exists after build
- Check function logs: `netlify logs:function`
- Make sure `netlify.toml` has correct functions directory

### DNS Propagation Check
Use these tools to check if DNS has propagated:
- https://dnschecker.org
- https://www.whatsmydns.net
- Command line: `nslookup yourdomain.com`

---

## Security Best Practices

1. **Enable HTTPS:**
   - Netlify does this automatically
   - Make sure "Force HTTPS" is enabled in Domain settings

2. **Set Environment Variables:**
   - Never commit API keys or secrets to Git
   - Use Netlify environment variables instead

3. **Use Strong Passwords:**
   - For your domain registrar account
   - For your Netlify account

4. **Enable 2FA:**
   - Enable two-factor authentication on Netlify
   - Enable it on your domain registrar

---

## Summary Checklist

Before deploying:
- [ ] Code is ready
- [ ] Build succeeds locally (`npm run build`)
- [ ] All dependencies installed

During deployment:
- [ ] Netlify CLI installed and logged in
- [ ] Site initialized (`netlify init`)
- [ ] Draft deployment successful
- [ ] Production deployment successful

Custom domain:
- [ ] Domain added to Netlify
- [ ] DNS records added at registrar
- [ ] DNS propagation complete (green checkmark)
- [ ] HTTPS enabled
- [ ] Domain working (test in browser)

After deployment:
- [ ] All pages work correctly
- [ ] Environment variables set (if needed)
- [ ] Site tested on mobile devices
- [ ] Analytics set up (optional)

---

## Need Help?

- **Netlify Docs:** https://docs.netlify.com
- **Domain Setup:** https://docs.netlify.com/domains-https/custom-domains
- **Netlify Support:** https://www.netlify.com/support

---

**Congratulations! Your website is now live with your custom domain! 🎉**

