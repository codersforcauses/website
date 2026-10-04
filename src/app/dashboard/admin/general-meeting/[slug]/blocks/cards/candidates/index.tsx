"use client"

import * as React from "react"
import { useSuspenseQuery } from "@tanstack/react-query"

import { cn } from "~/lib/utils"
import { useApi } from "~/trpc/react"
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar"
import { Button, buttonVariants } from "~/ui/button"
import { Dialog, DialogTrigger } from "~/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "~/ui/dropdown-menu"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "~/ui/input-group"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "~/ui/item"
import AddCandidateDialog from "./dialogs/add-candidate"
import ViewCandidateDialog from "./dialogs/view-candidate"

interface CandidatesCardProps {
  id: string
  className?: string
}

export default function CandidatesCard({ id, className }: CandidatesCardProps) {
  const { admin } = useApi()
  const [openDialog, setOpenDialog] = React.useState(false)
  const [filter, setFilter] = React.useState("")
  const [query, setQuery] = React.useState("")
  const { data: positions } = useSuspenseQuery(admin.generalMeetings.positions.listForMeeting.queryOptions(id))
  const { data: questions } = useSuspenseQuery(admin.generalMeetings.questions.listForMeeting.queryOptions(id))
  const { data, refetch, isRefetching } = useSuspenseQuery(
    admin.generalMeetings.candidates.listForMeeting.queryOptions({ meetingId: id }),
  )

  const closeDialog = React.useCallback(() => {
    setOpenDialog(false)
  }, [])

  const handleSearch = React.useCallback(({ target }: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setFilter("")
    setQuery(target.value)
  }, [])

  const handleSync = React.useCallback(() => {
    void refetch()
  }, [refetch])

  const candidates = data.filter((can) => {
    if (!filter && !query) return true
    if (filter) return can.positions.some((c) => c.id === filter)
    if (query)
      return (
        can.user?.name.includes(query) ||
        can.user?.preferredName.includes(query) ||
        can.user?.studentNumber?.includes(query)
      )
  })

  return (
    <div className={cn("@container-normal/candidates flex size-full flex-col gap-4 bg-background p-6", className)}>
      <div className="grid auto-rows-min grid-cols-[1fr_auto] items-start gap-1">
        <div className="text-base leading-snug font-medium">Candidates</div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger
            disabled={positions.length == 0 && questions.length === 0}
            className={buttonVariants({ size: "xs", variant: "secondary" })}
          >
            Add
          </DialogTrigger>
          <AddCandidateDialog id={id} close={closeDialog} />
        </Dialog>
      </div>
      <div className="grid gap-2">
        <div className="flex gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger
              disabled={isRefetching || candidates.length === 0}
              className={cn(buttonVariants({ variant: "outline" }), "data-popup-open:bg-accent")}
            >
              <span className="material-symbols-sharp sm:hidden!">filter_alt</span>
              <span className="hidden sm:inline-block">Filter</span>
              <span className="material-symbols-sharp">keyboard_arrow_down</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Select position</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                  <DropdownMenuRadioItem value="">Show all</DropdownMenuRadioItem>
                  {positions.map((pos) => (
                    <DropdownMenuRadioItem key={pos.id} value={pos.id}>
                      {pos.title}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroup>
            <label htmlFor="candidate-search" className="sr-only">
              Search
            </label>
            <InputGroupInput
              id="candidate-search"
              name="candidate-search"
              disabled={isRefetching || candidates.length === 0}
              inputMode="search"
              autoComplete="off"
              placeholder="Search candidate by name or student number "
              value={query}
              onChange={handleSearch}
            />
            {query && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-xs" variant="ghost">
                  <span className="material-symbols-sharp">close</span>
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
          <Button variant="ghost" disabled={isRefetching || candidates.length === 0} onClick={handleSync}>
            <span className={cn("material-symbols-sharp", isRefetching && "animate-spin")}>autorenew</span>
            <span className="hidden sm:inline-block">Sync</span>
          </Button>
        </div>
        {candidates.length > 0 && (
          <div className="flex gap-2 text-xs text-muted-foreground select-none">
            <span className="flex-1">{filter && `Filtering for ${positions.find((p) => p.id === filter)?.title}`}</span>
            <span className="ml-auto">
              Showing {(filter || query) && `${candidates.length} of`} {data.length} results
            </span>
          </div>
        )}
      </div>
      {candidates.length === 0 ? (
        <div className="grid min-h-20 flex-1 place-items-center text-sm text-muted-foreground select-none">
          {positions.length == 0 && questions.length === 0
            ? "Please add either questions or positions to start accepting nominations"
            : "No nominations submitted"}
        </div>
      ) : (
        <ItemGroup>
          {candidates.map(({ id: canId, user, ...can }) => (
            <Item key={canId} size="xs" variant="muted" role="listitem" className="group/candidate-items relative">
              <ItemMedia>
                <Avatar size="lg">
                  <AvatarImage src={user?.image ?? undefined} />
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  {user?.name ?? "Deleted user"} {user?.preferredName && `(${user.preferredName})`}{" "}
                  <span className="text-muted-foreground">{user?.studentNumber}</span>
                </ItemTitle>
                <ItemDescription className="truncate text-pretty">
                  {can.positions.map((pos) => positions.find((_p) => _p.id === pos.id)?.title).join(", ")}
                </ItemDescription>
              </ItemContent>
              <ItemActions className="z-1 transition-all duration-100 group-hover/candidate-items:visible group-hover/candidate-items:opacity-100 md:invisible md:absolute md:inset-y-0 md:right-0 md:px-2.5 md:opacity-0">
                <Dialog>
                  <DialogTrigger className={buttonVariants({ size: "xs" })}>
                    <span className="material-symbols-sharp">article_person</span>
                    Application
                  </DialogTrigger>
                  <ViewCandidateDialog id={id} user={user} {...can} />
                </Dialog>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      )}
    </div>
  )
}
