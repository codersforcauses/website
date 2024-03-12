import { iconMap } from "~/lib/constants"
import type { TechIcons } from "../types"

interface TechListProps {
  data: TechIcons[]
}

const TechList = ({ data }: TechListProps) => (
  <div className="grid grid-cols-2 gap-4">
    {data.map((tech: TechIcons) => {
      const iconPath = typeof tech.icon === "string" ? iconMap[tech.icon] : undefined

      return (
        <div key={tech.name} className="flex items-center space-x-3 font-mono md:space-x-4">
          <svg role="img" viewBox="0 0 24 24" height={24} width={24} className="fill-current text-4xl">
            <path d={iconPath} />
          </svg>
          <p className="md:text-xl">{tech.name}</p>
        </div>
      )
    })}
  </div>
)

export default TechList
