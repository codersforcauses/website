import * as React from "react"

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"

type ToolCardProps = {
  title: string
  children: React.ReactNode
}

function ToolCard({ title, children }: ToolCardProps) {
  return (
    <div className="col-span-2 border bg-card text-card-foreground">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <h3 className="text-sm font-medium tracking-tight">{title}</h3>
      </div>
      <div className="w-full p-6 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open form</Button>
          </DialogTrigger>
          <DialogContent className="max-h-screen overflow-auto sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default ToolCard
