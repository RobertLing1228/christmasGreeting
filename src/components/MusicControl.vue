<template>
  <button
    class="music-control"
    @click="togglePlay"
    :aria-label="isPlaying ? 'Pause music' : 'Play music'"
  >
    <span class="music-icon">
      {{ isPlaying ? '🔊' : '🔇' }}
    </span>
  </button>
</template>

<script setup>
import { useAudio } from '../composables/useAudio'

const props = defineProps({
  audioSrc: {
    type: String,
    default: '/audio/christmas-is-coming.mp3'
  }
})

const { isPlaying, togglePlay } = useAudio(props.audioSrc)
</script>

<style scoped>
.music-control {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: fadeIn 1s ease-out 2s forwards;
  opacity: 0;
}

.music-control:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #ffd700;
  transform: scale(1.1);
}

.music-control:active {
  transform: scale(0.95);
}

.music-icon {
  font-size: 1.8rem;
  filter: drop-shadow(0 0 10px #ffd700);
}

@media (max-width: 768px) {
  .music-control {
    width: 50px;
    height: 50px;
    top: 15px;
    right: 15px;
  }

  .music-icon {
    font-size: 1.5rem;
  }
}
</style>
