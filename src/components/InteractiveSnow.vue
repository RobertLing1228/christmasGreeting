<template>
  <div class="interactive-snow-container">
    <!-- Snow particles -->
    <div
      v-for="(particle, index) in snowParticles"
      :key="index"
      class="snow-particle"
      :style="{
        left: particle.x + 'px',
        top: particle.y + 'px',
        width: particle.size + 'px',
        height: particle.size + 'px',
        opacity: particle.opacity,
        transform: `translate(-50%, -50%) scale(${particle.scale})`,
        transition: (particle.isGathering || particle.isFalling) ? 'none' : 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }"
    ></div>

    <!-- Press and hold ripple effect -->
    <div
      v-if="isPressed"
      class="ripple-effect"
      :style="{
        left: pressX + 'px',
        top: pressY + 'px'
      }"
    ></div>

    <!-- Touch indicator ring -->
    <div
      v-if="isPressed"
      class="touch-ring"
      :style="{
        left: pressX + 'px',
        top: pressY + 'px'
      }"
    ></div>

    <!-- Greeting message -->
    <div
      v-if="showGreeting"
      class="greeting-message"
      :style="{
        left: greetingX + 'px',
        top: greetingY + 'px'
      }"
    >
      <span
        v-for="(char, index) in currentGreeting"
        :key="'char-' + index"
        class="greeting-char"
        :style="{
          animationDelay: `${index * 0.05}s, ${index * 0.05 + 3.5}s`
        }"
      >
        {{ char === ' ' ? '\u00A0' : char }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const snowParticles = ref([])
const isPressed = ref(false)
const pressX = ref(0)
const pressY = ref(0)
const lastPressX = ref(0)
const lastPressY = ref(0)
const motionVelocityX = ref(0)
const motionVelocityY = ref(0)
const gatherInterval = ref(null)
const showGreeting = ref(false)
const currentGreeting = ref('')
const greetingX = ref(0)
const greetingY = ref(0)
let greetingTimeout = null

// Sound effect
const bellsSound = ref(null)

// 20 different greeting messages
const greetings = [
  'Merry Christmas~ Ho~ Ho~ Ho~',
  'Having fun?',
  'Hope you enjoy!',
  "Let's meet another day!",
  "It's going to be a great new year!",
  'Wishing you joy and happiness!',
  'May your days be merry and bright!',
  'Spread the Christmas cheer!',
  'Magic is in the air tonight!',
  'Believe in the wonder of Christmas!',
  'Peace, love, and joy to you!',
  'May your heart be filled with warmth!',
  'Christmas wishes coming true!',
  'Sparkle and shine this season!',
  'Sending you festive vibes!',
  'Celebrate with joy and laughter!',
  'Tis the season to be jolly!',
  'Making spirits bright tonight!',
  'Dreams and wishes for the new year!',
  'Cherish every magical moment!'
]

let lastGreetingIndex = -1

// Initialize snow particles - spawn at top, fall to ground
const initSnowParticles = () => {
  const particles = []
  const count = 50 // Number of snow particles

  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -Math.random() * window.innerHeight * 0.45, // Start above viewport in top 45%
      size: Math.random() * 4 + 2, // 2-6px
      opacity: Math.random() * 0.6 + 0.4, // 0.4-1
      scale: 1,
      velocityX: (Math.random() - 0.5) * 0.3, // Gentle horizontal drift
      velocityY: Math.random() * 0.5 + 0.3, // Fall speed
      isGathering: false,
      originalX: 0,
      originalY: 0,
      isFalling: true
    })
  }

  snowParticles.value = particles
  startSnowfall()
}

