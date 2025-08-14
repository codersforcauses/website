"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { track } from "@vercel/analytics/react"
import exp from "constants"
import { format } from "date-fns"
import { is } from "drizzle-orm"
import { date } from "drizzle-orm/mysql-core"
import { useState } from "react"
import { useFieldArray, useForm, useFormContext } from "react-hook-form"
import type { SimpleIcon } from "simple-icons"
import * as SimpleIcons from "simple-icons/icons"
import { cli } from "webpack"
import * as z from "zod"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import { Checkbox } from "~/components/ui/checkbox"
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
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Textarea } from "~/components/ui/textarea"
import { toast } from "~/components/ui/use-toast"

import { PROJECT_TYPES } from "~/lib/constants"
import { iconMap } from "~/lib/constants"
import { cn } from "~/lib/utils"
import { Project } from "~/server/db/schema"
import { insertProjectSchema } from "~/server/db/schema"
import { api } from "~/trpc/react"

const formSchema = z.object({
  project_name: z
    .string()
    .min(2, {
      message: "Name is required",
    })
    .trim(),
  user_emails: z.array(z.string()),
})
type FormSchema = z.infer<typeof formSchema>
const defaultValues = {
  user_emails: [],
}
const SelectMembersForm = () => {
  const { getValues } = useFormContext<FormSchema>()
  const { append, remove } = useFieldArray({
    name: "user_emails",
  })
  const utils = api.useUtils()
  const { data: users } = api.admin.users.getAll.useQuery()
  const { user_emails: emailArray } = getValues()

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

const MembersForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const utils = api.useUtils()
  const createMember = api.admin.projects.createMember.useMutation({
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
      project_name: values.project_name,
      user_emails: values.user_emails,
    })
  }
  return (
    <div className="container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="project_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono">Project Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Coders for causes website" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

export default function AddMember() {
  return (
    <div className=" p-4 pt-0">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Members</Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-auto sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Add Members</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <MembersForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
