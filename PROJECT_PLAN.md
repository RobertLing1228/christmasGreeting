# Christmas Greeting - Vite + Vue 3 Single Page Website

## Project Overview
A single-page website built with Vite and Vue 3, featuring 3D animations powered by Spline. Designed for deployment on Vercel with no backend dependencies.

## Tech Stack
- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **3D Graphics**: Spline (via @splinetool/runtime)
- **Styling**: CSS3 / Optional: TailwindCSS or UnoCSS
- **Deployment**: Vercel
- **Language**: JavaScript/TypeScript

## Dependencies

### Core Dependencies
```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "@splinetool/runtime": "^1.9.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

### Optional Dependencies (Recommended)
- **tailwindcss**: For utility-first CSS styling
- **@vueuse/core**: Vue composition utilities
- **typescript**: For type safety
- **prettier**: Code formatting
- **eslint**: Code linting

## Project Structure
```
christmasGreeting/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── styles/
│   │   │   └── main.css
│   │   └── images/
│   ├── components/
│   │   ├── SplineScene.vue
│   │   ├── HeroSection.vue
│   │   ├── GreetingMessage.vue
│   │   └── Footer.vue
│   ├── composables/
│   │   └── useSpline.js
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

## Setup Instructions

### 1. Initialize Project
```bash
npm create vite@latest christmasGreeting -- --template vue
cd christmasGreeting
npm install
```

### 2. Install Spline Runtime
```bash
npm install @splinetool/runtime
```

### 3. Optional: Install Additional Dependencies
```bash
# TailwindCSS (if using)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Vue utilities
npm install @vueuse/core

# TypeScript (if using)
npm install -D typescript @types/node
```

## Spline 3D Integration

### Getting Your Spline Scene URL
1. Create/edit your scene at [spline.design](https://spline.design)
2. Click "Export" → "Code Export"
3. Copy the scene URL (format: `https://prod.spline.design/[ID]/scene.splinecode`)

### Integration Methods

#### Method 1: Using Vue Component (Recommended)
Create `src/components/SplineScene.vue`:
```vue
<template>
  <div ref="canvasContainer" class="spline-container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Application } from '@splinetool/runtime'

const props = defineProps({
  sceneUrl: {
    type: String,
    required: true
  }
})

const canvasContainer = ref(null)

onMounted(() => {
  const canvas = document.createElement('canvas')
  canvasContainer.value.appendChild(canvas)

  const app = new Application(canvas)
  app.load(props.sceneUrl)
})
</script>

<style scoped>
.spline-container {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
```

#### Method 2: Using Iframe Embed
```vue
<template>
  <iframe
    :src="splineUrl"
    frameborder="0"
    width="100%"
    height="100%"
  ></iframe>
</template>
```

## Vercel Deployment Configuration

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Deployment Steps
1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Vercel auto-detects Vite configuration
4. Deploy with default settings
5. Optional: Configure custom domain

## Vite Configuration

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/', // Use '/<repo-name>/' for GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  },
  server: {
    port: 3000,
    open: true
  }
})
```

## Features to Implement

### Core Features
- [ ] Spline 3D scene integration
- [ ] Responsive layout (mobile, tablet, desktop)
- [ ] Loading state for 3D scene
- [ ] Greeting message overlay
- [ ] Social sharing meta tags

### Optional Enhancements
- [ ] Interactive 3D elements (click handlers)
- [ ] Background music toggle
- [ ] Snow particle effects (CSS/Canvas)
- [ ] Smooth scroll animations
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Email capture form
- [ ] Countdown timer
- [ ] Confetti animation on interaction

## Performance Optimization

### Best Practices
1. **Lazy load Spline**: Load 3D scene after initial paint
2. **Optimize assets**: Compress images, use WebP format
3. **Code splitting**: Dynamic imports for heavy components
4. **Preload critical assets**: Use `<link rel="preload">`
5. **Minimize bundle size**: Tree-shake unused code

### Lighthouse Goals
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## SEO & Meta Tags

### Essential Meta Tags (in index.html)
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Wishing you a Merry Christmas with a magical 3D greeting card" />

  <!-- Open Graph -->
  <meta property="og:title" content="Christmas Greeting 2024" />
  <meta property="og:description" content="Interactive 3D Christmas greeting" />
  <meta property="og:image" content="/og-image.jpg" />
  <meta property="og:type" content="website" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Christmas Greeting 2024" />
  <meta name="twitter:description" content="Interactive 3D Christmas greeting" />
  <meta name="twitter:image" content="/twitter-image.jpg" />

  <title>Christmas Greeting 2024</title>
</head>
```

## Development Workflow

### Available Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js",
    "format": "prettier --write \"src/**/*.{vue,js,css}\""
  }
}
```

### Local Development
```bash
npm run dev
# Open http://localhost:3000
```

### Production Build
```bash
npm run build
npm run preview # Preview production build locally
```

## Troubleshooting

### Common Issues

**Spline scene not loading**
- Verify the scene URL is correct and public
- Check browser console for CORS errors
- Ensure @splinetool/runtime is installed

**Build fails on Vercel**
- Check Node version compatibility (use Node 18+)
- Verify all dependencies are in package.json
- Review build logs for specific errors

**Large bundle size**
- Implement dynamic imports for Spline
- Use Vite's code splitting features
- Optimize Spline scene complexity

## Environment Variables
```bash
# .env (if needed for future features)
VITE_APP_TITLE=Christmas Greeting 2024
VITE_SPLINE_SCENE_URL=https://prod.spline.design/YOUR-ID/scene.splinecode
```

## Browser Support
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 14+, Chrome Android

## License
MIT

## Next Steps
1. Create the project structure
2. Implement SplineScene component
3. Design the greeting message UI
4. Add responsive styling
5. Test on multiple devices
6. Deploy to Vercel
7. Share and celebrate!
