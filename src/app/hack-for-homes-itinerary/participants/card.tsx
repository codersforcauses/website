import type { Participant } from "~/lib/types"

type ParticipantCardProps = { participants: Participant[]; role: string }

const ParticipantCard = ({ participants, role }: ParticipantCardProps) => {
  return (
    <div>
      {participants
        .filter((item) => item.role === role)
        .map((item, index) => (
          <div key={index} className="p-4 rounded-lg border mb-4">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
        ))}
    </div>
  )
}

export default ParticipantCard