// Animate snowfall
const startSnowfall = () => {
  const animate = () => {
    snowParticles.value.forEach(particle => {
      if (particle.isFalling && !particle.isGathering) {
        // Update position
        particle.x += particle.velocityX
        particle.y += particle.velocityY

        // Reset to top when reaching ground (top 45% of screen height)
        const groundLevel = window.innerHeight * 0.45
        if (particle.y > groundLevel) {
          particle.y = -20
          particle.x = Math.random() * window.innerWidth
        }

        // Keep within horizontal bounds with wrap-around
        if (particle.x < -10) {
          particle.x = window.innerWidth + 10
        } else if (particle.x > window.innerWidth + 10) {
          particle.x = -10
        }
      }
    })

    if (snowParticles.value.length > 0) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

// Start gathering snow
const startGathering = (x, y) => {
  isPressed.value = true
  pressX.value = x
  pressY.value = y
  lastPressX.value = x
  lastPressY.value = y
  motionVelocityX.value = 0
  motionVelocityY.value = 0

  // Play bells sound effect
  if (bellsSound.value) {
    bellsSound.value.currentTime = 0
    bellsSound.value.play().catch(err => console.log('Audio play failed:', err))
  }

  // Store original positions and stop falling
  snowParticles.value.forEach(particle => {
    particle.originalX = particle.x
    particle.originalY = particle.y
    particle.isGathering = true
    particle.isFalling = false
  })

  // Gradually gather snow particles
  let progress = 0
  gatherInterval.value = setInterval(() => {
    progress += 0.02

    snowParticles.value.forEach((particle, index) => {
      // Create staggered gathering effect
      const delay = (index % 10) * 0.01
      const adjustedProgress = Math.min(1, Math.max(0, progress - delay))

      // Ease-in gathering
      const easeProgress = 1 - Math.pow(1 - adjustedProgress, 3)

      particle.x = particle.originalX + (pressX.value - particle.originalX) * easeProgress
      particle.y = particle.originalY + (pressY.value - particle.originalY) * easeProgress
      particle.scale = 1 + easeProgress * 0.5 // Grow slightly as gathering
      particle.opacity = 0.4 + easeProgress * 0.6 // Brighten as gathering
    })

    if (progress >= 1.2) {
      clearInterval(gatherInterval.value)
    }
  }, 16) // ~60fps
}

// Update motion tracking
const updateMotion = (x, y) => {
  if (isPressed.value) {
    // Calculate velocity based on movement
    motionVelocityX.value = x - lastPressX.value
    motionVelocityY.value = y - lastPressY.value

    lastPressX.value = x
    lastPressY.value = y
  }
}

// Show random greeting message
const showRandomGreeting = (x, y) => {
  // Clear any existing greeting timeout
  if (greetingTimeout) {
    clearTimeout(greetingTimeout)
    greetingTimeout = null
  }

  // Immediately hide any existing greeting
  showGreeting.value = false

  // Small delay before showing new greeting to ensure clean state
  setTimeout(() => {
    // Ensure greeting stays in viewable area
    const margin = 20
    const maxWidth = window.innerWidth - margin * 2
    const maxHeight = window.innerHeight - margin * 2

    // Adjust x position to keep text centered in viewport
    let adjustedX = Math.max(margin, Math.min(maxWidth, x))
    let adjustedY = Math.max(100, Math.min(maxHeight - 100, y))

    // Get a different greeting than last time
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * greetings.length)
    } while (randomIndex === lastGreetingIndex && greetings.length > 1)

    lastGreetingIndex = randomIndex
    currentGreeting.value = greetings[randomIndex]
    greetingX.value = adjustedX
    greetingY.value = adjustedY
    showGreeting.value = true

    // Hide greeting after animation completes
    // Fade in time: characters * 0.05s + 0.5s for full display
    // Display time: 3s
    // Fade out time: 2s
    const displayTime = currentGreeting.value.length * 50 + 500 + 3000 + 2000
    greetingTimeout = setTimeout(() => {
      showGreeting.value = false
      greetingTimeout = null
    }, displayTime)
  }, 100)
}

// Scatter snow in direction of motion
const scatterSnow = (x, y) => {
  isPressed.value = false
  clearInterval(gatherInterval.value)

  // Stop bells sound after 0.3s
  setTimeout(() => {
    if (bellsSound.value) {
      bellsSound.value.pause()
    }
  }, 300)

  // Show greeting message
  showRandomGreeting(x, y)

  // Calculate motion magnitude and normalize
  const motionMagnitude = Math.sqrt(
    motionVelocityX.value * motionVelocityX.value +
    motionVelocityY.value * motionVelocityY.value
  )

  // If there's significant motion, scatter in that direction
  // Otherwise, scatter in all directions
  const hasMotion = motionMagnitude > 2

  snowParticles.value.forEach((particle, index) => {
    particle.isGathering = false

    let scatterX, scatterY

    if (hasMotion) {
      // Scatter in direction of motion with spread
      const baseAngle = Math.atan2(motionVelocityY.value, motionVelocityX.value)
      const spread = (Math.PI / 3) // 60 degree spread
      const randomSpread = (Math.random() - 0.5) * spread
      const angle = baseAngle + randomSpread

      // Distance based on motion speed + randomness
      const baseDistance = Math.min(motionMagnitude * 20, 400)
      const distance = baseDistance + Math.random() * 200

      scatterX = Math.cos(angle) * distance
      scatterY = Math.sin(angle) * distance
    } else {
      // No motion - scatter in circular pattern
      const angle = (index / snowParticles.value.length) * Math.PI * 2
      const distance = Math.random() * 300 + 150
      scatterX = Math.cos(angle) * distance
      scatterY = Math.sin(angle) * distance
    }

    // Apply scatter
    particle.x = x + scatterX
    particle.y = y + scatterY
    particle.scale = 1
    particle.opacity = Math.random() * 0.6 + 0.4

    // After scatter animation, resume falling
    setTimeout(() => {
      particle.isFalling = true
      particle.isGathering = false
    }, 800)
  })
}

