import { ref, onMounted } from 'vue'

const useFadeIn = () => {
  const isVisible = ref(false)

  onMounted(() => {
    setTimeout(() => {
      isVisible.value = true
    }, 200)
  })

  return { isVisible }
}

export default useFadeIn
