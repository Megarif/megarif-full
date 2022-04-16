import { defineStore } from 'pinia'

interface LangState {
  lang: Lang
  local: any
  locals: {
    // eslint-disable-next-line no-unused-vars
    [key in Lang]: any
  }
}

type Lang = 'en_us' | 'ru_ru' | 'ta_ta'

export default defineStore('lang', {
  state: (): LangState => ({
    lang: 'ru_ru',
    local: null,
    locals: {
      'en_us': () => import('@/locals/en_us.json'),
      'ru_ru': () => import('@/locals/ru_ru.json'),
      'ta_ta': () => import('@/locals/ta_ta.json')
    }
  }),
  actions: {
    init () {
      this.locals[this.lang]()
        .then((local: any) => {
          this.local = local.default
        })
    }
  }
})
