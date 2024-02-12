"use client"

import { useState } from "react"
import eventList from "data/events.json"
import EventCard from "./eventcard"
import TitleText from "../_components/title-text"
import day from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

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
  const [eventFilter, setEventFilter] = useState<EventFilter>("upcoming")

  return (
    <main className="main">
      <TitleText typed>./events</TitleText>
      <div className="bg-secondary text-primary dark:bg-alt-dark dark:text-secondary">
        <div className="container mx-auto space-y-12 px-3 py-12 md:py-24">
          <div className="mb-8 text-left">
            <button
              className={`px-4 py-2 ${eventFilter === "upcoming" ? "bg-primary text-white dark:bg-secondary" : "bg-white"}`}
              onClick={() => setEventFilter("past")}
            >
              Past
            </button>
            <button
              className={`${eventFilter === "past" ? "bg-primary text-white dark:bg-secondary" : "bg-white"} px-4 py-2`}
              onClick={() => setEventFilter("upcoming")}
            >
              Upcoming
            </button>
          </div>
          <div className="space-y-6">
            {events[eventFilter].length === 0 ? (
              <h2 className="font-mono text-4xl text-black dark:text-white">No {eventFilter} events</h2>
            ) : (
              events[eventFilter].map((event) => (
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
        </div>
      </div>
    </main>
  )
}

export default EventsPage
