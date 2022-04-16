import { defineStore } from 'pinia'
import { Local } from '@/locals/Local'
import flag_en_uk from '~@/en_uk.svg'
import flag_ru_ru from '~@/ru_ru.svg'
import flag_ta_ta from '~@/ta_ta.svg'

type Lang = 'en_uk' | 'ru_ru' | 'ta_ta'

interface LangState {
  lang: Lang
  // eslint-disable-next-line no-unused-vars
  langs: Array<Lang>,
  local: Local | null
  locals: {
    // eslint-disable-next-line no-unused-vars
    [key in Lang]: any
  },
  flag: string | null,
  flags: any
}

export default defineStore('lang', {
  state: (): LangState => ({
    lang: 'ru_ru',
    langs: ['en_uk', 'ru_ru', 'ta_ta'],
    local: null,
    locals: {
      'en_uk': () => import('@/locals/en_uk.json'),
      'ru_ru': () => import('@/locals/ru_ru.json'),
      'ta_ta': () => import('@/locals/ta_ta.json')
    },
    flag: null,
    flags: {
      'en_uk': flag_en_uk,
      'ru_ru': flag_ru_ru,
      'ta_ta': flag_ta_ta
    }
  }),
  actions: {
    init () {
      this.flag = this.flags[this.lang]
      this.locals[this.lang]()
        .then((module: { default: Local }) => {
          this.local = module.default
        })
    },
    set (lang: Lang) {
      this.lang = lang
      this.init()
    }
  }
})
