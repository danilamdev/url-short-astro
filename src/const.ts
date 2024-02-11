export const APP_STATUS = {
  idle: 'IDLE',
  ready: 'READY',
  submitted: 'SUBMITTED',
  error: 'ERROR'
} as const

export const URLPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/