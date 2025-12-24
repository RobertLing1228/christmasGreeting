import { ref, onUnmounted } from 'vue'

export function useAudio(audioSrc) {
  const isPlaying = ref(false)
  const audio = ref(null)
  const error = ref(null)

  // Initialize audio element
  const initAudio = () => {
    if (!audio.value) {
      audio.value = new Audio(audioSrc)
      audio.value.loop = true
      audio.value.volume = 0.3 // 30% volume

      // Add error handler
      audio.value.addEventListener('error', (e) => {
        console.error('Audio error:', e)
        error.value = `Failed to load audio: ${audioSrc}`
      })

      // Add success handler
      audio.value.addEventListener('canplaythrough', () => {
        console.log('Audio loaded successfully:', audioSrc)
      })
    }
  }

  // Toggle play/pause
  const togglePlay = async () => {
    try {
      initAudio()

      if (isPlaying.value) {
        audio.value.pause()
        isPlaying.value = false
        console.log('Audio paused')
      } else {
        await audio.value.play()
        isPlaying.value = true
        console.log('Audio playing')
      }
    } catch (err) {
      console.error('Error toggling audio:', err)
      error.value = err.message
      // User interaction might be required
      alert('Unable to play audio. Please ensure your browser allows audio playback.')
    }
  }

  // Cleanup on component unmount
  onUnmounted(() => {
    if (audio.value) {
      audio.value.pause()
      audio.value = null
    }
  })

  return {
    isPlaying,
    togglePlay,
    error
  }
}
