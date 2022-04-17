<template>
  <div class="mascot-wrapper">
    <div
      v-if="mascot.visible"
      class="mascot"
      :class="{
        sea: mascot.animation.includes('sea'),
        wave: mascot.animation.includes('wave')
      }"
      @click="mascot.dialog1()"
    >
      <img
        class="face"
        :src="mascot.face || ivanGrozniyPetrovi4"
      >
      <img
        class="head"
        src="@/assets/mascot/head.svg"
        alt="head"
      >
      <img
        class="body"
        src="@/assets/mascot/body.svg"
        alt="body"
      >
      <div class="mirror">
        <img
          class="larm"
          src="@/assets/mascot/arm.svg"
          alt="arm"
        >
      </div>
      <div class="mirror">
        <img
          class="lleg"
          src="@/assets/mascot/leg.svg"
          alt="leg"
        >
      </div>
      <img
        class="rarm"
        src="@/assets/mascot/arm.svg"
        alt="arm"
      >
      <img
        class="rleg"
        src="@/assets/mascot/leg.svg"
        alt="leg"
      >
      <transition name="fade">
        <div
          class="question"
          v-if="mascot.question"
          @click.stop
        >
          <img
            class="cloud"
            src="@/assets/mascot/cloud.svg"
            alt="cloud"
          >
          <img
            class="cloudSmall"
            src="@/assets/mascot/cloudSmall.svg"
            alt="cloud"
          >
          <span class="question-text">
            {{ mascot.question }}
          </span>
          <div class="answers">
            <transition-group name="fade">
              <button
                v-for="ans of mascot.answers"
                :key="ans.text"
                @click="mascot.useAnswer(ans.text)"
              >
                {{ ans.text }}
              </button>
            </transition-group>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import stress from '@/assets/mascot/faces/stress.svg'
import nasuena from '@/assets/mascot/faces/nasuena.svg'
import love from '@/assets/mascot/faces/love.svg'
import ivanGrozniyPetrovi4 from '@/assets/mascot/faces/ivanGrozniyPetrovi4.svg'
import happy from '@/assets/mascot/faces/happy.svg'
import angry from '@/assets/mascot/faces/angry.svg'
import useMascot from '@/store/useMascot'

const mascot = useMascot()
</script>

<style
  lang="scss"
  scoped
>
.answers {
  position:  absolute;
  display:   flex;
  flex-flow: column;
  gap:       8px;
  width:     140px;
  height:    120px;
  top:       calc(400px);
  left:      calc(100% - 360px);
  transform: scale(4);

  button {
    background: white;
    color:      #2B2B2B;
    position:   relative;
    box-shadow: 0 1px 4px #2B2B2B40;
  }
}

.question-text {
  font-size: 20px;
  font-weight: 600;
  color: #2B2B2B;
  transform: scale(5) translate(-50px, -40px);
}

.cloud {
  position:  absolute;
  top:       calc(100% - 400px);
  left:      calc(100% - 500px);
  transform: scale(1.25);
}

.mascot-wrapper {
  max-height: 0;
  position:   fixed;
  top:        calc(100% - 263px);
  left:       calc(100% - 200px);
  transition: 0.3s ease-in-out;
}

.mascot {
  position:         relative;
  transform-origin: 50% 0;
  transform:        scale(0.2);

  * {
    position: absolute;
  }

  .mirror {
    width:     fit-content;
    height:    fit-content;
    transform: scaleX(-1);
  }

  .head {
    z-index:   10;
  }

  .face {
    z-index:   20;
    left:      310px;
    top:       450px;
  }

  .body {
    top:     150px;
    left:    150px;
    z-index: 5;
  }

  .larm {
    top:              795px;
    left:             -390px;
    transform-origin: 80px 5px;
  }

  .lleg {
    left: -470px;
    top:  1150px;
  }

  .rarm {
    top:              795px;
    left:             645px;
    transform-origin: 80px 5px;
  }

  .rleg {
    left: 540px;
    top:  1150px;
  }

  &.sea {
    .head {
      animation: 1s rotateHead infinite;
    }
    .face {
      animation: 1s rotateHead infinite;
    }
    .larm {
      animation:        1s 0.5s rotate infinite;
    }
    .rarm {
      animation:        1s rotate infinite;
    }
  }
  &.wave {
    .larm {
      animation: 0.4s wave infinite;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-20deg);
  }
}

@keyframes wave {
  0% {
    transform: rotate(-90deg);
  }
  50% {
    transform: rotate(-80deg);
  }
  100% {
    transform: rotate(-90deg);
  }
}

@keyframes rotateHead {
  0% {
    transform: rotate(-2.5deg);
  }
  50% {
    transform: rotate(2.5deg);
  }
  100% {
    transform: rotate(-2.5deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
