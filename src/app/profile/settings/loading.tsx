"use client"

import * as React from "react"
import Link from "next/link"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import Loader from "./_components/loader"

const sidebarItems = [
  { text: "Personal", slug: "personal", icon: "face", component: <Loader /> },
  {
    text: "Socials",
    slug: "socials",
    icon: "tag",
    component: <Loader />,
  },
  { text: "Appearance", slug: "appearance", icon: "palette", component: <Loader /> },
  { text: "Notifications", slug: "notifications", icon: "notifications", component: <Loader /> },
  { text: "Membership", slug: "membership", icon: "stars", component: <Loader /> },
]

const Loading = () => {
  return (
    <div className="container py-8">
      <Tabs
        //   orientation="vertical"
        value={sidebarItems[0]?.slug}
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
    </div>
  )
}

export default Loading
