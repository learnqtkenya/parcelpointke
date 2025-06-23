#!/bin/bash

# ParcelPoint Deployment Script for Vercel
echo "🚀 Starting ParcelPoint deployment to Vercel..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from your project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run type check
echo "🔍 Running TypeScript checks..."
npm run type-check

# Build the project
echo "🏗️ Building the project..."
npm run build

# Run tests if they exist
if npm run | grep -q "test"; then
    echo "🧪 Running tests..."
    npm run test
fi

# Deploy to Vercel
echo "🌍 Deploying to Vercel..."
if command -v vercel &> /dev/null; then
    vercel --prod
else
    echo "❌ Vercel CLI not installed. Installing..."
    npm install -g vercel
    echo "🔑 Please run 'vercel login' first, then run this script again."
    exit 1
fi

echo "✅ Deployment completed!"
echo "🎉 Your ParcelPoint website should now be live!"
echo ""
echo "Next steps:"
echo "1. Visit your deployment URL"
echo "2. Test all functionality"
echo "3. Set up custom domain if needed"
echo "4. Configure analytics"