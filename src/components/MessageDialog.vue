<template>
  <Transition name="dialog-fade">
    <div v-if="show" class="dialog-overlay" @click="closeDialog">
      <div class="dialog-content" @click.stop>
        <button class="close-btn" @click="closeDialog">✕</button>

        <div class="dialog-header">
          <h2 class="dialog-title">
            <span
              v-for="(char, index) in titleChars"
              :key="'title-' + index"
              class="title-char"
              :style="{ animationDelay: `${index * 0.03}s` }"
            >
              {{ char === ' ' ? '\u00A0' : char }}
            </span>
          </h2>
        </div>

        <div class="dialog-body">
          <p class="recipient">
            To: <span class="recipient-name">{{ messageData.recipient }}</span>
          </p>

          <p class="message-text">
            <template v-for="(line, lineIndex) in messageLines" :key="'line-' + lineIndex">
              <span
                v-for="(char, charIndex) in line.chars"
                :key="'msg-' + lineIndex + '-' + charIndex"
                class="message-char"
                :style="{ animationDelay: `${0.5 + (line.startIndex + charIndex) * 0.01}s` }"
              >
                {{ char === ' ' ? '\u00A0' : char }}
              </span>
              <br v-if="lineIndex < messageLines.length - 1" />
            </template>
          </p>

          <p class="date">{{ formatDate(messageData.date) }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  messageData: {
    type: Object,
    default: () => ({
      title: 'Merry Christmas!',
      recipient: 'You',
      message: 'Have a wonderful holiday season!',
      date: '2025-12-25'
    })
  }
})

const emit = defineEmits(['close'])

// Function to split text while keeping emojis intact
const splitTextWithEmojis = (text) => {
  if (!text) return []

  // Use Intl.Segmenter if available (modern browsers)
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' })
    return Array.from(segmenter.segment(text)).map(segment => segment.segment)
  }

  // Fallback: Use regex to match grapheme clusters
  // This regex matches emoji sequences, surrogate pairs, and regular characters
  const regex = /\p{Extended_Pictographic}(\p{Emoji_Modifier}|\uFE0F\u20E3?|\u{1F3FB}-\u{1F3FF})?|[\uD800-\uDBFF][\uDC00-\uDFFF]|./gu
  return text.match(regex) || []
}

const titleChars = computed(() => splitTextWithEmojis(props.messageData.title))

// Split message by <br> tags and create line objects with character arrays
const messageLines = computed(() => {
  const message = props.messageData.message || ''
  const lines = message.split(/<br\s*\/?>/gi) // Split by <br>, <br/>, or <br />
  let charIndex = 0
  
  return lines.map(line => {
    const chars = splitTextWithEmojis(line.trim())
    const lineObj = {
      chars,
      startIndex: charIndex
    }
    charIndex += chars.length + 1 // +1 for the line break
    return lineObj
  })
})

const closeDialog = () => {
  emit('close')
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.dialog-content {
  background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
  border-radius: 20px;
  max-width: 90%;
  width: 500px;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 215, 0, 0.2);
  position: relative;
  animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  margin: auto;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.2rem;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.2);
  color: #000;
  transform: rotate(90deg);
}

.dialog-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 2px solid rgba(232, 168, 124, 0.2);
}

.dialog-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.2rem, 3.5vw, 1.5rem);
  font-weight: 900;
  color: #e8a87c;
  text-align: left;
  margin: 0;
  line-height: 1.3;
}

.title-char {
  display: inline-block;
  animation: bounceInChar 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  opacity: 0;
}

.dialog-body {
  padding: 2rem;
}

.recipient {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.recipient-name {
  font-weight: 700;
  color: #e8a87c;
  font-size: 1.2rem;
}

.message-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 2rem;
  text-align: justify;
}

.message-char {
  display: inline-block;
  animation: fadeInChar 0.3s ease forwards;
  opacity: 0;
}

.date {
  text-align: right;
  color: #999;
  font-style: italic;
  font-size: 0.9rem;
}

/* Animations */
@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.3) rotate(-10deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
}

@keyframes bounceInChar {
  0% {
    opacity: 0;
    transform: scale(0) translateY(-20px);
  }
  60% {
    opacity: 1;
    transform: scale(1.2) translateY(5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes fadeInChar {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transition */
.dialog-fade-enter-active {
  transition: opacity 0.3s ease;
}

.dialog-fade-leave-active {
  transition: opacity 0.2s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .dialog-title {
    font-size: clamp(1rem, 3vw, 1.3rem);
  }
}

@media (max-width: 480px) {
  .dialog-content {
    max-width: 95%;
    border-radius: 15px;
  }

  .dialog-header {
    padding: 1.5rem 1rem 0.75rem;
  }

  .dialog-title {
    font-size: clamp(0.9rem, 2.8vw, 1.1rem);
  }

  .dialog-body {
    padding: 1.5rem;
  }

  .message-text {
    font-size: 1rem;
    text-align: left;
  }
}
</style>
