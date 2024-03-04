import { api } from "~/trpc/server"

interface CardProps {
  heading: string
  count: number | string
  icon: string
}

const Card = (props: CardProps) => {
  return (
    <div className="border bg-card text-card-foreground">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <h3 className="text-sm font-medium tracking-tight">{props.heading}</h3>
        <span className="material-symbols-sharp select-none">{props.icon}</span>
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{props.count}</div>
        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
      </div>
    </div>
  )
}

const Count = async () => {
  const count = await api.analytics.count.query()

  return (
    <>
      <Card heading="Users" count={count.users} icon="group" />
      <Card heading="Members" count={count.members} icon="group" />
      <Card heading="Projects" count={"N/A"} icon="devices" />
      <Card heading="Events" count={"N/A"} icon="event" />
    </>
  )
}

export default Count
