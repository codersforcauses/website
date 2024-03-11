import Image from "next/image"

import { Badge } from "~/components/ui/badge"
import { Skeleton } from "~/components/ui/skeleton"
import type { Event } from "~/lib/types"

const EventCard = (event: Omit<Event, "type">) => {
  return (
    <div className="ml-4 grid grid-cols-5 grid-rows-2 border @container/card lg:ml-16">
      <div className="relative col-span-full @xl/card:col-span-2 @xl/card:row-span-2">
        <Skeleton className="size-full" />
        <Image
          priority
          src={event.image.src}
          alt={event.image.alt}
          layout="fill"
          className="size-full object-cover object-center"
        />
      </div>
      <div className="col-span-full space-y-2 p-6 @xl/card:col-span-3 @xl/card:row-span-2">
        <div className="flex flex-wrap gap-2">
          {event.tags?.map((tag) => (
            <Badge key={tag} className="pointer-events-none">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="font-mono text-xl font-bold">{event.title}</p>
        <div className="text-sm">
          <p>Time: {event.time.start}</p>
          <p>Location: {event.location}</p>
        </div>
        <p className="text-sm">{event.desc}</p>
      </div>
    </div>
  )
}

export default EventCard
