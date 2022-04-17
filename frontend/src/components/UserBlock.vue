<template>
  <section class="user-block">
    <div
      class="user-block__avatar-wrapper"
      @click="$router.push('/profile')"
    >
      <div class="user-circle-avatar" :style="{ backgroundImage: user.fileName ? `url(${user.fileName})` : `url(${userAvatar})` }" />
    </div>
    <div class="user-block__info">
      <h3>
        {{ user.username || lang.local.unknown }}
      </h3>
      <div class="user-block__list-item">
        <img src="@/assets/lvl.svg">
        <span>{{ user.getLvl.lvl || 0 }}</span>
        <span style="font-size: 12px">{{ user.getLvl.xp ? `(${String(user.getLvl.percentage * 100).slice(0, 5)}%)` : '' }}</span>
      </div>
      <div class="user-block__list-item">
        <img src="@/assets/coins.svg">
        <span>{{ user.coins || 0 }}</span>
      </div>
      <div class="user-block__list-item">
        <img src="@/assets/rating.svg">
        <span>{{ user.rating || 0 }}</span>
      </div>
      <div class="user-block__list-hp">
        <img :src="user.getHearths < 2 ? (user.getHearths < 1 ? eh : hh) : h" alt="hearth">
        <img :src="user.getHearths < 4 ? (user.getHearths < 3 ? eh : hh) : h" alt="hearth">
        <img :src="user.getHearths < 6 ? (user.getHearths < 5 ? eh : hh) : h" alt="hearth">
        <img :src="user.getHearths < 8 ? (user.getHearths < 7 ? eh : hh) : h" alt="hearth">
        <img :src="user.getHearths < 10 ? (user.getHearths < 9 ? eh : hh) : h" alt="hearth">
        <span>
          {{ user.getTimeToNext }}
        </span>
      </div>
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
import h from '@/assets/hearth.svg'
import hh from '@/assets/halfHearth.svg'
import eh from '@/assets/emptyHearth.svg'

const user = useUser()
const lang = useLang()

console.log(user.username)
</script>

<style
  lang="scss"
  scoped
>
.user-block {
  display: flex;
  align-items: center;
  gap:     24px;
  padding: 24px;
  background: #FFFFFF;
  box-shadow: 0px 3px 20px #0000000A;
  border-radius: 32px;
}

.user-block__avatar-wrapper {
  width:           96px;
  height:          96px;
  display:         flex;
  align-items:     center;
  justify-content: center;
  background: #FEE4E4;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
}

.user-block__info {
  display: flex;
  flex-flow: column;
  gap: 4px;

  h3 {
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;

    color: #2B2B2B;
  }
}
.user-block__list-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #2B2B2B;
}
.user-block__list-hp {
  span {
    margin-top: 3px;
    position: absolute;
    font-size: 12px;
  }
}

.user-circle-avatar {
  width: 80px;
  height: 80px;
  background-size: cover;
  border-radius: 50%;
}

.choose-lang {
  width:           140px;
  height:          48px;
  border-radius:   24px;
  border:          1px solid #C4C4C4;
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  padding:         5px 23px;
  position:        relative;
  transition:      all 0.3s ease-in-out;

  &__arrow {
    width:            24px;
    height:           24px;
    background-image: url('~@/arrow.svg');
    filter:           brightness(0.5);
    transform:        rotate(-90deg);
  }

  &__flag {
    height:     36px;
    width:      48px;
    box-shadow: 0 0 4px #00000050;
  }
}
</style>
