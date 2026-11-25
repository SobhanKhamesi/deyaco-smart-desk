import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Reactive "current time" that refreshes on an interval
 * and cleans up its timer when the component unmounts.
 *
 * @param {number} intervalMs refresh interval in milliseconds
 */
export function useNow(intervalMs = 30_000) {
  const now = ref(new Date())
  let timerId = null

  onMounted(() => {
    timerId = setInterval(() => {
      now.value = new Date()
    }, intervalMs)
  })

  onBeforeUnmount(() => clearInterval(timerId))

  return now
}
