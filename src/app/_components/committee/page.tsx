import committee from "data/committee.json"
import CommitteeCard from "./CommitteeCard/page"

const Committee = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {committee.map((member) => (
        <CommitteeCard key={member.name} {...member} />
      ))}
    </div>
  )
}

export default Committee
