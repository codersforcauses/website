// import { api } from "~/trpc/server"

interface ElementProps {
  heading: string
  count: number | string
  icon: string
}

function Element(props: ElementProps) {
  return (
    <div className="flex flex-col gap-2 bg-white p-6 dark:bg-neutral-950">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-sm font-medium tracking-tight">{props.heading}</h3>
        <span className="material-symbols-sharp text-xl! leading-none! select-none">{props.icon}</span>
      </div>
      <div className="">
        <div className="text-2xl font-bold">{props.count}</div>
        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
      </div>
    </div>
  )
}

export default function CountRow() {
  //   const count = await api.admin.analytics.getUserCount.query()

  return (
    <>
      <Element
        heading="Users"
        count={400}
        // count={count.users}
        icon="group"
      />
      <Element
        heading="Members"
        count={200}
        // count={count.members}
        icon="group"
      />
      <Element heading="Projects" count={"N/A"} icon="devices" />
      <Element heading="Events" count={"N/A"} icon="event" />
    </>
  )
}
