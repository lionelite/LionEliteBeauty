#!/bin/bash
set -e

echo "🚀 Deploying to lionelitebeauty.com..."

# Stage all changes
git add -A

# Commit with timestamp if there are changes
if git diff --staged --quiet; then
  echo "✅ No new changes — force pushing current state..."
else
  git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M')"
fi

# Push to GitHub → triggers Vercel auto-deploy
git push github master:main --force

echo ""
echo "✅ Done! Vercel is now building your site."
echo "🌐 Live at: https://lionelitebeauty.com (usually ready in ~30 seconds)"
