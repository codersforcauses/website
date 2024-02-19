import Gemini from "../gemini"
import { BentoGrid, BentoGridItem } from "../ui/bento-grid"

const BentoDisplay = () => {
  return (
    <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
          alt={i % 2 !== 0}
        />
      ))}
    </BentoGrid>
  )
}
const Skeleton = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"></div>
)
const items = [
  {
    title: "Applications",
    description: "Build custom web and mobile applications to engage with your audience",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: "devices",
  },
  {
    title: "Websites",
    description: "Build new websites or optimize existing pages to improve online visibility",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: "web",
  },
  {
    title: "Data Storage",
    description: "Design and create databases for efficient information storage and retrieval",
    header: <Gemini />,
    className: "md:col-span-1",
    icon: "storage",
  },
  {
    title: "Consulting",
    description: "Empower your organization through technical knowledge and advice",
    header: <Gemini />,
    className: "md:col-span-1",
    icon: "how_to_reg",
    // icon: <IconTableColumn className="w-4 h-4 text-neutral-500" />,
  },
  {
    title: "Artificial Intelligence",
    description: "Empower your organization through technical knowledge and advice",
    header: <Gemini />,
    className: "md:col-span-2",
    icon: "neurology",
    // icon: <IconTableColumn className="w-4 h-4 text-neutral-500" />,
  },
]

export default BentoDisplay
