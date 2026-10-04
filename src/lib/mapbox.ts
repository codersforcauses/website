import * as z from "zod"

import { env } from "~/env"

export const MAPBOX_SEARCH_URL = "https://api.mapbox.com/search/searchbox/v1"

const contextItems = z.object({
  id: z.string(),
  name: z.string(),
})

// find suggestions on type
export const suggestions = z
  .looseObject({
    name: z.string(),
    mapbox_id: z.string(),
    feature_type: z.string(),
    address: z.string(),
    full_address: z.string(),
    place_formatted: z.string(),
    context: z
      .looseObject({
        country: contextItems.extend({ country_code: z.string(), country_code_alpha_3: z.string() }).partial(),
        region: contextItems.extend({ region_code: z.string(), region_code_full: z.string() }),
        postcode: contextItems,
        district: contextItems,
        place: contextItems,
        locality: contextItems,
        neighborhood: contextItems,
        address: contextItems.extend({ address_number: z.string(), street_name: z.string() }).partial(),
        street: contextItems.partial(),
      })
      .partial(),
  })
  .partial({
    address: true,
    full_address: true,
  })

export const suggestionsAutocomplete = z.looseObject({
  attribution: z.string(),
  suggestions: z.array(suggestions),
})

// retrieve suggestion on click
export const features = z
  .looseObject({
    name: z.string(),
    mapbox_id: z.string(),
    feature_type: z.string(),
    address: z.string(),
    place_formatted: z.string(),
    full_address: z.string(),
    distance: z.number(),
    coordinates: z.looseObject({
      latitude: z.number(),
      longitude: z.number(),
    }),
    context: z
      .looseObject({
        country: contextItems.extend({ country_code: z.string(), country_code_alpha_3: z.string() }).partial(),
        region: contextItems.extend({ region_code: z.string(), region_code_full: z.string() }),
        postcode: contextItems,
        district: contextItems,
        place: contextItems,
        locality: contextItems,
        neighborhood: contextItems,
        address: contextItems.extend({ address_number: z.string(), street_name: z.string() }).partial(),
        street: contextItems.partial(),
      })
      .partial(),
  })
  .partial({
    address: true,
    full_address: true,
    distance: true,
  })

const featureItems = z.looseObject({
  geometry: z.looseObject({
    type: z.templateLiteral(["Point"]),
    coordinates: z.tuple([z.number(), z.number()]), // lng, lat
  }),
  properties: features,
})

export const retrieveSuggestion = z.looseObject({
  attribution: z.string(),
  features: z.array(featureItems),
})

/**
 * Functions for mapbox searchbox api
 */

interface RetrieveSuggestionFromIDProps {
  userID: string
  mapboxID: string
}

export async function retrieveSuggestionFromID({ userID, mapboxID }: RetrieveSuggestionFromIDProps) {
  const query = new URLSearchParams({
    access_token: env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    session_token: userID,
  })
  const req = await fetch(`${MAPBOX_SEARCH_URL}/retrieve/${mapboxID}?${query.toString()}`)

  const result = retrieveSuggestion.safeParse(await req.json())

  if (result.success) return result.data.features[0]
  else console.log(result.error.issues)
}
