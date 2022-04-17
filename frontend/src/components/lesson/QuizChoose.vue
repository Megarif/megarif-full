<template>
  <div class="choose">
    <h3>
      {{ question }}
    </h3>
    <div class="options">
      <div
        v-for="option of props.options"
        :key="option.id"
        class="option"
        :class="{ error: error === option.id, check: check === option.id }"
        @click="choose(option.id)"
      >
        <span>
          {{ option.option }}
        </span>
        <span
          class="select"
          :class="{ error: error === option.id, check: check === option.id }"
        />
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref } from 'vue'

interface Props {
  question: string,
  options: Array<{
    id: number
    option: string
  }>
  correct: number
}

const error = ref<number | null>(null)
const check = ref<number | null>(null)
const props = defineProps<Props>()
const emits = defineEmits(['select', 'damage'])
const choose = (id: number) => {
  if (id === props.correct) {
    check.value = id
  } else {
    emits('damage')
    error.value = id
  }
}
</script>

<style
  lang="scss"
  scoped
>
.choose {
  display:       flex;
  flex-flow:     column;
  align-items:   center;
  width:         100%;
  padding:       0 20px 20px 20px;
  background:    #FFFFFF;
  box-shadow:    0 3px 20px rgba(0, 0, 0, 0.04);
  border-radius: 24px;
  transform-origin: 50% 200%;
  transition: 0.3s ease-in-out;

  &.destroy {
    transform: rotate(15deg);
    opacity: 0;
  }

  h3 {
    padding:    48px 0;
    text-align: center;
    font-size: 24px;
    line-height: 33px;
    // color: #FFFFFF;
  }

  .options {
    display:   flex;
    flex-flow: column;
    gap:       20px;
    width:     100%;
  }

  .option {
    display:         flex;
    height:          60px;
    border:          1px solid #C1C1C1;
    border-radius:   13px;
    padding:         16px;
    justify-content: space-between;
    width:           100%;

    &:hover {
      background: #E1E1E1FF;
    }

    &.check {
      border:          2px solid #6AC259;
      background: rgba(106, 194, 89, 0.101961);
    }
    &.error {
      border: 2px solid #E92E30;
      background: rgba(233, 46, 48, 0.101961);
    }
  }

  .select {
    display:             flex;
    width:               26px;
    height:              26px;
    border:              1px solid #C1C1C1;
    border-radius:       50%;
    background-repeat:   no-repeat;
    background-position: center;

    &.check {
      border: 0;
      background-color: #6AC259;
      background-image: url('@/assets/check.svg');
    }

    &.error {
      border: 0;
      background-color: #E92E30;
      background-image: url('@/assets/error.svg');
    }
  }
}
</style>
