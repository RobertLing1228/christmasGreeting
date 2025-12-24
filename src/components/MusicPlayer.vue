<template>
  <div class="music-player">
    <button
      @click="playPrevious"
      class="control-btn"
      aria-label="Previous song"
      title="Previous"
    >
      ⏮
    </button>

    <button
      @click="togglePlay"
      class="control-btn play-btn"
      aria-label="Play/Pause"
      :title="isPlaying ? 'Pause' : 'Play'"
    >
      {{ isPlaying ? '⏸' : '▶' }}
    </button>

    <button
      @click="playNext"
      class="control-btn"
      aria-label="Next song"
      title="Next"
    >
      ⏭
    </button>

    <div class="volume-control">
      <span class="volume-icon">🔊</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        :value="volume"
        @input="handleVolumeChange"
        class="volume-slider"
        aria-label="Volume control"
      />
    </div>

    <div class="song-info">
      <span class="song-title">
        <span
          v-for="(char, index) in (currentSong.title + '.mp3')"
          :key="index"
          class="char"
          :style="{ animationDelay: `${index * 0.05}s` }"
        >
          {{ char === ' ' ? '\u00A0' : char }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePlaylist } from '../composables/usePlaylist'

const {
  currentSong,
  isPlaying,
  currentTime,
  duration,
  volume,
  togglePlay,
  playNext,
  playPrevious,
  play,
  setVolume
} = usePlaylist()

// Handle volume change
const handleVolumeChange = (e) => {
  setVolume(parseFloat(e.target.value))
}

// Format time in MM:SS
const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Auto-play on mount
onMounted(async () => {
  // Wait a bit for page to load, then auto-play
  setTimeout(async () => {
    try {
      await play()
      console.log('Auto-play started')
    } catch (error) {
      console.log('Auto-play blocked by browser. User must click play button.')
    }
  }, 2000)
})
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  max-width: 90%;
  z-index: 100;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 0.5rem 1rem;

  max-height: 60px;

  animation: fadeIn 1s ease-out 2s forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.control-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 1rem;
  padding: 0.4rem;
  transition: all 0.2s ease;
  line-height: 1;
}

.control-btn:hover {
  color: #ffd700;
  transform: scale(1.1);
}

.control-btn:active {
  transform: scale(0.95);
}

.play-btn {
  font-size: 1.2rem;
  color: #ffd700;
  margin: 0 0.3rem;
}

.play-btn:hover {
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-left: 0.5rem;
}

.volume-icon {
  font-size: 0.9rem;
  opacity: 0.7;
}

.volume-slider {
  width: 60px;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.volume-slider:hover {
  background: rgba(255, 255, 255, 0.3);
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: #ffd700;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.volume-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: #ffd700;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.volume-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
}

.volume-slider::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
}

.song-info {
  margin-left: 0.5rem;
  padding-left: 0.75rem;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
}

.song-title {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 400;
  white-space: nowrap;
  letter-spacing: 0.02em;
  display: inline-flex;
  min-width: max-content;
}

.char {
  display: inline-block;
  animation: gentleBounce 2s ease-in-out infinite;
}

@keyframes gentleBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .music-player {
    bottom: 15px;
    padding: 0.4rem 0.8rem;
    max-height: 50px;
    gap: 0.3rem;
  }

  .control-btn {
    font-size: 0.9rem;
    padding: 0.3rem;
  }

  .play-btn {
    font-size: 1.1rem;
    margin: 0 0.2rem;
  }

  .song-title {
    font-size: 0.75rem;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .song-info {
    margin-left: 0.3rem;
    padding-left: 0.5rem;
  }

  .volume-control {
    gap: 0.3rem;
    margin-left: 0.3rem;
  }

  .volume-slider {
    width: 50px;
  }

  .volume-icon {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .music-player {
    bottom: 10px;
    padding: 0.3rem 0.6rem;
    max-height: 45px;
  }

  .control-btn {
    font-size: 0.85rem;
  }

  .play-btn {
    font-size: 1rem;
  }

  .song-title {
    font-size: 0.7rem;
    max-width: 100px;
  }

  .volume-control {
    gap: 0.2rem;
    margin-left: 0.2rem;
  }

  .volume-slider {
    width: 40px;
  }

  .volume-icon {
    font-size: 0.8rem;
  }
}
</style>
