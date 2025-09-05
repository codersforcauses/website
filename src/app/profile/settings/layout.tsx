import * as React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

import TitleText from "~/app/_components/title-text"
import { type PropsWithChildren } from "~/lib/types"

interface UserSettingsLayoutProps extends PropsWithChildren {
  personal: React.ReactNode
  email: React.ReactNode
  appearance: React.ReactNode
  membership: React.ReactNode
}

const Layout = async ({ children, ...props }: UserSettingsLayoutProps) => {
  const sidebarItems = [
    { text: "Personal", icon: "face", component: props.personal },
    {
      text: "Email",
      icon: "mail",
      component: props.email,
    },
    { text: "Appearance", icon: "palette", component: props.appearance },
    // { text: "Notifications", icon: "notifications", component:  },
    { text: "Membership", icon: "stars", component: props.membership },
  ]

  return (
    <main className="main">
      <TitleText typed>./settings</TitleText>
      <div className="container py-8">
        <Tabs defaultValue={sidebarItems[0]?.text} className="flex flex-col md:flex-row">
          <TabsList className="h-full flex-grow p-1 md:h-auto md:flex-grow-0">
            <div className="flex md:grid md:h-min md:w-52 md:max-w-xs md:grid-cols-1 md:gap-1 md:self-start">
              {sidebarItems.map(({ icon, text }) => (
                <TabsTrigger
                  key={text}
                  value={text}
                  className="group flex justify-start focus:ring-1 focus:ring-muted-foreground data-[state=active]:flex-grow md:h-[42px]"
                >
                  <span className="material-symbols-sharp text-xl leading-none">{icon}</span>
                  <span className="ml-2 hidden group-data-[state=active]:block sm:block">{text}</span>
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
          <div className="flex-grow py-8 md:px-8 md:py-0">
            {sidebarItems.map(({ text, component }) => (
              <TabsContent key={text} value={text} className="mt-0">
                {component}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
      {children}
    </main>
  )
}

export default Layout
