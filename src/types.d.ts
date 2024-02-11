import { APP_STATUS } from './const.ts'
import type { Session } from '@auth/core/types'

export interface LongURL {
  longUrl: string
  hash: string
  title: string
}

type Keys = keyof typeof APP_STATUS

export type App_Status = typeof APP_STATUS[Keys]

export type API_RESPONSE =
  | { status: 'ok'} & LongURL
  | { status: 'error', message: string}

export type Session = {
  user: {name: string, email: string, image: string}
} | null

// descartamos el null del tipo Session
type SessionNotNull = NonNullable<Session>

type UserProp<k extends keyof SessionNotNull['user'] > = Pick<NonNullable<Session>['user'], k>

type UserEmail = UserProp<'email'>

export type DataToDb = LongURL & UserEmail

