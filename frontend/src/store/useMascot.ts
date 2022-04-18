import { defineStore } from 'pinia'
import stress from '@/assets/mascot/faces/stress.svg'
import nasuena from '@/assets/mascot/faces/nasuena.svg'
import love from '@/assets/mascot/faces/love.svg'
import ivanGrozniyPetrovi4 from '@/assets/mascot/faces/ivanGrozniyPetrovi4.svg'
import happy from '@/assets/mascot/faces/happy.svg'
import angry from '@/assets/mascot/faces/angry.svg'

const dialog2 = [{
  question: 'Сәлам, мин Майя!',
  timeout: 3000,
  animation: 'sea wave'
}, {
  question: 'Нихәл?!',
  timeout: 15000,
  animation: 'sea',
  answers: [{
    text: 'Шәп!',
    emote: happy,
    reaction: 'Шәп!',
    timeout: 1500
  }, {
    text: 'Әйбәт!',
    emote: happy,
    reaction: 'Шәп!',
    timeout: 1500
  }, {
    text: 'Бик яхшы!',
    emote: happy,
    reaction: 'Шәп!',
    timeout: 1500
  }]
}]
const dialog1 = [{
  question: 'Салам!',
  timeout: 3000,
  animation: 'sea wave'
}, {
  question: 'Нишлисең?!',
  timeout: 15000,
  animation: 'sea',
  answers: [{
    text: 'Укыйм',
    emote: happy,
    reaction: 'Шәп!',
    timeout: 1500
  }, {
    text: 'Уйныйм',
    emote: stress,
    reaction: 'Абау',
    timeout: 1500
  }, {
    text: 'Ял итәм',
    emote: nasuena,
    reaction: 'Абау',
    timeout: 1500
  }]
}]

interface StateMascot {
  x: number
  y: number
  face: string
  animation: string
  dialog: null | Array<{
    question: string,
    animation?: string,
    answers?: Array<{
      text: string,
      emote: string,
      reaction: string
      animation: string
      timeout: number
    }>
    timeout: number
  }>
  question: string | null
  answers: Array<{
      text: string,
      emote: string,
      reaction: string
      timeout: number
      animation: string
    }> | null
  step: number,
  nextTimeout: number
  visible: boolean
}

export default defineStore('mascot', {
  state: (): StateMascot => ({
    x: 0,
    y: 0,
    face: ivanGrozniyPetrovi4,
    animation: 'sea',
    dialog: null,
    question: null,
    answers: null,
    step: 0,
    nextTimeout: -1,
    visible: false
  }),
  actions: {
    randomDialog () {
      this.dialog1()
    },
    dialog1 () {
      this.clearDialog()
      this.clearNextTimout()
      this.dialog = (Math.random() > 0.5 ? dialog1 : dialog2) as any
      this.step = -1
      this.visible = true
      this.playNextDialog()
    },
    playNextDialog () {
      this.step++
      if (this.dialog && this.dialog[this.step]) {
        if (this.dialog[this.step]?.answers) {
          this.answers = this.dialog[this.step].answers as any
        }
        if (this.dialog[this.step]?.question) {
          this.question = this.dialog[this.step].question
        }
        if (this.dialog[this.step]?.animation) {
          this.animation = this.dialog[this.step].animation as string
        }
        console.log('created next')
        this.nextTimeout = setTimeout(() => {
          console.log('playNextDialog next')
          this.playNextDialog()
        }, this.dialog[this.step].timeout)
      } else {
        console.log('clearDialog')
        this.clearDialog()
        this.visible = false
      }
    },
    useAnswer (text: string) {
      const answer = this.dialog[this.step].answers
        .find(a => a.text === text)

      if (answer) {
        this.clearNextTimout()
        if (answer.emote) {
          this.face = answer.emote
        }
        if (answer.reaction) {
          this.question = answer.reaction
        }
        if (answer.animation) {
          this.animation = answer.animation
        }
        this.nextTimeout = setTimeout(() => {
          this.playNextDialog()
        }, answer.timeout)
      }
    },
    clearDialog () {
      this.face = ivanGrozniyPetrovi4
      this.animation = 'sea'
      this.question = null
      this.answers = null
    },
    clearNextTimout () {
      if (this.nextTimeout !== -1) {
        clearTimeout(this.nextTimeout)
        this.nextTimeout = -1
      }
    }
  }
})
