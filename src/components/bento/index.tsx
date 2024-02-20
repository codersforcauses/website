import { type ReactNode } from "react"
import { BentoGrid, BentoGridItem } from "../ui/bento-grid"

import Building from "./svg/building"
import Cloud from "./svg/cloud"
import Server from "./svg/server"
import Chat from "./svg/chat"
import { GoogleGeminiEffect } from "../ui/gemini"

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
    header: (
      <div className="flex h-full items-center border dark:border-none dark:bg-neutral-900">
        <GoogleGeminiEffect className="display-block w-full py-4" />
      </div>
    ),
    className: "sm:col-span-2",
    icon: "neurology",
  },
]

export default BentoDisplay
