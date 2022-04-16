<template>
  <label class="input-text">
    <input
      class="input-text__input"
      :type="type"
      :value="props.modelValue"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      @input="input"
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
const emit = defineEmits(['update:modelValue'])

const input = (event: InputEvent) => {
  const target = event.target as HTMLInputElement
  if (target.value || target.value === '') {
    emit('update:modelValue', target.value)
  }
}
</script>

<style
  lang="scss"
  scoped
>
.input-text {

  &__input {
    height: 48px;
    width: 100%;
    border-radius: 16px;
    border: 1px solid gray;
    padding-left: 18px;
    transition: 0.25s ease-in-out;

    &:focus {
      box-shadow: 0 3px 20px #0BAC0066;
      outline: none;
      border-color: #00C12B;
    }
  }
}
</style>