// Mouse events (desktop)
const handleMouseDown = (e) => {
  // Ignore clicks on music controller, present button, and dialog
  if (e.target.closest('.music-player') ||
      e.target.closest('.present-container') ||
      e.target.closest('.dialog-overlay')) {
    return
  }
  startGathering(e.clientX, e.clientY)
}

const handleMouseMove = (e) => {
  if (isPressed.value) {
    updateMotion(e.clientX, e.clientY)
    pressX.value = e.clientX
    pressY.value = e.clientY
  }
}

const handleMouseUp = (e) => {
  if (isPressed.value) {
    updateMotion(e.clientX, e.clientY)
    scatterSnow(e.clientX, e.clientY)
  }
}

// Touch events (mobile)
const handleTouchStart = (e) => {
  // Ignore touches on music controller, present button, and dialog
  if (e.target.closest('.music-player') ||
      e.target.closest('.present-container') ||
      e.target.closest('.dialog-overlay')) {
    return
  }
  e.preventDefault()
  const touch = e.touches[0]
  startGathering(touch.clientX, touch.clientY)
}

const handleTouchMove = (e) => {
  if (isPressed.value && e.touches.length > 0) {
    const touch = e.touches[0]
    updateMotion(touch.clientX, touch.clientY)
    pressX.value = touch.clientX
    pressY.value = touch.clientY
  }
}

const handleTouchEnd = (e) => {
  if (isPressed.value) {
    const touch = e.changedTouches[0]
    updateMotion(touch.clientX, touch.clientY)
    scatterSnow(touch.clientX, touch.clientY)
  }
}

onMounted(() => {
  initSnowParticles()

  // Initialize bells sound effect
  bellsSound.value = new Audio('/audio/sound-effect/bells-sound-effect-press-hold.mp3')
  bellsSound.value.volume = 0.6

  // Add event listeners
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
  window.addEventListener('touchstart', handleTouchStart, { passive: false })
  window.addEventListener('touchmove', handleTouchMove, { passive: false })
  window.addEventListener('touchend', handleTouchEnd)
})

onBeforeUnmount(() => {
  clearInterval(gatherInterval.value)

  // Clear greeting timeout
  if (greetingTimeout) {
    clearTimeout(greetingTimeout)
  }

  // Remove event listeners
  window.removeEventListener('mousedown', handleMouseDown)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchmove', handleTouchMove)
  window.removeEventListener('touchend', handleTouchEnd)
})
</script>

<style scoped>
.interactive-snow-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.snow-particle {
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%);
  border-radius: 50%;
  pointer-events: none;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  will-change: transform, opacity;
}

.ripple-effect {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
  transform: translate(-50%, -50%);
  animation: ripple 1.5s ease-out infinite;
  pointer-events: none;
}

.touch-ring {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 3px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: pulse-ring 1s ease-in-out infinite;
  pointer-events: none;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

@keyframes ripple {
  0% {
    width: 40px;
    height: 40px;
    opacity: 0.8;
  }
  100% {
    width: 200px;
    height: 200px;
    opacity: 0;
  }
}

@keyframes pulse-ring {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.5;
  }
}

.greeting-message {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.4rem, 3.5vw, 2.2rem);
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5));
  z-index: 20;
  max-width: 90vw;
  overflow: visible;
  line-height: 1.2;
}

.greeting-char {
  display: inline-block;
  color: #ffd764;
  font-weight: 700;
  -webkit-text-stroke: 1px #ffffff;
  paint-order: stroke fill;
  text-shadow:
    0 0 10px rgba(255, 255, 255, 0.8),
    0 0 20px rgba(255, 215, 100, 0.6),
    0 4px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.02em;
  animation: charFadeIn 0.5s ease-out forwards, charFadeOut 2s ease-in forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes charFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes charFadeOut {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px) scale(0.9);
  }
}

/* Mobile responsive - ensure single line fits and readable */
@media (max-width: 768px) {
  .greeting-message {
    font-size: clamp(1.1rem, 3vw, 1.8rem);
    max-width: 95vw;
  }
}

@media (max-width: 480px) {
  .greeting-message {
    font-size: clamp(1rem, 2.5vw, 1.4rem);
    max-width: 98vw;
  }
}

@media (max-width: 360px) {
  .greeting-message {
    font-size: clamp(0.85rem, 2.2vw, 1.2rem);
  }
}
</style>
