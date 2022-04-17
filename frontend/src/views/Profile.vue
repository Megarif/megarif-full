<template>
  <div class="background">

  </div>
  <section class="user">
    <div class="user-circle">
      <div class="user-circle-avatar" :style="{ backgroundImage: user.fileName ? `url(${user.fileName})` : `url(${userAvatar})` }" />
    </div>
    <h3>
      {{ user.username || lang.local.unknown }}
    </h3>
    <span>
      {{ user.login || lang.local.unknown }}
    </span>
  </section>
  <section class="stats">
    <div class="item">
      <img src="@/assets/lvl.svg">
      <span>
        {{ user.exp || 0 }} {{ lang.local.exp }}
      </span>
    </div>
    <div class="item">
      <img src="@/assets/coins.svg">
      <span>
        {{ user.coins || 0 }} {{ lang.local.coin }}
      </span>
    </div>
    <div class="item">
      <img src="@/assets/rating.svg">
      <span>
        {{ user.rating || 0 }} {{ lang.local.rating }}
      </span>
    </div>

    <div class="item">
      <img src="@/assets/hearth.svg">
      <span>
        {{ user.hp || 0 }} {{ lang.local.health }}
      </span>
    </div>
  </section>
  <section class="actions">
    <div class="item" @click.stop="toggle">
      <img src="@/assets/lang.svg">
      <span>
        {{ lang.local.edit_lang }}
      </span>
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
    <div class="item">
      <img src="@/assets/feedback.svg">
      <span>
        {{ lang.local.feedback }}
      </span>
    </div>
    <div class="item">
      <img src="@/assets/terms.svg">
      <span>
        {{ lang.local.terms }}
      </span>
    </div>
    <div class="item" @click="user.exit()">
      <img src="@/assets/exit.svg">
      <span>
        {{ lang.local.exit }}
      </span>
    </div>
    <div class="item">
      <img src="@/assets/delete.svg">
      <span>
        {{ lang.local.delete_account }}
      </span>
    </div>
  </section>
</template>

<script
  setup
  lang="ts"
>
import useUser from '@/store/useUser'
import useLang from '@/store/useLang'
import userAvatar from '@/assets/avatar.svg'
import { ref } from 'vue'

const active = ref(false)
const user = useUser()
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
.background {
  position:         absolute;
  top:              0;
  left:             0;
  width:            100%;
  padding:          31% 0;
  background-image: url('@/assets/background.webp');
  background-size:  cover;
  z-index:          -1;
}

.user,
.stats,
.actions {
  display:       flex;
  padding:       24px;
  background:    #FFFFFF;
  box-shadow:    0 3px 20px #0000000A;
  border-radius: 32px;
  flex-flow:     column;
  position: relative;
}

.user {
  margin-top:  64px;
  align-items: center;
  gap:         12px;
}

h3 {
  font-weight: 600;
  font-size:   20px;
  line-height: 27px;
  color:       #2B2B2B;
}

span {
  font-weight: 600;
  font-size:   16px;
  line-height: 22px;
  color:       #2B2B2B;
}

.user-circle {
  display:       flex;
  width:         128px;
  min-height:    128px;
  margin-bottom: -88px;
  transform:     translateY(-88px);
  background:    #FEE4E4;
  border-radius: 50%;
  align-items: center;
  justify-content: center;

  .user-circle-avatar {
    width: 102px;
    height: 102px;
    background-size: cover;
    border-radius: 50%;
  }
}

.item {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 36px;
  border-radius: 16px;
  margin: 0 -12px;
  padding: 12px;
  background: #65E08000;
  transition: 0.3s ease-in-out;
  user-select: none;
  position: relative;

  &:hover {
    background: #65E08040;
  }

  &:active {
    background: #65E080;
  }
}

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
    position: absolute;
    right: 0;
    height: 36px;
    width: 48px;
    box-shadow: 0 0 4px #00000050;
    justify-self: flex-end;
    transform: scale(0.5);
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
    z-index: 2;
  }

  &__lang {
    display: flex;
    align-items: center;
    width: fit-content;
    min-width: 100%;
    justify-content: space-between;
    padding: 5px 48px 5px 23px;
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
