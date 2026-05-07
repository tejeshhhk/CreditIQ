#!/bin/bash

# Script to initialize demo data for Smart AI Credit Score Tracker

echo "🚀 Initializing Smart AI Credit Score Tracker Demo Data..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  No .env.local file found!"
    echo "Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "📝 Please edit .env.local and add your GROQ_API_KEY"
    echo "   Get it from: https://console.groq.com"
    echo ""
fi

# Check Node version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check if pnpm or npm is available
if command -v pnpm &> /dev/null; then
    PM="pnpm"
elif command -v npm &> /dev/null; then
    PM="npm"
else
    echo "❌ Neither pnpm nor npm found. Please install Node.js with npm."
    exit 1
fi

echo "📦 Using package manager: $PM"
echo ""

# Install dependencies
echo "📥 Installing dependencies..."
$PM install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Build the project
echo "🔨 Building the project..."
$PM run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Project built successfully"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "📚 Demo Account:"
echo "   Email: demo@example.com"
echo "   Password: demo123"
echo ""
echo "🚀 To start the development server, run:"
echo "   $PM dev"
echo ""
echo "🌐 Then visit: http://localhost:3000"
echo ""
echo "📖 For more information, see README.md"
