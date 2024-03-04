import { ArgumentsType } from 'vitest'
import { ref } from 'vue'

export const usePending = <GTargetFunction extends Function>(fn: GTargetFunction) => {
  const isPending = ref(false)

  const functionWithPending = async (
    ...args: ArgumentsType<GTargetFunction>
  ) => {
    if (isPending.value) {
      return
    }

    isPending.value = true
    await fn.apply(null, args)
    isPending.value = false
  }

  return {
    isPending,
    functionWithPending,
  }
}
