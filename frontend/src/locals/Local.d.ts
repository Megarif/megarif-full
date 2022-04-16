type Keys =
  'welcome' |
  'before_learn' |
  'username' |
  'password' |
  'email'

export type Local = {
  // eslint-disable-next-line no-unused-vars
  [key in Keys]: string
}
