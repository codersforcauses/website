import Link from "next/link"
import Image from "next/image"
import Pie, { ProvidedProps, PieArcDatum } from "@visx/shape/lib/shapes/Pie"

import { Button } from "~/components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui/resizable"

import { api } from "~/trpc/server"

export default async function AdminDashboard() {
  const users = await api.user.getAllUsers.query()

  console.log(users)

  return (
    <main className="main">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        <ResizablePanel defaultSize={25} className="min-w-12">
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      {/* <div className="container py-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1> */}
      {/* <div>
          <Button asChild>
            <Link href="/projects/new">New project</Link>
          </Button>
        </div> */}
      {/* </div> */}
    </main>
  )
}
