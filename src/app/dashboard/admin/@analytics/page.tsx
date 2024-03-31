import Count from "./count"
import GenderDistribution from "./gender-distribution"
import UsersGraph from "./users-graph"

export default async function AdminAnalyticsTable() {
  return (
    <>
      <div className="flex h-[50px] items-center p-1">
        <h2 className="text-2xl font-semibold">Analytics</h2>
      </div>
      Need to update the SQL for this on BE
      <div className="grid grid-cols-5 gap-4">
        <Count />
        <UsersGraph />
        <GenderDistribution />
      </div>
    </>
  )
}
