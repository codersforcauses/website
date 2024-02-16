"use client"

import eventList from "data/events.json"
import EventCard from "./eventcard"
import TitleText from "../_components/title-text"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { isAfter, isBefore, isSameDay, parse } from "date-fns"

import { type Event } from "~/lib/types"

const parseEventDate = (date: string, time: string) => {
  return parse(`${date} ${time.toUpperCase()}`, "dd/MM/yy h:mma", new Date())
}

const sorted = (array: Event[]) =>
  array.sort((event1, event2) => {
    const date1 = parseEventDate(event1.date, event1.time.start)
    const date2 = parseEventDate(event2.date, event2.time.start)

    return isAfter(date1, date2) ? 1 : -1
  })

const events = {
  past: sorted(
    eventList.filter((event) =>
      isBefore(parse(`${event.date} ${event.time.start}`, "dd/MM/yy h:mma", new Date()), new Date()),
    ),
  ),
  upcoming: sorted(
    eventList.filter((event) => {
      const date = parse(`${event.date} ${event.time.start}`, "dd/MM/yy h:mma", new Date())
      return isAfter(date, new Date()) || isSameDay(date, new Date())
    }),
  ),
}

const EventsPage = () => {
  return (
    <main className="main">
      <TitleText typed>./events</TitleText>
      <div className="bg-secondary text-primary dark:bg-alt-dark dark:text-secondary">
        <div className="container mx-auto space-y-12 px-3 py-12 md:py-24">
          <div className="mb-8 text-left">
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-2">
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>
              <TabsContent value="past">
                <div className="space-y-6">
                  {events.past.length === 0 ? (
                    <h2 className="font-mono text-4xl text-black dark:text-white">No past events</h2>
                  ) : (
                    events.past.map((event) => (
                      <div
                        key={event.date + event.time.start}
                        className="relative border-l border-primary border-opacity-40 dark:border-secondary dark:border-opacity-40"
                      >
                        <span className="absolute left-0 -translate-x-1/2 translate-y-full rotate-90 transform bg-secondary px-4 font-mono text-lg dark:bg-alt-dark lg:translate-y-0 lg:rotate-0">
                          {event.date}
                        </span>
                        <EventCard key={event.slug} {...event} />
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
              <TabsContent value="upcoming">
                <div className="space-y-6">
                  {events.upcoming.length === 0 ? (
                    <h2 className="font-mono text-4xl text-black dark:text-white">No upcoming events</h2>
                  ) : (
                    events.upcoming.map((event) => (
                      <div
                        key={event.date + event.time.start}
                        className="relative border-l border-primary border-opacity-40 dark:border-secondary dark:border-opacity-40"
                      >
                        <span className="absolute left-0 -translate-x-1/2 translate-y-full rotate-90 transform bg-secondary px-4 font-mono text-lg dark:bg-alt-dark lg:translate-y-0 lg:rotate-0">
                          {event.date}
                        </span>
                        <EventCard key={event.slug} {...event} />
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}

export default EventsPage
