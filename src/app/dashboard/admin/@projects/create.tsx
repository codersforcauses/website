"use client"

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"

import ProjectForm from "./project-form"

export default function CreateProject() {
  return (
    <div className=" pt-0">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create New Project</Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-auto sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle className="text-center">Create New Project</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <ProjectForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
