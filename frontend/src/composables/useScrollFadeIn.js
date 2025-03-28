import { ref, onMounted, onUnmounted } from 'vue'

const useScrollFadeIn = () => {
  const isVisible = ref(false)
  const element = ref(null)

  const handleIntersection = (entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true
      observer.disconnect()
    }
  }

  let observer

  onMounted(() => {
    observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    })

    if (element.value) {
      observer.observe(element.value)
    }
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  return { element, isVisible }
}

export default useScrollFadeIn
