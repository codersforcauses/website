import dynamic from "next/dynamic"

import { api } from "~/trpc/server"

const GenderDistributionGraph = dynamic(() => import("./_components/gender-distribution"), {
  ssr: false,
})

const GenderDistribution = async () => {
  const gender = await api.admin.analytics.getGenderStatistics.query()

  return (
    <div className="col-span-2 border bg-card text-card-foreground">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <h3 className="text-sm font-medium tracking-tight">Gender distribution</h3>
      </div>
      <div className="h-96 w-full p-6 pt-0">
        <GenderDistributionGraph data={gender} />
      </div>
    </div>
  )
}

export default GenderDistribution
