import { type ReactNode } from "react"
import Gemini from "../gemini"
import { BentoGrid, BentoGridItem } from "../ui/bento-grid"

import Building from "./svg/building"
import Cloud from "./svg/cloud"
import Server from "./svg/Secure Server"
import Chat from "./svg/chat"

const BentoDisplay = () => {
  return (
    <BentoGrid className="max-w-4xl] mx-auto">
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

const SvgDisplay = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center border dark:border-none dark:bg-neutral-900 dark:grayscale">{children}</div>
  )
}

const items = [
  {
    title: "Websites",
    description: "Build and maintain websites for your organisation",
    header: (
      <SvgDisplay>
        <Building className="w-full" />
      </SvgDisplay>
    ),
    className: "md:col-span-1",
    icon: "web",
  },
  {
    title: "Data Storage",
    description: "Store and manage your user's data securely and efficiently",
    header: (
      <SvgDisplay>
        <Server className="w-full" />
      </SvgDisplay>
    ),
    className: "md:col-span-1",
    icon: "storage",
  },
  {
    title: "Consulting",
    description: "Get advice and guidance on technical matters for your organisation",
    header: (
      <SvgDisplay>
        <Chat className="w-full" />
      </SvgDisplay>
    ),
    className: "md:col-span-1",
    icon: "how_to_reg",
  },
  {
    title: "Cloud Services",
    description: "Leverage the power of cloud computing to scale and grow your organisation",
    header: (
      <SvgDisplay>
        <Cloud className="w-full" />
      </SvgDisplay>
    ),
    className: "md:col-span-1",
    icon: "cloud",
  },
  {
    title: "Artificial Intelligence",
    description: "Leverage the power of AI to automate and improve your organisation",
    header: <Gemini />,
    className: "sm:col-span-2",
    icon: "neurology",
  },
]

export default BentoDisplay
