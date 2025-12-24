<template>
  <div class="spline-background">
    <iframe
      :src="sceneUrl"
      frameborder="0"
      width="100%"
      height="100%"
      allow="autoplay; fullscreen"
      loading="lazy"
    ></iframe>
  </div>
</template>

<script setup>
const props = defineProps({
  sceneUrl: {
    type: String,
    required: true
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

.spline-background iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
</style>
