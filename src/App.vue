<template>
  <div id="app">
    <!-- Starry Background Layer -->
    <div class="stars-background">
      <div class="stars stars-small"></div>
      <div class="stars stars-medium"></div>
      <div class="stars stars-large"></div>
      <!-- Warm glowing stars -->
      <div class="warm-stars warm-stars-glow"></div>
    </div>

    <!-- Gradient Background with Floor and Sky Effect -->
    <div class="gradient-background"></div>

    <!-- Spline 3D Background (z-index: -1) -->
    <SplineBackground :sceneUrl="splineSceneUrl" @loaded="onSplineLoaded" />

    <!-- Greeting Text Overlay (z-index: 1) - Only show after Spline loads -->
    <GreetingText v-if="splineLoaded" />

    <!-- Present Button (z-index: 50) - Above music player -->
    <PresentButton v-if="splineLoaded" />

    <!-- Music Player at Bottom (z-index: 100) -->
    <MusicPlayer v-if="splineLoaded" />

    <!-- Interactive Snow Effect (z-index: 100) -->
    <InteractiveSnow v-if="splineLoaded" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SplineBackground from './components/SplineBackground.vue'
import GreetingText from './components/GreetingText.vue'
import PresentButton from './components/PresentButton.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import InteractiveSnow from './components/InteractiveSnow.vue'

// Spline export URL - using runtime method for better performance
const splineSceneUrl = ref('https://prod.spline.design/hSZg0l0pNOCSkCOJ/scene.splinecode')
const splineLoaded = ref(false)

const onSplineLoaded = () => {
  splineLoaded.value = true
}
</script>

<style>
@import './assets/styles/main.css';

/* Starry Background - Behind gradient but visible */
.stars-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -3;
  overflow: hidden;
  pointer-events: none;
  background: #050811;
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Small twinkling stars - distributed pattern */
.stars-small {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow:
    78px 45px #fff,
    234px 123px #fff,
    567px 89px #fff,
    123px 234px #fff,
    456px 345px #fff,
    789px 234px #fff,
    321px 456px #fff,
    654px 567px #fff,
    987px 678px #fff,
    234px 789px #fff,
    145px 67px #fff,
    378px 178px #fff,
    612px 289px #fff,
    856px 134px #fff,
    189px 345px #fff,
    423px 456px #fff,
    667px 267px #fff,
    901px 378px #fff,
    345px 489px #fff,
    578px 590px #fff,
    812px 201px #fff,
    156px 512px #fff,
    389px 623px #fff,
    623px 134px #fff,
    867px 445px #fff;
  animation: twinkleSmall 3s linear infinite;
}

/* Medium stars with glow */
.stars-medium {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow:
    120px 80px 2px 0px rgba(255, 255, 255, 0.9),
    340px 150px 2px 0px rgba(255, 255, 255, 0.8),
    580px 220px 2px 0px rgba(255, 255, 255, 0.9),
    200px 320px 2px 0px rgba(255, 255, 255, 0.85),
    480px 280px 2px 0px rgba(255, 255, 255, 0.9),
    720px 180px 2px 0px rgba(255, 255, 255, 0.8),
    280px 400px 2px 0px rgba(255, 255, 255, 0.9),
    520px 480px 2px 0px rgba(255, 255, 255, 0.85),
    760px 380px 2px 0px rgba(255, 255, 255, 0.9),
    160px 520px 2px 0px rgba(255, 255, 255, 0.8),
    400px 560px 2px 0px rgba(255, 255, 255, 0.9),
    640px 520px 2px 0px rgba(255, 255, 255, 0.85),
    880px 480px 2px 0px rgba(255, 255, 255, 0.8);
  animation: twinkleMedium 4s linear infinite 1s;
}

/* Large glowing stars */
.stars-large {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow:
    300px 100px 3px 1px rgba(255, 255, 255, 1),
    600px 200px 2px 1px rgba(255, 255, 255, 0.95),
    900px 150px 3px 1px rgba(255, 255, 255, 1),
    180px 280px 2px 1px rgba(255, 255, 255, 0.9),
    500px 380px 3px 1px rgba(255, 255, 255, 1),
    820px 320px 2px 1px rgba(255, 255, 255, 0.95),
    220px 480px 3px 1px rgba(255, 255, 255, 0.9),
    540px 540px 2px 1px rgba(255, 255, 255, 1);
  animation: twinkleLarge 5s linear infinite 0.5s;
  filter: blur(0.5px);
}

@keyframes twinkleSmall {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes twinkleMedium {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 0.2; }
}

@keyframes twinkleLarge {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.1);
  }
}

/* Warm glowing stars - orange/yellow theme, scattered, twinkling */
.warm-stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 45%;
  z-index: 10;
}

