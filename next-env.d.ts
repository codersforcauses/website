/// <reference types="next" />
/// <reference types="next/types/global" />

declare module NodeJS {
  interface Global {
    mongoose: {
      conn: typeof mongoose | null
      promise: Promise<typeof mongoose> | null
    }
  }
}
