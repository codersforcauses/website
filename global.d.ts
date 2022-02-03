import mongoose from 'mongoose'
import { Dayjs } from 'dayjs'

export interface CachedProps {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: CachedProps
}

declare module 'dayjs' {
  export function months(): Array<string>
  export function utc(date: dayjs.ConfigType): Dayjs
}
