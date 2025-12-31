import eventList from "@/data/events.json"
import { format, isAfter, isBefore, isSameDay, parse } from "date-fns"
import Link from "next/link"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

import { type Event } from "~/lib/types"

import EventCard from "./card"

const date = new Date()

const parseEventDate = (date: string, time: string) => {
  return parse(`${date} ${time.toUpperCase()}`, "dd/MM/yy h:mma", new Date())
}

const sort = (array: Event[], isReversed = false) =>
  array.sort((event1, event2) => {
    const date1 = parseEventDate(event1.date, event1.time.start)
    const date2 = parseEventDate(event2.date, event2.time.start)

    if (isReversed) return isAfter(date1, date2) ? -1 : 1
    return isAfter(date1, date2) ? 1 : -1
  })

const filter = (array: Array<Event>, isReversed = false) => {
  const data: Record<string, Array<Event>> = {}

  array.forEach((event) => {
    const year = parse(event.date, "dd/MM/yy", date).getFullYear().toString()

    if (data.hasOwnProperty(year)) {
      data[year]!.push(event)
    } else {
      data[year] = [event]
    }
  })

  return Object.entries(data).sort((data1, data2) => {
    const year1 = Number(data1[0])
    const year2 = Number(data2[0])

    if (isReversed) return year1 > year2 ? -1 : 1
    return year1 > year2 ? 1 : -1
  })
}

const events = {
  past: filter(
    eventList.filter((event) => isBefore(parse(`${event.date} ${event.time.start}`, "dd/MM/yy h:mma", date), date)),
    true,
  ),
  upcoming: filter(
    eventList.filter((event) => {
      const _date = parse(`${event.date} ${event.time.start}`, "dd/MM/yy h:mma", date)
      return isAfter(_date, date) || isSameDay(_date, date)
    }),
  ),
}

const smallDate = (date: string) => {
  return format(parse(date, "dd/MM/yy", new Date()), "MMM dd")
}

export default function EventsPage({ searchParams }: { searchParams: { type: string } }) {
  return (
    <Tabs defaultValue={searchParams.type ?? "upcoming"} className="container py-12">
      <TabsList className="mb-2 w-full max-w-xs">
        <TabsTrigger asChild value="past" className="w-full">
          <Link href="?type=past">Past</Link>
        </TabsTrigger>
        <TabsTrigger value="upcoming" className="w-full">
          <Link href="?type=upcoming">Upcoming</Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="past">
        <div className="space-y-6">
          {events.past.length === 0 ? (
            <h2 className="font-mono text-3xl text-primary">No past events</h2>
          ) : (
            events.past.map(([year, events]) => (
              <div key={year}>
                <h3 className="mb-2 ml-4 font-mono text-lg lg:ml-16">{year}</h3>
                <div className="space-y-4">
                  {sort(events, true).map((event) => (
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
          {events.upcoming.length === 0 ? (
            <h2 className="font-mono text-3xl text-black dark:text-white">No upcoming events</h2>
          ) : (
            events.upcoming.map(([year, events]) => (
              <div key={year}>
                <h3 className="mb-2 ml-4 font-mono text-lg lg:ml-16">{year}</h3>
                {sort(events).map((event) => (
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
