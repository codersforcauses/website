import { format, isAfter, isBefore, isSameDay, parse } from "date-fns"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import eventList from "data/events.json"
import EventCard from "./card"
import { type Event } from "~/lib/types"

const date = new Date()

const parseEventDate = (date: string, time: string) => {
  return parse(`${date} ${time.toUpperCase()}`, "dd/MM/yy h:mma", date)
}

const sort = (array: Event[], isReversed = false) =>
  array.sort((event1, event2) => {
    const date1 = parseEventDate(event1.date, event1.time.start)
    const date2 = parseEventDate(event2.date, event2.time.start)

    if (isReversed) return isAfter(date1, date2) ? -1 : 1
    return isAfter(date1, date2) ? 1 : -1
  })

const filterYears = (array: Array<Event>) => {
  const data: Record<string, Array<Event>> = {}

  array.forEach((event) => {
    const year = parse(event.date, "dd/MM/yy", date).getFullYear().toString()

    if (data.hasOwnProperty(year)) {
      data[year]!.push(event)
    } else {
      data[year] = [event]
    }
  })

  return data
}

const events = {
  past: filterYears(
    sort(
      eventList.filter((event) => isBefore(parse(`${event.date} ${event.time.start}`, "dd/MM/yy h:mma", date), date)),
      true,
    ),
  ),
  upcoming: filterYears(
    sort(
      eventList.filter((event) => {
        const _date = parse(`${event.date} ${event.time.start}`, "dd/MM/yy h:mma", date)
        return isAfter(_date, date) || isSameDay(_date, date)
      }),
    ),
  ),
}

const smallDate = (date: string) => {
  return format(parse(date, "dd/MM/yy", new Date()), "MMM dd")
}

export default function EventsPage() {
  return (
    <Tabs defaultValue="upcoming" className="container py-12">
      <TabsList className="mb-2 w-full max-w-xs">
        <TabsTrigger value="past" className="w-full">
          Past
        </TabsTrigger>
        <TabsTrigger value="upcoming" className="w-full">
          Upcoming
        </TabsTrigger>
      </TabsList>
      <TabsContent value="past">
        <div className="space-y-6">
          {Object.keys(events.past).length === 0 ? (
            <h2 className="font-mono text-3xl text-primary">No past events</h2>
          ) : (
            Object.entries(events.past).map(([year, events]) => (
              <div key={year}>
                <h3 className="mb-2 ml-4 font-mono text-lg lg:ml-16">{year}</h3>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.date + event.time.start}
                      className="relative border-l border-black/25 dark:border-white/25"
                    >
                      <span className="absolute left-0 -translate-x-1/2 translate-y-2/3 rotate-90 bg-background pb-1 pr-2 font-mono lg:-translate-x-1 lg:translate-y-0 lg:rotate-0 lg:px-0">
                        {smallDate(event.date)}
                      </span>
                      <EventCard key={event.slug} {...event} />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </TabsContent>
      <TabsContent value="upcoming">
        <div className="space-y-6">
          {Object.keys(events.upcoming).length === 0 ? (
            <h2 className="font-mono text-3xl text-black dark:text-white">No upcoming events</h2>
          ) : (
            Object.entries(events.upcoming).map(([year, events]) => (
              <div key={year}>
                <h3 className="mb-2 ml-4 font-mono text-lg lg:ml-16">{year}</h3>
                {events.map((event) => (
                  <div
                    key={event.date + event.time.start}
                    className="relative border-l border-black/25 dark:border-white/25"
                  >
                    <span className="absolute left-0 -translate-x-1/2 translate-y-2/3 rotate-90 bg-background pb-1 pr-2 font-mono lg:-translate-x-1 lg:translate-y-0 lg:rotate-0 lg:px-0">
                      {smallDate(event.date)}
                    </span>
                    <EventCard key={event.slug} {...event} />
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
