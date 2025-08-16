"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
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

import type { DBProjectProps } from "~/app/projects/(default)/db-project"
import DBProject from "~/app/projects/(default)/db-project"
import { api } from "~/trpc/react"

import { DashboardCardProps } from "../../(root)/card"
import type { defaultValueType } from "./project-form"

export default function PreviewProject({ data }: { data: DashboardCardProps }) {
  return (
    <div className=" pt-0">
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant="outline">
            Preview
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-auto sm:max-w-screen">
          <DialogHeader>
            <DialogTitle className="text-center">Preview Project</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <DBProject data={data} />
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}