.warm-stars-glow {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 215, 100, 1);
  position: absolute;
  top: 50px;
  left: 100px;
  box-shadow:
    /* Row 1 - Top scattered stars */
    50px 20px 0 8px rgba(255, 215, 100, 1),
    50px 20px 0 16px rgba(255, 215, 100, 0.6),
    50px 20px 0 24px rgba(255, 215, 100, 0.2),

    250px 40px 0 7px rgba(249, 214, 127, 0.95),
    250px 40px 0 14px rgba(249, 214, 127, 0.5),
    250px 40px 0 21px rgba(249, 214, 127, 0.15),

    480px 30px 0 9px rgba(244, 192, 122, 1),
    480px 30px 0 18px rgba(244, 192, 122, 0.6),
    480px 30px 0 27px rgba(244, 192, 122, 0.2),

    720px 50px 0 7px rgba(232, 168, 124, 0.95),
    720px 50px 0 14px rgba(232, 168, 124, 0.5),

    920px 25px 0 8px rgba(255, 215, 100, 1),
    920px 25px 0 16px rgba(255, 215, 100, 0.6),
    920px 25px 0 24px rgba(255, 215, 100, 0.2),

    /* Row 2 - Mid-top scattered */
    120px 90px 0 7px rgba(249, 214, 127, 0.9),
    120px 90px 0 14px rgba(249, 214, 127, 0.5),
    120px 90px 0 21px rgba(249, 214, 127, 0.15),

    340px 110px 0 8px rgba(244, 192, 122, 1),
    340px 110px 0 16px rgba(244, 192, 122, 0.6),

    580px 95px 0 9px rgba(255, 215, 100, 1),
    580px 95px 0 18px rgba(255, 215, 100, 0.6),
    580px 95px 0 27px rgba(255, 215, 100, 0.2),

    800px 105px 0 7px rgba(232, 168, 124, 0.95),
    800px 105px 0 14px rgba(232, 168, 124, 0.5),

    1000px 85px 0 8px rgba(249, 214, 127, 1),
    1000px 85px 0 16px rgba(249, 214, 127, 0.6),

    /* Row 3 - Middle scattered */
    80px 160px 0 8px rgba(244, 192, 122, 1),
    80px 160px 0 16px rgba(244, 192, 122, 0.6),
    80px 160px 0 24px rgba(244, 192, 122, 0.2),

    290px 175px 0 9px rgba(255, 215, 100, 1),
    290px 175px 0 18px rgba(255, 215, 100, 0.6),
    290px 175px 0 27px rgba(255, 215, 100, 0.2),

    510px 165px 0 7px rgba(249, 214, 127, 0.95),
    510px 165px 0 14px rgba(249, 214, 127, 0.5),

    740px 180px 0 8px rgba(232, 168, 124, 1),
    740px 180px 0 16px rgba(232, 168, 124, 0.6),

    950px 155px 0 9px rgba(255, 215, 100, 1),
    950px 155px 0 18px rgba(255, 215, 100, 0.6),
    950px 155px 0 27px rgba(255, 215, 100, 0.2),

    /* Row 4 - Lower scattered */
    160px 240px 0 7px rgba(249, 214, 127, 0.95),
    160px 240px 0 14px rgba(249, 214, 127, 0.5),

    400px 250px 0 8px rgba(244, 192, 122, 1),
    400px 250px 0 16px rgba(244, 192, 122, 0.6),

    630px 235px 0 9px rgba(255, 215, 100, 1),
    630px 235px 0 18px rgba(255, 215, 100, 0.6),
    630px 235px 0 27px rgba(255, 215, 100, 0.2),

    870px 245px 0 7px rgba(232, 168, 124, 0.95),
    870px 245px 0 14px rgba(232, 168, 124, 0.5);
  filter: blur(2px);
  animation: warmStarTwinkle 3s ease-in-out infinite;
}

@keyframes warmStarTwinkle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(2px) brightness(1);
  }
  33% {
    opacity: 0.5;
    transform: scale(0.9);
    filter: blur(2.5px) brightness(1.3);
  }
  66% {
    opacity: 0.8;
    transform: scale(1.05);
    filter: blur(1.5px) brightness(0.9);
  }
}

.gradient-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background: linear-gradient(
    180deg,
    /* Sky - Dark to lighter (semi-transparent to show stars) */
    rgba(10, 13, 26, 0.85) 0%,
    rgba(18, 22, 43, 0.9) 15%,
    rgba(26, 33, 56, 0.92) 30%,
    /* Horizon - Warm glow */
    rgba(45, 53, 72, 0.95) 45%,
    rgba(58, 66, 85, 0.98) 55%,
    /* Floor - Lighter to white at bottom (opaque) */
    #c8dce8 70%,
    #d4e4ed 80%,
    #e0ecf2 90%,
    #f0f6f9 100%
  );
}

.gradient-background::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: radial-gradient(
    ellipse at center bottom,
    rgba(232, 168, 124, 0.15) 0%,
    rgba(244, 192, 122, 0.1) 30%,
    rgba(249, 214, 127, 0.05) 50%,
    transparent 70%
  );
  pointer-events: none;
}

.gradient-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(10, 13, 26, 0.3) 100%
  );
  pointer-events: none;
}
</style>
