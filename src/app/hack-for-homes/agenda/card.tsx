import type { Agenda } from "~/lib/types"

type AgendaCardProps = { agenda: Agenda[]; day: string }

const AgendaCard = ({ agenda, day }: AgendaCardProps) => {
  return (
    <div className="rounded-lg border p-4">
      {agenda
        .filter((item) => item.day === day)
        .map((item, index) => (
          <div key={index} className="p-4">
            <p className="text-sm text-gray-500">
              {item.start.split("T")[1]} - {item.end.split("T")[1]}
            </p>
            <h3 className="text-lg font-semibold">{item.title}</h3>
          </div>
        ))}
    </div>
  )
}

export default AgendaCard
