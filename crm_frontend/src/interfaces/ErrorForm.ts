import interface ErrorFormDetail {
  loc = ['body', 'username'],
  msg: string
}

import interface ErrorForm {
  detail: ErrorFormDetail[]
}
