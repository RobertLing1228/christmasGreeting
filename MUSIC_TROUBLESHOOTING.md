# Music Troubleshooting Guide

## Current Setup ✓

Your music file is correctly placed:
- **Location**: `public/audio/christmas-is-coming.mp3` ✓
- **Size**: 4.5MB
- **Path in code**: `/audio/christmas-is-coming.mp3` ✓

## How to Test

1. **Open the dev server**: http://localhost:3001
2. **Open browser console**: Press F12 or right-click → Inspect → Console
3. **Click the music button** (🔇 icon in top-right)
4. **Check console logs** for messages:
   - "Audio loaded successfully" = File found ✓
   - "Audio playing" = Music started ✓
   - "Audio error" = Problem ✗

## Common Issues & Solutions

### Issue 1: Button doesn't respond
**Symptoms**: Clicking the music button does nothing

**Solutions**:
1. Check browser console for errors
2. Wait 2 seconds after page load (button fades in)
3. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)

### Issue 2: "Failed to load audio" error
**Symptoms**: Console shows audio error

**Solutions**:
1. Verify file exists:
   ```bash
   ls public/audio/
   ```
2. Check file name matches exactly: `christmas-is-coming.mp3`
3. Restart dev server:
   ```bash
   npm run dev
   ```

### Issue 3: Music loads but doesn't play
**Symptoms**: Console shows "Audio loaded" but no sound

**Solutions**:
1. **Check browser volume**: Make sure browser tab isn't muted
2. **Check system volume**: Ensure computer volume is up
3. **Try different browser**: Some browsers block audio differently
4. **Check file format**: Should be MP3 format

### Issue 4: Browser blocks autoplay
**Symptoms**: Error about "user interaction required"

**This is normal!** Browsers require user interaction to play audio.
- User MUST click the button to start music
- This is a browser security feature
- The button is designed for this purpose ✓

### Issue 5: Music plays but is too quiet/loud
**Solution**: Adjust volume in `src/composables/useAudio.js`:

```javascript
audio.value.volume = 0.3  // Change this value
// 0.0 = mute
// 0.3 = 30% (current setting)
// 1.0 = 100% (maximum)
```

## Testing Checklist

- [ ] File is in `public/audio/christmas-is-coming.mp3`
- [ ] Dev server is running (`npm run dev`)
- [ ] Browser console is open (F12)
- [ ] Page has loaded completely
- [ ] Music button is visible (top-right corner)
- [ ] Clicked the button (should change from 🔇 to 🔊)
- [ ] Console shows "Audio playing"
- [ ] Browser tab is not muted
- [ ] System volume is up

## Debug Commands

Check file exists:
```bash
ls -lh public/audio/
```

Test file is valid MP3:
```bash
file public/audio/christmas-is-coming.mp3
```

Rebuild and restart:
```bash
npm run build
npm run dev
```

## Browser Console Expected Output

When working correctly, you should see:
```
Audio loaded successfully: /audio/christmas-is-coming.mp3
Audio playing
```

When stopping:
```
Audio paused
```

## Alternative: Test with Browser DevTools

1. Open browser console (F12)
2. Go to **Network** tab
3. Refresh page
4. Click music button
5. Look for request to `/audio/christmas-is-coming.mp3`
6. Check status:
   - **200** = File loaded successfully ✓
   - **404** = File not found ✗

## Quick Fix: Restart Everything

If nothing works, try this:
```bash
# Kill dev server (Ctrl+C)
# Then:
npm run dev
```

Then:
1. Open http://localhost:3000 (or 3001)
2. Hard refresh (Ctrl+Shift+R)
3. Wait 2 seconds
4. Click music button
5. Check console

## Still Not Working?

Check these in browser console:
1. Any red error messages?
2. What appears when you click the button?
3. Does the icon change from 🔇 to 🔊?

The improved error handling will now show alerts if there are issues!
