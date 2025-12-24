import { ref, onUnmounted, computed } from 'vue'

export function usePlaylist() {
  const playlist = ref([
    { filename: '1. christmas-nice.mp3', title: 'Christmas Nice' },
    { filename: '2. christmas-is-coming.mp3', title: 'Christmas Is Coming' }
  ])

  const currentIndex = ref(0)
  const isPlaying = ref(false)
  const audio = ref(null)
  const error = ref(null)
  const currentTime = ref(0)
  const duration = ref(0)

  // Get current song info
  const currentSong = computed(() => playlist.value[currentIndex.value])
  const currentSongPath = computed(() => `/audio/${currentSong.value.filename}`)

  // Initialize audio element
  const initAudio = () => {
    if (audio.value) {
      audio.value.pause()
      audio.value = null
    }

    audio.value = new Audio(currentSongPath.value)
    audio.value.volume = 0.3 // 30% volume

    // Event listeners
    audio.value.addEventListener('error', (e) => {
      console.error('Audio error:', e)
      error.value = `Failed to load: ${currentSong.value.title}`
    })

    audio.value.addEventListener('canplaythrough', () => {
      console.log('Audio loaded:', currentSong.value.title)
      duration.value = audio.value.duration
    })

    audio.value.addEventListener('timeupdate', () => {
      currentTime.value = audio.value.currentTime
    })

    audio.value.addEventListener('ended', () => {
      console.log('Song ended, playing next...')
      playNext()
    })

    audio.value.addEventListener('loadedmetadata', () => {
      duration.value = audio.value.duration
    })
  }

  // Play current song
  const play = async () => {
    try {
      if (!audio.value) {
        initAudio()
      }
      await audio.value.play()
      isPlaying.value = true
      console.log('Playing:', currentSong.value.title)
    } catch (err) {
      console.error('Error playing audio:', err)
      error.value = err.message
    }
  }

  // Pause current song
  const pause = () => {
    if (audio.value) {
      audio.value.pause()
      isPlaying.value = false
      console.log('Paused:', currentSong.value.title)
    }
  }

  // Toggle play/pause
  const togglePlay = async () => {
    if (isPlaying.value) {
      pause()
    } else {
      await play()
    }
  }

  // Play next song
  const playNext = async () => {
    currentIndex.value = (currentIndex.value + 1) % playlist.value.length
    initAudio()
    if (isPlaying.value) {
      await play()
    }
  }

  // Play previous song
  const playPrevious = async () => {
    currentIndex.value = (currentIndex.value - 1 + playlist.value.length) % playlist.value.length
    initAudio()
    if (isPlaying.value) {
      await play()
    }
  }

  // Seek to position
  const seek = (time) => {
    if (audio.value) {
      audio.value.currentTime = time
    }
  }

  // Set volume
  const setVolume = (vol) => {
    if (audio.value) {
      audio.value.volume = Math.max(0, Math.min(1, vol))
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
    // State
    playlist,
    currentIndex,
    currentSong,
    isPlaying,
    error,
    currentTime,
    duration,

    // Methods
    play,
    pause,
    togglePlay,
    playNext,
    playPrevious,
    seek,
    setVolume
  }
}
