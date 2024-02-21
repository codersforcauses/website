import Image from "next/image"
import { type Event } from "~/lib/types"

const EventCard = (event: Omit<Event, "type">) => {
  return (
    <div className="ml-4 grid grid-cols-5 grid-rows-2 bg-alt-light dark:bg-black lg:ml-16 lg:grid-rows-1">
      <div className="relative col-span-full lg:col-span-2">
        <div className="h-full w-full animate-pulse bg-secondary dark:bg-alt-dark" />
        <Image
          priority
          src={event.image.src}
          alt={event.image.alt}
          layout="fill"
          objectFit="cover"
          objectPosition="center top"
        />
      </div>
      <div className="col-span-full space-y-2 px-6 py-4 dark:text-primary lg:col-span-3">
        <div className="space-x-2">
          {event.tags?.map((tag) => (
            <span
              key={tag}
              className="border border-primary border-opacity-25 px-1 py-0.5 text-xs opacity-70 dark:border-alt-light dark:border-opacity-30"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="font-mono text-2xl font-bold">{event.title}</p>
        <div>
          <p>Time: {event.time.start}</p>
          <p>Location: {event.location}</p>
        </div>
        <p>{event.desc}</p>
      </div>
    </div>
  )
}

export default EventCard
