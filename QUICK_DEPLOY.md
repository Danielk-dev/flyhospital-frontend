# Quick Deployment Guide

## 🚀 Fast Deployment Steps

### 1. Build Your App
```bash
npm run generate
```
or
```bash
npm run deploy:build
```
or
```bash
./deploy.sh
```

### 2. Upload Files
Upload **ALL contents** from `.output/public/` folder to your hosting's root directory (usually `public_html`).

### 3. Upload .htaccess
Upload the `.htaccess` file to the root directory.

### 4. Done! 🎉
Visit your domain to see your site.

---

## 📋 What Gets Uploaded?

From `.output/public/` folder:
- ✅ `index.html` → Root directory
- ✅ `_nuxt/` folder → Root directory  
- ✅ All other files → Root directory
- ✅ `.htaccess` → Root directory

## 🔧 Common Hosting Directories

- **cPanel**: `public_html/`
- **Plesk**: `httpdocs/`
- **DirectAdmin**: `public_html/`
- **Custom**: Usually `www/` or `html/`

## ⚠️ Important Notes

1. **API Configuration**: Your API is already configured in `nuxt.config.ts`
2. **CORS**: Make sure your API server allows requests from your domain
3. **File Permissions**: 
   - Files: `644`
   - Folders: `755`
4. **.htaccess**: Required for Apache servers (most shared hosting)

## 🐛 Troubleshooting

**404 on page refresh?**
→ Check `.htaccess` is uploaded and `mod_rewrite` is enabled

**White page?**
→ Check browser console for errors

**API not working?**
→ Check CORS settings and API URL

---

For detailed instructions, see `DEPLOYMENT.md`

