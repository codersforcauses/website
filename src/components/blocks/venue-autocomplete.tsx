"use client"

import * as React from "react"
import { Autocomplete } from "@base-ui/react/autocomplete"
import { useAsyncDebouncedCallback } from "@tanstack/react-pacer/async-debouncer"
import type { AnyFieldApi } from "@tanstack/react-form"
import * as z from "zod"

import { authClient } from "~/lib/auth-client"
import { MAPBOX_SEARCH_URL, suggestionsAutocomplete } from "~/lib/mapbox"
import { UWA_COORDS } from "~/lib/constants"
import { InputGroup, InputGroupInput } from "~/ui/input-group"
import { Item, ItemContent, ItemDescription, ItemTitle } from "~/ui/item"
import { Loader } from "~/ui/loader"
import { env } from "~/env"

const BOUNDING_BOX = [
  113.49046953696764, // Bottom Left Lng of WA
  -35.59167930852958, // Bottom Left Lat of WA
  128.96620427260234, // Top Right Lng of WA
  -13.51552669765895, // Top Right Lat of WA
].join(",")
const UWA = UWA_COORDS.join(",")

type MapboxSuggestion = z.infer<typeof suggestionsAutocomplete>["suggestions"][number]

interface VenueAutocompleteProps extends Autocomplete.Root.Props<MapboxSuggestion> {
  field: AnyFieldApi
  setVenueID: (val: string) => void
}

export default function VenueAutocomplete({ field, setVenueID, ...props }: VenueAutocompleteProps) {
  const { data } = authClient.useSession()
  const [venueSearchResults, setVenueSearchResults] = React.useState<MapboxSuggestion[]>([])
  const [isLoading, startTransition] = React.useTransition()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const val = field.state.value.trim()

  const debouncedVenueSearch = useAsyncDebouncedCallback(
    async (term: string) => {
      const query = new URLSearchParams({
        q: term,
        access_token: env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
        session_token: data?.session.userId!,
        bbox: BOUNDING_BOX,
        proximity: UWA,
        types: ["poi", "address"].join(","),
        limit: "5",
      })

      try {
        const req = await fetch(`${MAPBOX_SEARCH_URL}/suggest?${query.toString()}`)
        if (!req.ok) throw new Error("Failed to retrieve suggestions from Mapbox API")

        const result = suggestionsAutocomplete.safeParse(await req.json())

        if (result.success) setVenueSearchResults(result.data.suggestions)
        else console.log(result.error.issues)
      } catch (err) {
        setVenueSearchResults([])
        console.error(err)
      }
    },
    {
      wait: 500, // in milliseconds
    },
  )

  function getStatus() {
    if (isLoading) {
      return (
        <>
          <span>Searching…</span>
          <Loader size="sm" />
        </>
      )
    }
    if (val === "") {
      return "Start typing an address or UWA building name"
    }
    return null
  }

  function getEmptyMessage() {
    if (val === "" || isLoading || venueSearchResults.length > 0) {
      return null
    }
    return `No matches for "${val}"`
  }

  return (
    <Autocomplete.Root
      openOnInputClick
      id={field.name}
      name={field.name}
      items={venueSearchResults}
      filter={null}
      defaultValue={val}
      itemToStringValue={(venue: MapboxSuggestion) => venue.name}
      onValueChange={(val) => {
        field.handleChange(val)
        startTransition(async () => {
          const trimmed = val.trim()
          if (trimmed === "") {
            setVenueSearchResults([])
            return
          }
          await debouncedVenueSearch(trimmed)
        })
      }}
      {...props}
    >
      <InputGroup className="w-auto">
        <Autocomplete.Input
          placeholder="UWA Ezone North"
          aria-invalid={isInvalid}
          render={<InputGroupInput disabled={props.disabled} />}
        />
      </InputGroup>
      <Autocomplete.Portal>
        <Autocomplete.Positioner side="bottom" sideOffset={6} align="start" className="isolate z-50">
          <Autocomplete.Popup
            data-slot="autocomplete-content"
            className="group/autocomplete-content relative max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-hidden border border-border bg-background text-foreground duration-100 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8"
            // "ring-1 ring-neutral-950/10 dark:ring-neutral-50/10",
          >
            <Autocomplete.Status className="hidden w-full items-center justify-between gap-1 px-3 py-2 text-left text-xs text-muted-foreground group-data-empty/autocomplete-content:flex empty:p-0">
              {getStatus()}
            </Autocomplete.Status>
            <Autocomplete.Empty className="hidden w-full truncate px-3 py-2 text-xs text-muted-foreground group-data-empty/autocomplete-content:flex empty:p-0">
              {getEmptyMessage()}
            </Autocomplete.Empty>
            <Autocomplete.List
              data-slot="autocomplete-list"
              className="no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0"
            >
              {(venue: MapboxSuggestion) => (
                <Autocomplete.Item
                  key={venue.mapbox_id}
                  value={venue}
                  className="relative flex w-full cursor-default items-center gap-2 px-1.5 py-1 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-muted not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground"
                  onClick={() => {
                    setVenueID(venue.mapbox_id)
                  }}
                >
                  <Item size="xs" className="p-0">
                    <ItemContent>
                      <ItemTitle className="max-w-(--anchor-width) min-w-0 flex-1 truncate">{venue.name}</ItemTitle>
                      <ItemDescription>{venue.full_address ?? venue.place_formatted}</ItemDescription>
                    </ItemContent>
                  </Item>
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  )
}
