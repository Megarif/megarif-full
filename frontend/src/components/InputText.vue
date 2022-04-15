<template>
  <label class="input-text">
    <input
      :type="type"
      :value="props.modelValue"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
    >
  </label>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue'

interface Props {
  modelValue: string
  type?: 'text' | 'password' | 'email'
  placeholder?: string
  disabled?: boolean
}

const props = defineProps<Props>()
const type = computed<Props['type']>(() => {
  return props.type || 'text'
})
</script>

<style
  lang="scss"
  scoped
>

</style>
