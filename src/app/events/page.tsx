"use client"

import { useState } from "react"
import eventList from "data/events.json"
import EventCard from "./eventcard"
import TitleText from "../_components/title-text"
import day from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

import { type Event } from "~/lib/types"

day.extend(customParseFormat)

const sorted = (array: Array<Event>) =>
  array.sort((event1, event2) => {
    const eventDate = ({ date, time }: Event) => day(date + time.start, "DD/MM/YYh:mma")
    return eventDate(event1).isAfter(eventDate(event2)) ? 1 : -1
  })

const events = {
  past: sorted(eventList.filter((event) => day(event.date, "DD/MM/YY").isBefore(day()))),
  upcoming: sorted(
    eventList.filter((event) => {
      const date = day(event.date, "DD/MM/YY")
      return date.isAfter(day()) || date.isSame(day())
    }),
  ),
}

type EventFilter = keyof typeof events

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
