// This was done so that BigInt could be serialized by Response.json()
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#use_within_json

declare interface BigInt {
  toJSON(): string
}
