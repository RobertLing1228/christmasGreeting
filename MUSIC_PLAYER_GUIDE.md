# Music Player Guide

## ✨ New Features

Your Christmas greeting now has a full-featured music player!

### What's New:
- ✅ **Auto-play**: Music starts automatically after 2 seconds
- ✅ **Playlist**: Plays songs in order based on filename
- ✅ **Auto-advance**: Automatically plays next song when current one ends
- ✅ **Bottom controls**: Player bar at the bottom with all controls
- ✅ **Song display**: Shows song name WITHOUT the order number
- ✅ **Navigation**: Previous/Next buttons to skip songs

## 🎵 Current Playlist

Your audio files are loaded in this order:
1. **Christmas Nice** (`1. christmas-nice.mp3`)
2. **Christmas Is Coming** (`2. christmas-is-coming.mp3`)

## 🎮 Controls

**Player Location**: Bottom of screen (slides up after 2s)

**Buttons**:
- ⏮️ **Previous**: Go to previous song
- ▶️/⏸️ **Play/Pause**: Toggle playback
- ⏭️ **Next**: Skip to next song

**Display**:
- Song title (e.g., "Christmas Nice")
- Progress time (e.g., "0:45 / 3:22")

## 📁 Adding More Songs

To add more songs to your playlist:

### 1. Add files to `public/audio/` with numbered prefixes:
```
public/audio/
├── 1. christmas-nice.mp3
├── 2. christmas-is-coming.mp3
├── 3. jingle-bells.mp3          ← New
├── 4. silent-night.mp3           ← New
└── 5. we-wish-you.mp3            ← New
```

### 2. Update the playlist in `src/composables/usePlaylist.js`:

```javascript
const playlist = ref([
  { filename: '1. christmas-nice.mp3', title: 'Christmas Nice' },
  { filename: '2. christmas-is-coming.mp3', title: 'Christmas Is Coming' },
  { filename: '3. jingle-bells.mp3', title: 'Jingle Bells' },        // Add this
  { filename: '4. silent-night.mp3', title: 'Silent Night' },        // Add this
  { filename: '5. we-wish-you.mp3', title: 'We Wish You' }           // Add this
])
```

### 3. Restart dev server:
```bash
npm run dev
```

## 🎨 Customization

### Change Auto-play Delay

Edit `src/components/MusicPlayer.vue` (line 72):
```javascript
setTimeout(async () => {
  await play()
}, 2000)  // Change this value (milliseconds)
```

### Change Volume

Edit `src/composables/usePlaylist.js` (line 25):
```javascript
audio.value.volume = 0.3  // Change: 0.0 (mute) to 1.0 (max)
```

### Change Player Position

Edit `src/components/MusicPlayer.vue` CSS:
```css
.music-player {
  bottom: 0;        /* Change to top: 0 for top position */
  left: 0;
  right: 0;
}
```

### Customize Colors

Edit `src/components/MusicPlayer.vue` CSS:
```css
.music-player {
  background: rgba(0, 0, 0, 0.7);           /* Player background */
  border-top: 2px solid rgba(255, 215, 0, 0.3);  /* Border color */
}

.play-btn {
  background: rgba(255, 215, 0, 0.2);       /* Play button color */
  border-color: #ffd700;                     /* Button border */
}
```

## 🔧 How It Works

### Auto-play Behavior:
1. Page loads
2. After 2 seconds, player attempts to auto-play
3. If browser blocks it, user must click play button

**Note**: Most modern browsers block auto-play until user interaction. If auto-play doesn't work immediately, just click the play button!

### Playlist Flow:
```
Song 1 → Auto-play → Plays to end →
Song 2 → Auto-play → Plays to end →
Song 1 → Loop continues...
```

### Navigation:
- **Next button**: Skips to next song (loops to first if at end)
- **Previous button**: Goes to previous song (loops to last if at start)
- **Play/Pause**: Toggles current song

## 📱 Responsive Design

The player adapts to screen size:

**Desktop**: Full layout with song info and all controls side-by-side

**Tablet**: Slightly smaller buttons and text

**Mobile**: Stacked layout - song info on top, controls below

## 🐛 Troubleshooting

### Music doesn't auto-play
**Normal!** Browsers block auto-play. Just click the play button (▶️).

### Song name not showing
Check console for errors. Make sure the filename in `usePlaylist.js` matches the actual file.

### Controls not appearing
Wait 2 seconds for the slide-up animation. Player has `z-index: 100` (top layer).

### Previous/Next buttons not working
Check browser console for errors. Verify all files exist in `public/audio/`.

### Can't hear music
1. Check browser tab isn't muted
2. Check system volume
3. Current volume is set to 30% - increase in `usePlaylist.js`

## 📊 File Structure

```
src/
├── components/
│   ├── MusicPlayer.vue          ← New music player UI
│   ├── MusicControl.vue         ← Old (not used anymore)
│   ├── SplineBackground.vue
│   └── GreetingText.vue
├── composables/
│   ├── usePlaylist.js           ← New playlist logic
│   └── useAudio.js              ← Old (not used anymore)
└── App.vue                      ← Updated to use MusicPlayer

public/
└── audio/
    ├── 1. christmas-nice.mp3
    └── 2. christmas-is-coming.mp3
```

## 🚀 Quick Test

1. Open http://localhost:3001
2. Wait 2 seconds
3. Music should auto-play (or click play button)
4. See song title at bottom: "Christmas Nice"
5. Click Next button → switches to "Christmas Is Coming"
6. Let it play to the end → automatically goes to next song

## 🎄 Tips

- **Loop playlist**: When last song ends, it goes back to first song
- **Smooth transitions**: Songs change seamlessly
- **Visual feedback**: Buttons highlight on hover
- **Progress display**: See current time and total duration
- **Clean design**: Glassmorphism effect with gold accents

Enjoy your Christmas music player! 🎵✨
