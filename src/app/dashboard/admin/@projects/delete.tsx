"use client"

import * as z from "zod"

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { toast } from "~/components/ui/use-toast"

import { api } from "~/trpc/react"

type DeleteProjectProps = {
  name?: string
}

const DeleteProjectPopover = ({ name = "" }: DeleteProjectProps) => {
  const utils = api.useUtils()
  const deleteProject = api.admin.projects.deleteProject.useMutation({
    onSuccess: async () => {
      toast({
        title: "Project deleted successfully",
        description: "Your project has been deleted.",
      })
      await utils.admin.projects.invalidate()
    },
    onError: (error) => {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Failed to delete project",
        description: error.message,
      })
    },
  })
  const handleClick = () => {
    deleteProject.mutate({
      name: name,
    })
  }
  return (
    <>
      <div className=" text-center py-6">Are you sure you want to delete this project?</div>
      <div className="flex justify-between">
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button type="button" variant="destructive" onClick={handleClick}>
          Delete
        </Button>
      </div>
    </>
  )
}

export default function DeleteProject({ name }: DeleteProjectProps) {
  return (
    <div className=" pt-0">
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant="destructive">
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Delete Project</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <DeleteProjectPopover name={name} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
