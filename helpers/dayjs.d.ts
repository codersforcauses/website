import dayjs from 'dayjs'

declare module 'dayjs' {
  export function months(): Array<string>
}
