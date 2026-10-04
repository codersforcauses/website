import type { Route } from "next"
import { createSerializer, type CreateSerializerOptions, type ParserMap, parseAsString } from "nuqs/server"

export function createTypedLink<Parsers extends ParserMap>(
  route: Route,
  parsers: Parsers,
  options: CreateSerializerOptions<Parsers> = {},
) {
  const serialize = createSerializer<Parsers, Route, Route>(parsers, options)
  return serialize.bind(null, route)
}

const redirectURLQuery = {
  redirect: parseAsString,
}

export const joinRedirectLink = createTypedLink("/join", redirectURLQuery)
