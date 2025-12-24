# Christmas Greeting 2024

A beautiful single-page website featuring 3D Spline animations and festive greetings, built with Vite and Vue 3.

## Features

- Interactive 3D Spline background
- Smooth text fade-in animations
- Background music with toggle control
- Fully responsive design
- Optimized for Vercel deployment

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Your Spline 3D Scene

1. Go to [spline.design](https://spline.design) and create your Christmas scene
2. Click **Export** → **Code Export**
3. Copy the scene URL (format: `https://prod.spline.design/[ID]/scene.splinecode`)
4. Open `src/App.vue` and replace the placeholder URL:

```javascript
const splineSceneUrl = ref('YOUR-SPLINE-URL-HERE')
```

### 3. Add Background Music (Optional)

1. Add your Christmas music file to `public/audio/`
2. Name it `christmas-music.mp3` (or update the path in `MusicControl.vue`)
3. Recommended format: MP3, 128kbps, 2-3 minutes, ~2MB

### 4. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

Output will be in the `dist` folder.

## Deploy to Vercel

### Option 1: Via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"

### Option 2: Via CLI

```bash
npm install -g vercel
vercel
```

## Project Structure

```
christmasGreeting/
├── public/
│   └── audio/           # Add your music file here
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css # Global styles and animations
│   ├── components/
│   │   ├── SplineBackground.vue    # 3D background layer
│   │   ├── GreetingText.vue        # Animated text
│   │   └── MusicControl.vue        # Music toggle button
│   ├── composables/
│   │   └── useAudio.js             # Audio control logic
│   ├── App.vue                     # Main component
│   └── main.js                     # Entry point
├── index.html
├── vite.config.js
├── vercel.json          # Vercel deployment config
└── package.json
```

## Customization

### Change Text Content

Edit `src/components/GreetingText.vue`:

```vue
<h1 class="greeting-text">
  Your Custom Message
</h1>
<p class="greeting-year">
  2024
</p>
```

### Adjust Animation Timing

Edit `src/assets/styles/main.css`:

```css
.greeting-text {
  /* Delay: 1.5s, Duration: 2s */
  animation: fadeInUp 2s ease-out 1.5s forwards;
}
```

### Change Colors

Edit CSS variables in `src/assets/styles/main.css`:

```css
:root {
  --color-text: #ffffff;
  --color-glow: #ffd700;  /* Gold glow */
  --color-shadow: rgba(0, 0, 0, 0.8);
}
```

### Modify Music Volume

Edit `src/composables/useAudio.js`:

```javascript
audio.value.volume = 0.3 // 30% volume (range: 0.0 - 1.0)
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari 14+, Chrome Android

## Performance Tips

1. Keep Spline scene under 5MB for fast loading
2. Optimize audio file (MP3, 128kbps recommended)
3. Use WebP images if adding custom graphics
4. Test on mobile devices for responsiveness

## Troubleshooting

### Spline Scene Not Loading

- Verify the scene URL is correct and public
- Check browser console for errors
- Ensure `@splinetool/runtime` is installed

### Music Not Playing

- Browsers block autoplay; user must click the button
- Check audio file path is correct
- Verify file is in `public/audio/` folder

### Build Errors on Vercel

- Ensure Node version is 18+ in Vercel settings
- Check all dependencies are in `package.json`
- Review build logs for specific errors

## License

MIT

## Credits

Built with:
- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Spline](https://spline.design/)
- [Google Fonts](https://fonts.google.com/)

---

Merry Christmas! 🎄✨
