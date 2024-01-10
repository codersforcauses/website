import Link from "next/link"
import Image from "next/image"
import Pie, { ProvidedProps, PieArcDatum } from "@visx/shape/lib/shapes/Pie"

import { getServerAuthSession } from "~/server/auth"
import { api } from "~/trpc/server"
import { Button } from "~/components/ui/button"

export default async function AdminDashboard() {
  const hello = await api.post.hello.query({ text: "from tRPC" })
  const session = await getServerAuthSession()

  return (
    <main className="main">
      <div className="container py-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div>
          <Button asChild>
            <Link href="/projects/new">New project</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
