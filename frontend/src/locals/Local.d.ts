type Keys =
  'welcome' |
  'before_learn' |
  'username' |
  'password' |
  'email' | 'unknown' |
'lvl' |
'exp' |
'coin' |
'rating' |
'health' |
'edit_name' |
'edit_lang' |
'feedback' |
'terms' |
'exit' |
'delete_account'

export type Local = {
  // eslint-disable-next-line no-unused-vars
  [key in Keys]: string
}
