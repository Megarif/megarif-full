import { defineStore } from 'pinia'
import axios, { AxiosResponse } from 'axios'
import env from '@/envi'
import router from '@/router'

interface UserState {
  id: number | null
  login: string | null
  username: string | null
  hp: number | null
  xp: number | null
  fileName: string | null
  rating: number | null
  coins: number | null
  leassonLearned: Array<any> | null
  createdAt: string | null
  updatedAt: string | null
  token: string | null
  interval: number | null
}

interface RequestSignIn {
  login: string
  password: string
}

interface ResponseSign {
  token: string
  authUser: {
    id: number
    login: string
    username: string
    hp: number | null
    xp: number
    fileName: string
    rating: number
    coins: number
    leassonLearned: Array<any> | null
    createdAt: string
    updatedAt: string
  }
}

interface RequestSignUp {
  username: string
  login: string
  password: string
}

export default defineStore('user', {
  state: (): UserState => ({
    id: null,
    login: null,
    username: null,
    hp: null,
    xp: null,
    fileName: null,
    rating: null,
    coins: null,
    leassonLearned: null,
    createdAt: null,
    updatedAt: null,
    token: null,
    interval: null
  }),
  getters: {
    getHearths (): number {
      const newDate = new Date().getTime()
      if (!this.hp || this.hp < newDate) {
        return 10
      } else {
        const dif = this.hp - newDate
        const tenMins = 10 * 60000
        return 10 - Math.max(dif / tenMins, 0)
      }
    },
    getTimeToNext (): string {
      if (this.getHearths === 10) {
        return ''
      }
      const minutes = 10 * ((10 -this.getHearths) - Math.floor((10 -this.getHearths)))
      const seconds = 60 * (minutes - Math.floor(minutes))
      const secondsString = String(Math.floor(seconds))
      return `${Math.floor(minutes)}:${secondsString.length < 2 ? '0' + secondsString : secondsString}`
    },
    getTimeToFull (): string {
      if (this.getHearths === 10) {
        return ''
      }
      const minutes = 10 * (10 -this.getHearths)
      const seconds = 60 * (minutes - Math.floor(minutes))
      const secondsString = String(Math.floor(seconds))
      return `${Math.floor(minutes)}:${secondsString.length < 2 ? '0' + secondsString : secondsString}`
    },
    getLvl (): { lvl: number, xp: number, xpNext: number, percentage: number } {
      const level = {
        xp: 0,
        lvl: 0,
        xpNext: 0,
        percentage: 0,
        expPerLvl: 100
      }

      level.xp = this.xp || 0

      let expPerLvl = 100
      let i = level.xp
      for (; i > 0; i -= expPerLvl) {
        level.lvl++;
        if (level.lvl !== 0 && level.lvl % 5 === 0) {
          expPerLvl *= 2
        }
      }
      level.xpNext = -i
      level.percentage = 1 - -i / expPerLvl
      level.expPerLvl = expPerLvl

      return level
    }
  },
  actions: {
    init () {
      this.readToLocalStorage()
      if (this.interval === null) {
        this.interval === setInterval(() => {
          if (this.hp) {
            this.hp += this.hp % 2 ? -1 :1
          }
        }, 1000)
      }
    },
    signin (body: RequestSignIn): Promise<AxiosResponse<ResponseSign>> {
      const promise = axios.post<ResponseSign>( env.apiUrl + 'user/login', body)
      promise.then(this.copyFromResponse)
      return promise
    },
    signup (body: RequestSignUp): Promise<AxiosResponse<ResponseSign>> {
      const promise = axios.post<ResponseSign>( env.apiUrl + 'user/registration', body)
      promise.then(() => {
        console.log('123')
      })
      return promise
    },
    copyFromResponse (response: { data: ResponseSign }) {
      this.id = response.data.authUser.id
      this.login = response.data.authUser.login
      this.username = response.data.authUser.username
      this.hp = new Date(response.data.authUser.hp || 0).getTime()
      this.xp = response.data.authUser.xp
      this.fileName = env.backendUrl + response.data.authUser.fileName
      this.rating = response.data.authUser.rating
      this.coins = response.data.authUser.coins
      this.leassonLearned = response.data.authUser.leassonLearned
      this.createdAt = response.data.authUser.createdAt
      this.updatedAt = response.data.authUser.updatedAt
      this.updatedAt = response.data.authUser.updatedAt
      this.token = response.data.token
      this.saveToLocalStorage()
      return response
    },
    saveToLocalStorage () {
      localStorage.setItem('user', JSON.stringify({
        id: this.id,
        login: this.login,
        username: this.username,
        hp: this.hp,
        xp: this.xp,
        fileName: this.fileName,
        rating: this.rating,
        coins: this.coins,
        leassonLearned: this.leassonLearned,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        token: this.token
      }))
    },
    readToLocalStorage () {
      const userString = localStorage.getItem('user')

      if (userString) {
        const user = JSON.parse(userString)
        this.id = user.id
        this.login = user.login
        this.username = user.username
        this.hp = user.hp
        this.xp = user.xp
        this.fileName = user.fileName
        this.rating = user.rating
        this.coins = user.coins
        this.leassonLearned = user.leassonLearned
        this.createdAt = user.createdAt
        this.updatedAt = user.updatedAt
        this.token = user.token
      }
    },
    exit () {
      localStorage.removeItem('user')
      this.$reset()
      router.push('/sign-in')
    },
    damage () {
      if (this.getHearths === 10 || !this.hp) {
        this.hp = new Date().getTime() + 10 * 60000
      } else {
        this.hp += 10 * 60000
      }
      if (this.id !== null) {
        this.updateHp({ id: this.id, hp: this.hp })
        this.saveToLocalStorage()
      }
    },
    updateHp (body: { id: number, hp: number }): Promise<AxiosResponse<ResponseSign>> {
      return axios.post<ResponseSign>( env.apiUrl + 'user/hp', body)
    }
  }
})
