"use client"

import { useSuspenseQuery } from "@tanstack/react-query"

import { cn } from "~/lib/utils"
import { useApi } from "~/trpc/react"
import { buttonVariants } from "~/ui/button"
import { Dialog, DialogTrigger } from "~/ui/dialog"
import { Map } from "~/ui/map"
import { MapMarker, MarkerContent } from "~/ui/map/marker"
import { MapControls, MapZoom } from "~/ui/map/controls"
import EditMeetingDetailsDialog from "./edit-meeting-details"

interface MeetingDetailsProps {
  slug: string
  className?: string
}

export default function MeetingDetails({ slug, className }: MeetingDetailsProps) {
  const { admin } = useApi()
  const { data: meeting } = useSuspenseQuery(
    admin.generalMeetings.get.queryOptions(slug, {
      refetchOnWindowFocus: true,
      refetchInterval: false,
      refetchOnReconnect: true,
    }),
  )

  const data = {
    id: meeting!.id,
    slug: meeting!.slug,
    title: meeting!.title,
    venue: (meeting?.venue ? meeting.venue.properties.name : meeting?.venueFallback) ?? "",
    venueID: meeting?.venue?.properties.mapbox_id ?? "",
    room: meeting?.room ?? "",
    date: meeting!.start,
    startTime: meeting!.start.toLocaleString("en-AU", { hour: "numeric", minute: "2-digit", hourCycle: "h23" }),
    endTime: meeting?.end
      ? meeting.end.toLocaleString("en-AU", { hour: "numeric", minute: "2-digit", hourCycle: "h23" })
      : "",
  }

  return (
    <div className={cn("h-full min-h-80 w-full", className)}>
      {meeting?.venue?.geometry.coordinates && (
        <Map center={meeting?.venue?.geometry.coordinates} minZoom={11} zoom={15} maxZoom={18.5}>
          <MapMarker coordinates={meeting?.venue?.geometry.coordinates}>
            <MarkerContent className="cursor-default">
              <span className="material-symbols-sharp text-3xl! leading-none! text-primary [font-variation-settings:'FILL'_1]!">
                location_on
              </span>
            </MarkerContent>
          </MapMarker>
          <MapControls position="bottom-right">
            <MapZoom />
          </MapControls>

          <div className="absolute z-20 m-2 min-w-64 bg-background p-4 text-sm">
            <div className="mb-2 grid auto-rows-min grid-cols-[1fr_auto] items-start gap-1">
              <div className="text-base leading-snug font-medium">Meeting details</div>
              <div className="flex items-start">
                <Dialog>
                  <DialogTrigger className={buttonVariants({ size: "xs", variant: "secondary" })}>Edit</DialogTrigger>
                  <EditMeetingDetailsDialog meeting={data} />
                </Dialog>
              </div>
            </div>
            <div className="grid gap-1">
              <p className="flex items-center gap-1">
                <span className="material-symbols-sharp text-base! leading-none! text-muted-foreground">
                  calendar_today
                </span>
                {meeting.start.toDateString()}
              </p>
              <p className="flex items-center gap-1">
                <span className="material-symbols-sharp text-base! leading-none! text-muted-foreground">schedule</span>
                <span>
                  {meeting.start.toLocaleString("en-AU", { hour: "numeric", minute: "2-digit", hourCycle: "h12" })}
                  {meeting?.end &&
                    ` - ${meeting.end.toLocaleString("en-AU", { hour: "numeric", minute: "2-digit", hourCycle: "h12" })}`}
                </span>
              </p>
              <p className="flex items-center gap-1">
                <span className="material-symbols-sharp text-base! leading-none! text-muted-foreground">pin_drop</span>
                {meeting.room && `${meeting.room}, `}
                {data.venue}
              </p>
            </div>
          </div>
        </Map>
      )}
    </div>
  )
}
