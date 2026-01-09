# Nuxt 4 Deployment Guide for Shared Hosting

This guide will help you deploy your Nuxt 4 application to shared hosting (cPanel, Plesk, etc.).

## Prerequisites

- Node.js installed on your local machine (for building)
- FTP/SFTP access to your shared hosting
- Your hosting supports static files (HTML, CSS, JS)

## Step 1: Build Your Application

Since your project has `ssr: false`, it's already configured as a Single Page Application (SPA). Build it as a static site:

```bash
# Install dependencies (if not already done)
npm install

# Build the static site
npm run generate
```

This will create a `.output/public` folder containing all your static files.

## Step 2: Prepare Files for Upload

After building, you'll find your production files in:
```
.output/public/
```

This folder contains:
- `index.html` - Main entry point
- `_nuxt/` - JavaScript and CSS bundles
- All other static assets

## Step 3: Upload to Shared Hosting

### Option A: Using FTP Client (FileZilla, WinSCP, etc.)

1. Connect to your hosting via FTP/SFTP
2. Navigate to your domain's root directory (usually `public_html` or `www`)
3. Upload **ALL contents** from `.output/public/` folder to the root directory
4. Upload the `.htaccess` file to the root directory (for Apache servers)

### Option B: Using cPanel File Manager

1. Log into cPanel
2. Open "File Manager"
3. Navigate to `public_html` (or your domain's root)
4. Upload all files from `.output/public/` folder
5. Upload `.htaccess` file

### Option C: Using Command Line (if SSH access is available)

```bash
# Compress the build folder
cd .output/public
tar -czf ../nuxt-build.tar.gz .

# Upload via SCP
scp ../nuxt-build.tar.gz username@yourhost.com:/home/username/public_html/

# SSH into server and extract
ssh username@yourhost.com
cd public_html
tar -xzf nuxt-build.tar.gz
rm nuxt-build.tar.gz
```

## Step 4: Configure Your Hosting

### For Apache Servers (Most Common)

1. Ensure `.htaccess` file is uploaded to the root directory
2. Verify `mod_rewrite` is enabled (usually enabled by default)

### For Nginx Servers

If your hosting uses Nginx, create a `nginx.conf` file:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/public_html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Step 5: Verify Deployment

1. Visit your domain in a browser
2. Check browser console for any errors
3. Test navigation between pages
4. Verify API calls are working (check Network tab)

## Important Notes

### API Configuration

Your API is configured in `nuxt.config.ts`:
```typescript
runtimeConfig: {
  public: {
    baseUrl: 'https://flyhospitals.dev/api',
  },
}
```

Make sure:
- ✅ Your API server allows CORS from your domain
- ✅ API endpoints are accessible from the browser
- ✅ No authentication issues with API calls

### Environment Variables

If you need different API URLs for production, create a `.env` file:

```env
NUXT_PUBLIC_BASE_URL=https://flyhospitals.dev/api
NUXT_PUBLIC_IMAGE_URL=https://flyhospitals.dev/
NUXT_PUBLIC_WEB_URL=https://yourdomain.com
```

Then update `nuxt.config.ts`:
```typescript
runtimeConfig: {
  public: {
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'https://flyhospitals.dev/api',
    ImageUrl: process.env.NUXT_PUBLIC_IMAGE_URL || 'https://flyhospitals.dev/',
    webUrl: process.env.NUXT_PUBLIC_WEB_URL || 'https://frontend.flyhospitals.dev',
  },
}
```

### Troubleshooting

**Issue: 404 errors on page refresh**
- ✅ Ensure `.htaccess` is uploaded and working
- ✅ Check that `mod_rewrite` is enabled
- ✅ Verify all routes redirect to `index.html`

**Issue: Assets not loading**
- ✅ Check file paths (should be relative)
- ✅ Verify `_nuxt/` folder is uploaded
- ✅ Check browser console for 404 errors

**Issue: API calls failing**
- ✅ Check CORS settings on API server
- ✅ Verify API URL is correct
- ✅ Check browser Network tab for errors

**Issue: White page / blank screen**
- ✅ Check browser console for JavaScript errors
- ✅ Verify all files uploaded correctly
- ✅ Check that `index.html` is in root directory

## Quick Build & Deploy Script

Create a `deploy.sh` script for easier deployment:

```bash
#!/bin/bash
echo "Building Nuxt app..."
npm run generate

echo "Preparing files..."
cd .output/public

echo "Files ready in .output/public/"
echo "Upload these files to your hosting's public_html directory"
```

Make it executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

## Updating Your Site

When you need to update your site:

1. Make changes to your code
2. Run `npm run generate` again
3. Upload only changed files (or upload all files to be safe)
4. Clear browser cache if needed

## Performance Tips

1. **Enable Gzip Compression** - Already configured in `.htaccess`
2. **Browser Caching** - Already configured in `.htaccess`
3. **CDN** - Consider using a CDN for static assets
4. **Image Optimization** - Your images are already using lazy loading

## Support

If you encounter issues:
- Check browser console for errors
- Check server error logs
- Verify file permissions (should be 644 for files, 755 for directories)
- Contact your hosting provider if `.htaccess` isn't working

