<template>
  <div
    class="choose-lang"
    :class="{ 'choose-lang_active': active }"
    @click.stop="toggle"
  >
    <div class="choose-lang__arrow" />
    <div
      class="choose-lang__flag"
      :style="{ backgroundImage: `url(${lang.flag})` }"
    />
    <transition name="dropdown">
      <div
        v-if="active"
        class="choose-lang__dropdown"
        @click.stop
      >
        <div
          v-for="l of lang.langs"
          :key="l"
          class="choose-lang__lang"
          @click="lang.set(l); close()"
        >
          <span class="choose-lang__lang-name">
            {{ lang.local[l] }}
          </span>
          <div
            class="choose-lang__flag"
            :style="{ backgroundImage: `url(${lang.flags[l]})` }"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script
  setup
  lang="ts"
>
import useLang from '@/store/useLang'
import { ref } from 'vue'

const active = ref(false)
const lang = useLang()

const toggle = () => {
  active.value = !active.value
  if (active.value) {
    document.addEventListener('click', close, { once: true })
  } else {
    document.removeEventListener('click', close)
  }
}

const close = () => {
  active.value = false
  document.removeEventListener('click', close)
}
</script>

<style
  lang="scss"
  scoped
>
.choose-lang {
  width: 140px;
  height: 48px;
  border-radius: 24px;
  border: 1px solid #C4C4C4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 23px;
  position: relative;
  transition: all 0.3s ease-in-out;

  &__arrow {
    width: 24px;
    height: 24px;
    background-image: url('~@/arrow.svg');
    filter: brightness(0.5);
    transform: rotate(-90deg);
  }

  &__flag {
    height: 36px;
    width: 48px;
    box-shadow: 0 0 4px #00000050;
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    right: -1px;
    border-radius: 24px 0 24px 24px;
    border: 1px solid #C4C4C4;
    background-color: white;
    padding: 5px 0;
    display: flex;
    flex-flow: column;
    overflow: hidden;
    box-shadow: 0 0 4px #00000050;
  }

  &__lang {
    display: flex;
    align-items: center;
    width: fit-content;
    min-width: 100%;
    justify-content: space-between;
    padding: 5px 23px;
    gap: 10px;
    transition: all 0.3s ease-in-out;
    user-select: none;

    &:hover {
      background-color: #65E080;
    }
  }

  &__lang-name {

  }

  &.choose-lang_active {
    border-radius: 24px 24px 0 24px;

    .choose-lang__arrow {
      transform: rotate(90deg);
    }
    .choose-lang__dropdown {

    }
  }
}
</style>
