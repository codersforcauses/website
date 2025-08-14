"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { track } from "@vercel/analytics/react"
import exp from "constants"
import { format } from "date-fns"
import { is } from "drizzle-orm"
import { date } from "drizzle-orm/mysql-core"
import { useEffect, useState } from "react"
import { useFieldArray, useForm, useFormContext, useWatch } from "react-hook-form"
import type { SimpleIcon } from "simple-icons"
import * as SimpleIcons from "simple-icons/icons"
import { cli } from "webpack"
import * as z from "zod"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "~/components/ui/command"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { toast } from "~/components/ui/use-toast"

import { cn } from "~/lib/utils"
import { api } from "~/trpc/react"

const formSchema = z.object({
  user_emails: z.array(z.string()),
})
type FormSchema = z.infer<typeof formSchema>
const defaultValues = {
  user_emails: [],
}

type UpdateMembersProps = {
  project_name: string
}
const SelectMembersForm = () => {
  const { getValues } = useFormContext<FormSchema>()
  const { append, remove } = useFieldArray({
    name: "user_emails",
  })
  const utils = api.useUtils()
  const { data: users } = api.admin.users.getAll.useQuery()
  const { user_emails: emailArray } = getValues()
  const { data: projects } = api.admin.projects.getProjects.useQuery({ name: "cfc" })
  const projectId = projects?.[0]?.id

  const { data: project } = api.admin.projects.getProjectById.useQuery(
    { id: projectId! },
    {
      enabled: !!projectId, // only run query if projectId is truthy
    },
  )
  const existMemberEmails = project?.members
    .map((member) => member?.userEmail)
    .filter((email): email is string => email != null)
  const existEmails: string[] = existMemberEmails ?? []
  console.log("existEmails", existEmails)

  useEffect(() => {
    if (project?.members?.length) {
      project.members.forEach((member) => {
        if (member.userEmail && !emailArray.includes(member.userEmail)) {
          append(member.userEmail)
        }
      })
    }
  }, [project?.members])

  return (
    <div className="space-y-1.5">
      <FormItem className="flex flex-col">
        <FormLabel className="font-mono">Members</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button variant="outline" role="combobox" className="w-full justify-between">
                Select user
                <span className="material-symbols-sharp ml-2 h-6 w-6 shrink-0 opacity-50">unfold_more</span>
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput placeholder="Search user..." />
              <CommandEmpty>User not found.</CommandEmpty>
              <CommandGroup className="max-h-52 overflow-y-scroll">
                {users?.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.email}
                    onSelect={() => {
                      if (!emailArray.some((email) => email === user.email)) append(user.email)
                    }}
                  >
                    <span
                      className={cn(
                        "material-symbols-sharp mr-2 h-6 w-6 text-black",
                        emailArray.some((email) => email === user.email) ? "opacity-100" : "opacity-0",
                      )}
                    >
                      check
                    </span>
                    {user.email}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
      <ul className="flex flex-wrap gap-1.5">
        {Array.isArray(emailArray) &&
          emailArray.map((item, index) => (
            <li key={index} className="flex">
              <Badge variant="secondary" className="select-none">
                {item}
              </Badge>
              <Button
                type="button"
                aria-label="Remove item"
                size="icon"
                variant="secondary"
                onClick={() => remove(index)}
              >
                <span className="material-symbols-sharp">close</span>
              </Button>
            </li>
          ))}
      </ul>
    </div>
  )
}

const MembersForm = ({ project_name }: UpdateMembersProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const utils = api.useUtils()
  const createMember = api.admin.projects.updateMember.useMutation({
    onSuccess: async () => {
      toast({
        title: "Members added successfully",
        description: "Members has been added and is now available.",
      })
      await utils.admin.projects.invalidate()
    },
    onError: (error) => {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Failed to add members",
        description: error.message,
      })
    },
  })
  const onSubmit = (values: FormSchema) => {
    console.log("form:", values)
    createMember.mutate({
      project_name: project_name,
      user_emails: values.user_emails,
    })
  }
  return (
    <div className="container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <SelectMembersForm />
          <div className="flex flex-row-reverse justify-between">
            <Button type="submit" size="lg">
              Submit
            </Button>
            <DialogClose>
              <Button variant="ghost" type="button">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default function UpdateMembers({ project_name }: UpdateMembersProps) {
  return (
    <div className=" pt-0">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Update Members</Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-auto sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Update Members</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <MembersForm project_name={project_name} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
