<template>
  <div class="spline-background" ref="canvasContainer">
    <!-- Loading spinner while Spline loads -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Application } from '@splinetool/runtime'

const props = defineProps({
  sceneUrl: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['loaded'])

const canvasContainer = ref(null)
const loading = ref(true)
const splineApp = ref(null)

// Mouse/touch drag state
const isDragging = ref(false)
const dragStartX = ref(0)
const currentRotation = ref(0)

// Rotate scene horizontally
const rotateSceneHorizontally = (deltaX) => {
  if (!splineApp.value) return

  const rotationAmount = deltaX * 0.005 // Sensitivity factor

  // Try to access controls first (if available)
  try {
    if (splineApp.value.controls && splineApp.value.controls.rotateLeft) {
      splineApp.value.controls.rotateLeft(rotationAmount)
      return
    }
  } catch (error) {
    // Controls not accessible, fall through to scene rotation
  }

  // Fallback: Rotate the main scene object directly
  try {
    // Try common scene root names
    const sceneNames = ['Scene', 'Root', 'scene', 'root']
    let sceneObject = null

    for (const name of sceneNames) {
      sceneObject = splineApp.value.findObjectByName(name)
      if (sceneObject) break
    }

    if (sceneObject) {
      sceneObject.rotation.y = currentRotation.value + rotationAmount
    }
  } catch (error) {
    console.warn('Could not rotate scene:', error)
  }
}

// Setup mouse controls for desktop
const setupMouseControls = (canvas) => {
  const handleMouseDown = (e) => {
    isDragging.value = true
    dragStartX.value = e.clientX
    canvas.style.cursor = 'grabbing'
  }

  const handleMouseMove = (e) => {
    if (!isDragging.value) return

    const deltaX = e.clientX - dragStartX.value
    rotateSceneHorizontally(deltaX)
  }

  const handleMouseUp = (e) => {
    if (isDragging.value) {
      const deltaX = e.clientX - dragStartX.value
      currentRotation.value += deltaX * 0.005
    }
    isDragging.value = false
    canvas.style.cursor = 'grab'
  }

  const handleMouseLeave = () => {
    isDragging.value = false
    canvas.style.cursor = 'grab'
  }

  canvas.addEventListener('mousedown', handleMouseDown)
  canvas.addEventListener('mousemove', handleMouseMove)
  canvas.addEventListener('mouseup', handleMouseUp)
  canvas.addEventListener('mouseleave', handleMouseLeave)

  canvas.style.cursor = 'grab'

  // Store listeners for cleanup
  canvas._mouseListeners = {
    mousedown: handleMouseDown,
    mousemove: handleMouseMove,
    mouseup: handleMouseUp,
    mouseleave: handleMouseLeave
  }
}

// Setup touch controls for mobile
const setupTouchControls = (canvas) => {
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDragging.value = true
      dragStartX.value = e.touches[0].clientX
    }
  }

  const handleTouchMove = (e) => {
    if (!isDragging.value || e.touches.length !== 1) return

    e.preventDefault() // Prevent page scrolling
    const deltaX = e.touches[0].clientX - dragStartX.value
    rotateSceneHorizontally(deltaX)
  }

  const handleTouchEnd = (e) => {
    if (isDragging.value && e.changedTouches.length === 1) {
      const deltaX = e.changedTouches[0].clientX - dragStartX.value
      currentRotation.value += deltaX * 0.005
    }
    isDragging.value = false
  }

  canvas.addEventListener('touchstart', handleTouchStart, { passive: true })
  canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
  canvas.addEventListener('touchend', handleTouchEnd, { passive: true })

  // Store listeners for cleanup
  canvas._touchListeners = {
    touchstart: handleTouchStart,
    touchmove: handleTouchMove,
    touchend: handleTouchEnd
  }
}

onMounted(async () => {
  try {
    const canvas = document.createElement('canvas')
    canvasContainer.value.appendChild(canvas)

    const app = new Application(canvas)

    // Load the Spline scene
    await app.load(props.sceneUrl)

    // Store app instance for custom controls
    splineApp.value = app

    // Setup custom mouse and touch controls
    setupMouseControls(canvas)
    setupTouchControls(canvas)

    // Hide loading spinner and emit loaded event
    setTimeout(() => {
      loading.value = false
      emit('loaded')
    }, 500)
  } catch (error) {
    console.error('Error loading Spline scene:', error)
    loading.value = false
    emit('loaded') // Still emit to show content even if error
  }
})

onBeforeUnmount(() => {
  // Clean up event listeners
  const canvas = canvasContainer.value?.querySelector('canvas')

  if (canvas) {
    // Remove mouse listeners
    if (canvas._mouseListeners) {
      Object.entries(canvas._mouseListeners).forEach(([event, handler]) => {
        canvas.removeEventListener(event, handler)
      })
    }

    // Remove touch listeners
    if (canvas._touchListeners) {
      Object.entries(canvas._touchListeners).forEach(([event, handler]) => {
        canvas.removeEventListener(event, handler)
      })
    }
  }

  // Dispose Spline app
  if (splineApp.value && splineApp.value.dispose) {
    splineApp.value.dispose()
  }
})
</script>

<style scoped>
.spline-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
