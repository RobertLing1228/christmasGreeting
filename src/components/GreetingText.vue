<template>
  <div class="greeting-container">
    <h1 class="greeting-text">
      <div class="greeting-line">
        <span
          v-for="(char, index) in 'MERRY'"
          :key="'merry-' + index"
          class="letter"
          :style="{ animationDelay: `${index * 0.08}s` }"
        >
          {{ char }}
        </span>
      </div>
      <div class="greeting-line">
        <span
          v-for="(char, index) in 'CHRISTMAS'"
          :key="'christmas-' + index"
          class="letter"
          :style="{ animationDelay: `${(5 + index) * 0.08}s` }"
        >
          {{ char }}
        </span>
      </div>
    </h1>
    <p class="greeting-year">
      <span
        v-for="(char, index) in '2025'"
        :key="index"
        class="year-digit"
        :style="{ animationDelay: `${2 + index * 0.1}s` }"
      >
        {{ char }}
      </span>
    </p>
  </div>
</template>

<script setup>
// Characters split for individual animations
</script>

<style scoped>
/* Styles are in main.css */
</style>
