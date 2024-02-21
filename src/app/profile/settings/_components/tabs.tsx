import * as React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { type User } from "~/lib/types"
import Placeholder from "./placeholder"
import Personal from "./personal"
import Socials from "./socials"
const Appearance = dynamic(() => import("./appearance"), { ssr: false })

interface SettingsTabsProps {
  defaultValues: Partial<
    Omit<User, "id" | "square_customer_id" | "role" | "createdAt" | "updatedAt" | "university" | "student_number">
  > & {
    student_number?: string
    uni?: string
    isUWA: boolean
  }
  currentTab?: string
}

const SettingsTabs = ({
  defaultValues: { github, discord, subscribe, ...defaultValues },
  currentTab,
}: SettingsTabsProps) => {
  const sidebarItems = React.useMemo(
    () => [
      { text: "Personal", slug: "personal", icon: "face", component: <Personal defaultValues={defaultValues} /> },
      {
        text: "Socials",
        slug: "socials",
        icon: "tag",
        component: <Socials defaultValues={{ github: github ?? "", discord: discord ?? "" }} />,
      },
      { text: "Appearance", slug: "appearance", icon: "palette", component: <Appearance /> },
      { text: "Notifications", slug: "notifications", icon: "notifications", component: <Placeholder /> },
      { text: "Membership", slug: "membership", icon: "stars", component: <Placeholder /> },
    ],
    [defaultValues, discord, github],
  )
  return (
    <Tabs
      //   orientation="vertical"
      value={currentTab ?? sidebarItems[0]?.slug}
      className="flex flex-col md:flex-row"
    >
      <TabsList className="h-full flex-grow p-1 md:h-auto md:flex-grow-0">
        <div className="flex md:grid md:h-min md:w-52 md:max-w-xs md:grid-cols-1 md:gap-1 md:self-start">
          {sidebarItems.map(({ icon, slug, text }) => (
            <TabsTrigger
              asChild
              key={slug}
              value={slug}
              className="group flex justify-start focus:ring-1 focus:ring-muted-foreground data-[state=active]:flex-grow md:h-[42px]"
            >
              <Link href={`?tab=${slug}`}>
                <span className="material-symbols-sharp text-xl leading-none">{icon}</span>
                <span className="ml-2 hidden group-data-[state=active]:block md:block">{text}</span>
              </Link>
            </TabsTrigger>
          ))}
        </div>
      </TabsList>
      <div className="flex-grow py-8 md:px-8 md:py-0">
        {sidebarItems.map(({ slug, component }) => (
          <TabsContent key={slug} value={slug} className="mt-0">
            {component}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}

export default SettingsTabs
