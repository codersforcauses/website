import agendaList from "@/data/hackathon2025/agenda.json"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

import { type Agenda } from "~/lib/types"

import AgendaCard from "./card"

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const today = new Date()
const dayName = days[today.getDay()]
const exists = agendaList.some((item) => item.day === dayName)
export default function AgendaPage() {
  return (
    <div className="container ">
      <div className="flex items-center mt-8">
        <h2 className="text-2xl font-semibold">Agenda</h2>
      </div>
      <p className=" mt-2 text-sm text-gray-500">Event Dates: August 28–31, 2025</p>
      <p className="  text-sm text-gray-500">Please note that the agenda may be subject to change.</p>
      <Tabs defaultValue={exists ? dayName : "Sunday"} className="py-8">
        <TabsList className="mb-2 w-full max-w-xs">
          <TabsTrigger asChild value="Friday" className="w-full">
            <div>Friday 29/8</div>
          </TabsTrigger>
          <TabsTrigger value="Saturday" className="w-full">
            <div>Saturday 30/8</div>
          </TabsTrigger>
          <TabsTrigger value="Sunday" className="w-full">
            <div>Sunday 31/8</div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Friday">
          <div className="space-y-6">
            <AgendaCard agenda={agendaList as Agenda[]} day="Friday" />
          </div>
        </TabsContent>
        <TabsContent value="Saturday">
          <div className="space-y-6">
            <AgendaCard agenda={agendaList as Agenda[]} day="Saturday" />
          </div>
        </TabsContent>
        <TabsContent value="Sunday">
          <div className="space-y-6">
            <AgendaCard agenda={agendaList as Agenda[]} day="Sunday" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
