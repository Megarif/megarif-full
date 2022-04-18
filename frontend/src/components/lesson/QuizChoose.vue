<template>
  <div
    class="choose"
    :class="status"
  >
    <h3>
      {{ question }}
    </h3>
    <div
      class="options"
      v-if="props.options && props.options.length"
    >
      <div
        v-for="option of props.options"
        :key="option.id"
        class="option"
        :class="{ error: error === option.id, check: check === option.id }"
        :style="{ order: orders[option.id] }"
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
    <div
      v-else-if="props.option"
      class="combine"
    >
      <div class="field">
        <div
          v-for="word of choosen"
          :key="word"
          class="word"
          @click="choosen = choosen.filter(w => w !== word)"
        >
          {{ word }}
        </div>
      </div>
      <!--<div class="field" v-for="opt of props.option" :key="opt">-->
      <!--  opt-->
      <!--</div>-->
      <div class="words">
        <div
          v-for="(word, index) of props.option.second"
          :key="word"
          class="word"
          :style="{ order: orders[index] }"
          @click="!choosen.includes(word) && choosen.push(word)"
        >
          {{ word }}
        </div>
      </div>
      <button @click="submit">
        Проверить!
      </button>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { computed, ref } from 'vue'

interface Props {
  question: string,
  options?: Array<{
    id: number
    option: string
  }>
  option?: { first: Array<string>, second: Array<string> }
  correct?: number | Array<string>
  status: string
}

const orders = []

for (let i = 0; i < 16; i++) {
  orders.push(Math.floor(Math.random() * 100))
}
const choosen = ref<[string]>([])
const error = ref<number | null>(null)
const check = ref<number | null>(null)
const props = defineProps<Props>()
const emits = defineEmits(['select', 'damage'])
const choose = (id: number) => {
  if (id === props.correct) {
    check.value = id
    emits('select')
  } else {
    emits('damage')
    error.value = id
  }
}
const submit = () => {
  let correct: boolean = true

  if (props.option?.first.length !== choosen.value.length) {
    correct = false
  } else {
    for (let i = 0; choosen.value[i]; i++) {
      if (props.option?.first[i] !== choosen.value[i]) {
        correct = false
        break
      }
    }
  }

  console.log(correct, props.option, choosen.value)
  correct = true
  if (correct) {
    emits('select')
  } else {
    emits('damage')
  }
}
const status = computed(() => props.status)
</script>

<style
  lang="scss"
  scoped
>
.combine {
  display: flex;
  flex-flow: column;
  gap: 16px;
}
.choose {
  position:         absolute;
  display:          flex;
  flex-flow:        column;
  align-items:      center;
  width:            100%;
  padding:          0 20px 20px 20px;
  background:       #FFFFFF;
  box-shadow:       0 3px 20px rgba(0, 0, 0, 0.04);
  border-radius:    24px;
  transform-origin: 50% 200%;
  transition:       0.3s ease-in-out;
  transform:        rotate(-15deg);
  opacity:          0;

  &.answer {
    transform: rotate(0deg);
    opacity:   1;
  }

  &.destroy {
    transform: rotate(15deg);
    opacity:   0;
  }

  h3 {
    padding:     48px 0;
    text-align:  center;
    font-size:   24px;
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
      border:     2px solid #6AC259;
      background: rgba(106, 194, 89, 0.101961);
    }

    &.error {
      border:     2px solid #E92E30;
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
      border:           0;
      background-color: #6AC259;
      background-image: url('@/assets/check.svg');
    }

    &.error {
      border:           0;
      background-color: #E92E30;
      background-image: url('@/assets/error.svg');
    }
  }
}

.word {
  padding: 8px 13px;
  background: #FFFFFF;
  border: 1px solid #DCCFCF;
  box-sizing: border-box;
  border-radius: 9px;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  height: fit-content;
  color: #2B2B2B;
}

.field {
  display: flex;
  max-width: 100%;
  justify-content: center;
  flex-flow: row wrap;
  gap: 8px 4px;
  padding: 12px 16px;
  width: 100%;
  border: 1px solid #CBB9B9;
  border-radius: 12px;
  min-height: 128px;
}

.words {
  display: flex;
  max-width: 100%;
  justify-content: center;
  flex-flow: row wrap;
  gap: 8px;

  .word {
    padding: 8px 13px;
    background: #FFFFFF;
    border: 1px solid #DCCFCF;
    box-sizing: border-box;
    border-radius: 9px;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #2B2B2B;
  }
}
</style>
