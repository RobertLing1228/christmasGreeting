<template>
  <div>
    <div class="present-container">
      <button class="present-btn" @click="openMessage" :title="'Open gift message'">
        <img src="/presentButton.webp" alt="Gift" class="gift-image" />
      </button>
    </div>

    <MessageDialog
      :show="showDialog"
      :messageData="messageData"
      @close="closeMessage"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MessageDialog from './MessageDialog.vue'

const showDialog = ref(false)
const messageData = ref({
  title: '',
  recipient: '',
  message: '',
  date: ''
})

// Load message from markdown file
onMounted(async () => {
  try {
    const response = await fetch('/messages/teresa.md')
    const markdown = await response.text()

    // Parse markdown content
    const lines = markdown.split('\n')

    // Parse frontmatter (metadata between ---)
    const frontmatterStart = lines.findIndex(line => line === '---')
    const frontmatterEnd = lines.findIndex((line, idx) => idx > frontmatterStart && line === '---')

    const metadata = {}
    if (frontmatterStart !== -1 && frontmatterEnd !== -1) {
      const frontmatterLines = lines.slice(frontmatterStart + 1, frontmatterEnd)
      frontmatterLines.forEach(line => {
        const [key, ...valueParts] = line.split(':')
        if (key && valueParts.length) {
          metadata[key.trim()] = valueParts.join(':').trim()
        }
      })
    }

    // Content starts after frontmatter
    const contentLines = lines.slice(frontmatterEnd + 1)

    // Extract title (first line with #)
    const titleLine = contentLines.find(line => line.startsWith('#'))
    const title = titleLine ? titleLine.replace(/^#\s*/, '').trim() : ''

    // Extract recipient from metadata or **To:** line
    const recipientLine = contentLines.find(line => line.includes('**To:**'))
    const recipient = metadata.recipient || (recipientLine ? recipientLine.replace(/\*\*To:\*\*\s*/, '').trim() : 'You')

    // Extract message (content between **To:** and last ---)
    const toIdx = contentLines.findIndex(line => line.includes('**To:**'))
    const lastDividerIdx = contentLines.lastIndexOf('---')
    const message = contentLines.slice(toIdx + 1, lastDividerIdx !== -1 ? lastDividerIdx : contentLines.length)
      .filter(line => line.trim() && !line.startsWith('*'))
      .join(' ')
      .trim()

    // Extract date from metadata or last line
    const dateLine = contentLines[contentLines.length - 1]
    const date = metadata.date || (dateLine ? dateLine.replace(/\*/g, '').trim() : '')

    messageData.value = {
      title,
      recipient,
      message,
      date,
      ...metadata // Include all metadata
    }
  } catch (error) {
    console.error('Failed to load message:', error)
  }
})

const openMessage = () => {
  showDialog.value = true
}

const closeMessage = () => {
  showDialog.value = false
}
</script>

<style scoped>
.present-container {
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  animation: fadeIn 1s ease-out 3s forwards;
  opacity: 0;
}

.present-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  animation: floatGift 3s ease-in-out infinite;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

.present-btn:hover {
  transform: scale(1.15);
  filter: drop-shadow(0 8px 20px rgba(255, 215, 0, 0.4));
}

.present-btn:active {
  transform: scale(0.95);
}

.gift-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}

@keyframes floatGift {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .present-container {
    bottom: 75px;
  }

  .present-btn {
    width: 70px;
    height: 70px;
  }
}
</style>
