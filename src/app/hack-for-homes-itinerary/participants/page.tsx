import participantList from "data/hackathon2025-participants.json"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

import { Participant } from "~/lib/types"

import ParticipantCard from "./card"

export default function AgendaPage() {
  return (
    <>
      <div className="flex items-center px-8 pt-12">
        <h2 className="text-2xl font-semibold">Participants</h2>
      </div>
      <Tabs defaultValue="judges" className="container py-8">
        <TabsList className="mb-2 w-full max-w-xs">
          <TabsTrigger asChild value="judges" className="w-full">
            <div>Judges</div>
          </TabsTrigger>
          <TabsTrigger value="mentors" className="w-full">
            <div>Mentors</div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="judges">
          <div className="space-y-6">
            <ParticipantCard participants={participantList as Participant[]} role="Judge" />
          </div>
        </TabsContent>
        <TabsContent value="mentors">
          <div className="space-y-6">
            <ParticipantCard participants={participantList as Participant[]} role="Mentor" />
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
