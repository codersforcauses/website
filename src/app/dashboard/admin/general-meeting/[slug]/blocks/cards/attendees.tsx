"use client"

import * as React from "react"
import type { Route } from "next"
import Link from "next/link"
import { useSuspenseQuery } from "@tanstack/react-query"
// import * as z from "zod"

import { cn } from "~/lib/utils"
import { useApi } from "~/trpc/react"
import { usePathName } from "~/hooks/use-pathname"
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar"
import { Button, buttonVariants } from "~/ui/button"
import { Item, ItemActions, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "~/ui/item"
import { Tabs, TabsList, TabsTrigger } from "~/ui/tabs"

interface AttendeesCardProps {
  id: string
  className?: string
}

interface AttendeeDetails {
  image: string | null
  studentNumber: string | null
  name: string
  preferredName: string
  email: string
  role: string | null
}

interface AttendeeItemProps {
  data: AttendeeDetails
  children: React.ReactNode
}

const nullUser: AttendeeDetails = {
  image: "",
  preferredName: "Deleted",
  name: "Deleted user",
  studentNumber: "********",
  email: "deleted.user@email.com",
  role: null,
}

function AttendeeItem({ data, children }: AttendeeItemProps) {
  return (
    <Item size="xs" variant="muted" role="listitem">
      <ItemMedia>
        <Avatar size="lg">
          <AvatarImage src="https://github.com/evilrabbit.png" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemTitle className="flex-1">{data.name}</ItemTitle>
      <ItemDescription>{data.studentNumber}</ItemDescription>
      <ItemActions>{children}</ItemActions>
    </Item>
  )
}

export default function AttendeesCard({ id, className }: AttendeesCardProps) {
  const { admin } = useApi()
  const pathname = usePathName()
  const { data: attendees } = useSuspenseQuery(
    admin.generalMeetings.voters.list.queryOptions({
      meetingId: id,
    }),
  )

  return (
    <div className={cn("flex size-full flex-col gap-4 bg-background p-6", className)}>
      <div className="grid grid-cols-[1fr_auto] items-start gap-0.5">
        <div className="text-base leading-snug font-medium">Attendees</div>
        <Link
          href={`${pathname}/join` as Route}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ size: "xs", variant: "secondary" })}
        >
          QR code
        </Link>
      </div>
      <Tabs defaultValue="waiting">
        <TabsList className="w-full">
          <TabsTrigger value="waiting" className="h-auto!">
            Waiting
          </TabsTrigger>
          <TabsTrigger value="approved" className="h-auto!">
            Approved
          </TabsTrigger>
        </TabsList>
        {attendees.length === 0 ? (
          <div className="grid min-h-20 flex-1 place-items-center text-sm text-muted-foreground select-none">
            No attendees yet
          </div>
        ) : (
          <ItemGroup>
            {attendees.map((att) => (
              <AttendeeItem key={att.id} data={att.user || nullUser}>
                <Button>Approve</Button>
              </AttendeeItem>
            ))}
          </ItemGroup>
        )}
      </Tabs>
    </div>
  )
}
