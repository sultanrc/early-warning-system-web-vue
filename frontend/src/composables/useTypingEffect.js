import { ref, onMounted } from 'vue'

export function useTypingEffect(fullText) {
  const displayedText = ref('')
  let index = 0

  const startTyping = () => {
    displayedText.value = ''
    index = 0
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        displayedText.value += fullText[index]
        index++
      } else {
        clearInterval(typingInterval)
      }
    }, 10)
  }

  onMounted(() => {
    startTyping()
  })

  return displayedText
}
