"use client"

import Image from "next/image"
import Link from "next/link"

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

import DBProject from "~/app/projects/(default)/db-project"

import type { ProjectType, defaultValueType } from "../admin/@projects/project-form"

export type DashboardCardProps = {
  logo_path: string | null
  img_path?: string | undefined | null
  name: string | null
  client: string | null
  type: ProjectType | null
  start_date?: Date | undefined | null
  end_date?: Date | undefined | null
  github_url?: string | null
  website_url?: string | null
  description: string | null
  impact?: { value: string }[] | null | string[]
  members?: string[] | null
  tech?: { label: string; value: string; path: string }[] | null
  is_application_open: boolean | null
  application_url?: string | null
  is_public: boolean | null
  id?: string | null
}
export const DashboardCard = ({ project, upcoming = false }: { project: DashboardCardProps; upcoming?: boolean }) => {
  return (
    <div className="w-full pt-0">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative aspect-square border border-black/25 hover:cursor-pointer dark:border-white/25">
            <div className="relative h-full flex-grow">
              <Image
                src={project.logo_path ?? ""}
                alt={`Client Logo of ${project.name}`}
                fill
                className="object-contain object-center p-6 min-w-[14rem]"
              />
              <div className="absolute left-0 top-0 flex size-full items-center justify-center bg-black opacity-0 transition-opacity duration-300 hover:opacity-90">
                <p className="w-3/4 text-center font-mono text-white">{project.name}</p>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-auto sm:w-full">
          <DialogHeader>
            <DialogTitle className="text-center">Project Details</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <DBProject data={project} />
          <div className="flex justify-between mx-10">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            {upcoming && project.application_url ? (
              <Link href={project.application_url}>
                <Button type="button">Apply Now</Button>
              </Link>
            ) : (
              <Button type="button" disabled>
                Apply Now
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
