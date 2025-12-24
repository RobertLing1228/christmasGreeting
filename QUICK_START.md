# Quick Start Guide

Your Christmas Greeting website is ready! Follow these steps to complete the setup:

## What's Already Done ✓

- Project structure created
- All components built
- Animations configured
- Vercel deployment config ready
- Build tested successfully

## Next Steps

### 1. Get Your Spline 3D Scene URL

**Option A: Use an Existing Scene**
- Browse [spline.design/community](https://spline.design/community) for Christmas scenes
- Or search for "christmas 3d scene spline" online

**Option B: Create Your Own**
1. Go to [spline.design](https://spline.design)
2. Create a Christmas scene (trees, ornaments, snowflakes, etc.)
3. Click **Export** → **Code Export**
4. Copy the URL that looks like:
   ```
   https://prod.spline.design/abc123xyz/scene.splinecode
   ```

### 2. Update the Spline URL

Open `src/App.vue` and replace line 24:

```javascript
// Replace this:
const splineSceneUrl = ref('https://prod.spline.design/REPLACE-WITH-YOUR-SCENE-ID/scene.splinecode')

// With your actual URL:
const splineSceneUrl = ref('https://prod.spline.design/YOUR-ACTUAL-ID/scene.splinecode')
```

### 3. Add Background Music (Optional)

1. Download a royalty-free Christmas song (try [freemusicarchive.org](https://freemusicarchive.org))
2. Convert to MP3 if needed
3. Place it in `public/audio/christmas-music.mp3`

### 4. Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site!

### 5. Deploy to Vercel

**Option 1: GitHub Integration (Recommended)**

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: Christmas greeting site"

# Push to GitHub
git remote add origin https://github.com/YOUR-USERNAME/christmas-greeting.git
git push -u origin main
```

Then:
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy" (Vercel auto-detects Vite)

**Option 2: Direct Deploy**

```bash
npm install -g vercel
vercel
```

## Customization Options

### Change the Greeting Text
Edit `src/components/GreetingText.vue`:
```vue
<h1 class="greeting-text">
  Happy Holidays  <!-- Change this -->
</h1>
<p class="greeting-year">
  2024  <!-- Change this -->
</p>
```

### Adjust Animation Speed
Edit `src/assets/styles/main.css`:
```css
.greeting-text {
  /* First number = duration, second number = delay */
  animation: fadeInUp 2s ease-out 1.5s forwards;
}
```

### Change Text Colors
Edit `src/assets/styles/main.css`:
```css
:root {
  --color-text: #ffffff;     /* Main text color */
  --color-glow: #ffd700;     /* Glow effect (gold) */
  --color-shadow: rgba(0, 0, 0, 0.8);
}
```

### Music Volume
Edit `src/composables/useAudio.js`:
```javascript
audio.value.volume = 0.3  // Range: 0.0 (mute) to 1.0 (full)
```

## Troubleshooting

**Spline scene shows loading spinner forever?**
- Check the console for errors
- Verify the Spline URL is correct and public
- Try a different scene to test

**Music button doesn't work?**
- Make sure the audio file exists at `public/audio/christmas-music.mp3`
- Check browser console for errors
- Remember: User must click to start (browsers block autoplay)

**Build warnings about chunk size?**
- This is normal! Spline runtime is large but optimized
- Vercel handles large files well
- Gzip compression reduces the actual download size

## Files You May Want to Edit

```
📝 Must Edit:
   src/App.vue (line 24) - Add your Spline URL

🎵 Optional:
   public/audio/ - Add your music file
   src/components/GreetingText.vue - Change text
   src/assets/styles/main.css - Customize colors/animations

📚 Reference:
   PROJECT_PLAN.md - Full technical documentation
   DESIGN_PLAN.md - Design specifications with ASCII diagrams
   README.md - Complete setup guide
```

## Preview Without Spline

If you want to test before getting a Spline URL:
1. Comment out the `<SplineBackground>` line in `src/App.vue`
2. Add a temporary background color in `src/assets/styles/main.css`:
   ```css
   body {
     background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
   }
   ```

## Need Help?

Check these files:
- `README.md` - Full documentation
- `PROJECT_PLAN.md` - Technical details
- `DESIGN_PLAN.md` - Design specifications

---

**Ready?** Run `npm run dev` and start creating! 🎄✨
