import { defineStore } from 'pinia'
import axios from 'axios'
import env from '@/envi'

interface LangState {
  username: string | null
  login: string | null
  exp: number | null
  hp: Date | null
  accessToken: string | null
}

interface RequestSignIn {
  login: string
  password: string
}

interface ResponseSignIn {
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

interface ResponseSignUp {
  username: string
  login: string
  password: string
}

export default defineStore('user', {
  state: (): LangState => ({
    username: null,
    login: null,
    exp: null,
    hp: null,
    accessToken: null
  }),
  actions: {
    init () {},
    signin (body: RequestSignIn): Promise<ResponseSignIn> {
      return axios.post( env.apiUrl + 'user/login', body)
    },
    signup (body: RequestSignUp): Promise<ResponseSignUp> {
      return axios.post( env.apiUrl + 'user/registration', body)
    },
  }
})
