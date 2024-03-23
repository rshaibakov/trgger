import { AuthError } from '@supabase/supabase-js'

export class NotFoundUserError extends AuthError {
  constructor() {
    const message = 'Not found user'
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundUserError)
    }

    this.name = 'NotFoundUserError'
    this.message = message
  }
}
