"use client"

import * as React from "react"
import { useMutation } from "@tanstack/react-query"
import { useAsyncDebouncedCallback } from "@tanstack/react-pacer/async-debouncer"
import type { AnyFieldApi } from "@tanstack/react-form"

import { useApi } from "~/trpc/react"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxStatus,
} from "~/ui/combobox"
import { Item, ItemContent, ItemDescription, ItemTitle } from "~/ui/item"
import { Loader } from "~/ui/loader"
import { Badge } from "~/ui/badge"

interface User {
  id: string
  name: string
  preferredName: string
  studentNumber: string | null
  role: string | null
}

interface UserAutocompleteProps {
  field: AnyFieldApi
  disabled?: boolean
  restrictToUWA?: boolean
  filterID?: string
  filter?: "candidate" | "project"
}

export default function UserCombobox({
  field,
  restrictToUWA = true,
  filter = "candidate",
  filterID,
  ...props
}: UserAutocompleteProps) {
  const { admin } = useApi()
  const { mutateAsync } = useMutation(admin.users.findUser.mutationOptions())
  const [userSearchResults, setUserSearchResults] = React.useState<User[]>([])
  const [isLoading, startTransition] = React.useTransition()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const val = field.state.value.input.trim()

  const debouncedUserSearch = useAsyncDebouncedCallback(
    async (term: string) => {
      try {
        const users = await mutateAsync({
          query: term,
          restrictToUWA,
          filter,
          filterId: filterID,
        })
        setUserSearchResults(users)
      } catch (err) {
        setUserSearchResults([])
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
      return "Start typing a user's name or student number"
    }
    return null
  }

  function getEmptyMessage() {
    if (val === "" || isLoading || userSearchResults.length > 0) {
      return null
    }
    return `No matches for "${val}"`
  }

  return (
    <Combobox
      id={field.name}
      name={field.name}
      items={userSearchResults}
      itemToStringLabel={(user: User) => user.name}
      filter={null}
      defaultInputValue={val}
      onOpenChangeComplete={(open) => {
        if (!open && field.state.value.id) {
          setUserSearchResults([field.state.value])
        }
      }}
      onValueChange={(val) => {
        if (val) field.handleChange({ ...val, input: val?.name })
        else
          field.handleChange({
            id: "",
            name: "",
            preferredName: "",
            studentNumber: "",
            role: "",
          })
      }}
      onInputValueChange={(val, { reason }) => {
        if (reason === "item-press") {
          return
        }

        field.handleChange({
          ...field.state.value,
          input: val,
        })

        startTransition(async () => {
          const trimmed = val.trim()
          if (trimmed === "") {
            setUserSearchResults([])
            return
          }

          await debouncedUserSearch(trimmed)
        })
      }}
      {...props}
    >
      <ComboboxInput placeholder="Search for candidate" aria-invalid={isInvalid} disabled={props.disabled} />
      <ComboboxContent className="w-full">
        <ComboboxStatus>{getStatus()}</ComboboxStatus>
        <ComboboxEmpty>{getEmptyMessage()}</ComboboxEmpty>
        <ComboboxList>
          {(user: User) => {
            const roles = user.role?.split(",")
            return (
              <ComboboxItem key={user.id} value={user}>
                <Item size="xs" className="p-0">
                  <ItemContent>
                    <ItemTitle className="whitespace-nowrap">
                      {user.name} ({user.preferredName})
                    </ItemTitle>
                    <ItemDescription>
                      {user.studentNumber}
                      <span className="ml-2 inline-flex gap-1">
                        {!roles ? (
                          <Badge variant="destructive">non-member</Badge>
                        ) : (
                          roles?.map((role) => (
                            <Badge key={role} variant="secondary">
                              {role}
                            </Badge>
                          ))
                        )}
                      </span>
                    </ItemDescription>
                  </ItemContent>
                </Item>
              </ComboboxItem>
            )
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
