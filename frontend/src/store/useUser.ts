import { defineStore } from 'pinia'
import axios, { AxiosResponse } from 'axios'
import env from '@/envi'
import router from '@/router'

interface UserState {
  id: number | null
  login: string | null
  username: string | null
  hp: string | null
  xp: number | null
  fileName: string | null
  rating: number | null
  coins: number | null
  leassonLearned: Array<any> | null
  createdAt: string | null
  updatedAt: string | null
  token: string | null
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
    hp: string | null
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
    token: null
  }),
  actions: {
    init () {
      this.readToLocalStorage()
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
      this.hp = response.data.authUser.hp
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
    }
  }
})
