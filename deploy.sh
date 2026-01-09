#!/bin/bash

# Nuxt 4 Deployment Script for Shared Hosting
# This script builds your Nuxt app and prepares it for upload

echo "🚀 Starting Nuxt 4 deployment build..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Build the static site
echo "🔨 Building static site..."
npm run generate

# Check if build was successful
if [ -d ".output/public" ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "📁 Your files are ready in: .output/public/"
    echo ""
    echo "📤 Next steps:"
    echo "   1. Upload ALL contents from .output/public/ to your hosting's public_html directory"
    echo "   2. Upload .htaccess file to the root directory"
    echo "   3. Visit your domain to verify deployment"
    echo ""
    echo "💡 Tip: You can use FTP client (FileZilla) or cPanel File Manager"
    echo ""
    
    # Show folder size
    if command -v du &> /dev/null; then
        SIZE=$(du -sh .output/public | cut -f1)
        echo "📊 Build size: $SIZE"
    fi
else
    echo "❌ Build failed! Check the error messages above."
    exit 1
fi

