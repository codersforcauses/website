"use client"

import Image from "next/image"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"

import { api } from "~/trpc/react"

import type { ProjectType, defaultValueType } from "./projectForm"
import ProjectForm from "./projectForm"

interface DBProjectCardProps {
  project: { id: string; name: string; logo_path: string; is_public: boolean }
}

export const DBProjectCard = ({ project }: DBProjectCardProps) => {
  const { data: data } = api.admin.projects.getProjectById.useQuery({ id: project.id })

  const defaultValues: defaultValueType = {
    logo_path: data?.logo_path || "",
    img_path: data?.img_path || undefined,
    name: data?.name || "",
    client: data?.client || "",
    type: data?.type || "Website",
    start_date: data?.start_date || undefined,
    end_date: data?.end_date || undefined,
    github_url: data?.github_url || undefined,
    website_url: data?.website_url || undefined,
    description: data?.description || "",
    impact: data?.impact?.map((item) => ({ value: item })) || [
      {
        value: "",
      },
    ],
    members: data?.members || [],
    tech: data?.tech || [],
    is_application_open: data?.is_application_open || false,
    application_url: data?.application_url || undefined,
    is_public: data?.is_public || false,
    id: data?.id,
  }
  return (
    <div className="w-full pt-0">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative aspect-square border border-black/25 hover:cursor-pointer dark:border-white/25">
            <div className="relative h-full flex-grow">
              <Image
                src={project.logo_path}
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
        <DialogContent className="max-h-screen overflow-auto sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle className="text-center">Update Project</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <ProjectForm formDefaultValues={defaultValues} isNew={false} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
