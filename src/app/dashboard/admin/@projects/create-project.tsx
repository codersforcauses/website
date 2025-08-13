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

// const insertProjectSchema = createInsertSchema(Project, {
//   start_date: z.date().optional(),
// })
const TypeEnum = z.enum(PROJECT_TYPES)
const formSchema = insertProjectSchema.extend({
  name: z.string().min(2, {
    message: "Name is required. Minimum 2 characters.",
  }),
  client: z.string().min(2, {
    message: "Client is required. Minimum 2 characters.",
  }),
  logo_path: z.string().min(2, {
    message: "Logo is required. Minimum 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description is required. Minimum 10 characters.",
  }),
  img_path: z.string().optional(),
  type: TypeEnum.default("Website"),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  github_url: z.string().optional(),
  website_url: z.string().optional(),
  impact: z
    .array(
      z.object({
        value: z.string(),
      }),
    )
    .optional(),
  tech: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        path: z.string(),
      }),
    )
    .optional(),
  is_application_open: z.boolean().optional(),
  is_public: z.boolean().optional(),
})
type ProjectType = z.infer<typeof TypeEnum>
type FormSchema = z.infer<typeof formSchema>
const defaultValues: {
  logo_path: string
  img_path?: string
  name: string
  client: string
  type: ProjectType
  start_date?: Date | undefined
  end_date?: Date | undefined
  github_url?: string
  website_url?: string
  description: string
  impact: { value: string }[]
  tech: { label: string; value: string; path: string }[]
  is_application_open: boolean
  is_public: boolean
} = {
  logo_path: "", // logo_path url.
  name: "",
  client: "",
  type: "Website",
  description: "",
  impact: [
    {
      value: "",
    },
  ],
  tech: [],
  is_application_open: false,
  is_public: false,
}

const ImpactForm = () => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: "impact",
  })

  return (
    <fieldset className="space-y-1.5">
      <legend className="font-mono text-sm font-medium leading-none">Potential impact</legend>
      <ul className="flex flex-col gap-y-1.5">
        {fields.map((item, index) => (
          <li key={item.id} className="flex gap-2">
            <FormField
              control={control}
              name={`impact.${index}.value`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input
                      {...field}
                      className="!m-0" // removes margin from space in FormItem
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {index < fields.length - 1 ? (
              <Button
                type="button"
                aria-label="Remove item"
                size="icon"
                variant="secondary"
                onClick={() => remove(index)}
              >
                <span className="material-symbols-sharp">remove</span>
              </Button>
            ) : (
              <Button
                type="button"
                aria-label="Add item"
                size="icon"
                variant="secondary"
                onClick={() => append({ value: "" })}
              >
                <span className="material-symbols-sharp">add</span>
              </Button>
            )}
          </li>
        ))}
      </ul>
    </fieldset>
  )
}

const icons =
  typeof SimpleIcons === "object" && SimpleIcons !== null
    ? (Object.values(SimpleIcons) as SimpleIcon[]).map(({ title, slug, path }) => ({
        label: title,
        value: slug,
        path,
      }))
    : []

const TechForm = () => {
  const { getValues } = useFormContext<FormSchema>()
  const { append, remove } = useFieldArray({
    name: "tech",
  })

  const { tech: techArray } = getValues()
  const tech = Array.isArray(techArray) ? techArray.filter(({ value }) => Boolean(value)) : []

  return (
    <div className="space-y-1.5">
      <FormItem className="flex flex-col">
        <FormLabel className="font-mono">Technologies used</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button variant="outline" role="combobox" className="w-full justify-between">
                Select tech
                <span className="material-symbols-sharp ml-2 h-6 w-6 shrink-0 opacity-50">unfold_more</span>
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput placeholder="Search technologies..." />
              <CommandEmpty>Technology not found.</CommandEmpty>
              <CommandGroup className="max-h-52 overflow-y-scroll">
                {Object.values(iconMap).map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.label}
                    onSelect={() => {
                      if (!tech.some(({ value }) => value === item.value))
                        append({ label: item.label, value: item.value, path: item.path })
                    }}
                  >
                    <span
                      className={cn(
                        "material-symbols-sharp mr-2 h-6 w-6 text-black",
                        tech.some(({ value }) => value === item.value) ? "opacity-100" : "opacity-0",
                      )}
                    >
                      check
                    </span>
                    <svg aria-hidden viewBox="0 0 24 24" width={24} height={24} className="mr-2 fill-current">
                      <path d={item.path} />
                    </svg>
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
      <ul className="flex flex-wrap gap-1.5">
        {Array.isArray(tech) &&
          tech.map((item, index) => (
            <li key={item.value} className="flex">
              <Badge variant="secondary" className="select-none">
                <svg aria-hidden viewBox="0 0 24 24" width={20} height={20} className="mr-2 fill-current">
                  <path d={item.path} />
                </svg>
                {item.label}
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

function CreateProjectForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })
  const utils = api.useUtils()
  const createProject = api.admin.projects.create.useMutation({
    onSuccess: async () => {
      toast({
        title: "Project created successfully",
        description: "Your project has been created and is now available.",
      })
      await utils.admin.projects.invalidate()
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to create project",
        description: "An error occurred while trying to update your personal details. Please try again later.",
      })
    },
  })
  const onSubmit = (values: FormSchema) => {
    // TODO: something with the form values.
    // ✅ This will be type-safe and validated.
    createProject.mutate({
      name: values.name,
      client: values.client,
      type: values.type,
      start_date: values.start_date ? values.start_date : undefined,
      end_date: values.end_date ? values.end_date : undefined,
      github_url: values.github_url,
      website_url: values.website_url,
      description: values.description,
      impact: values.impact?.map((item) => item.value),
      tech: values.tech?.map((item) => ({
        label: item.label,
        value: item.value,
        path: item.path,
      })),
      is_application_open: values.is_application_open,
      is_public: values.is_public,
      logo_path: values.logo_path.trim(),
      img_path: values.img_path?.trim(),
    })

    console.log(values)
  }

  return (
    <div className="container ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Coders for causes website" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono">Client</FormLabel>
                <FormControl>
                  <Input placeholder="cfc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono">Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="A website for cfc members to register" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono">Project type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Mobile application" />
                      </FormControl>
                      <FormLabel className="font-normal">Mobile application</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Website" />
                      </FormControl>
                      <FormLabel className="font-normal">Website</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Progressive Web App (PWA)" />
                      </FormControl>
                      <FormLabel className="font-normal">Progressive Web App (PWA)</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo_path"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono">Logo path</FormLabel>
                <FormControl>
                  <Input placeholder="Coders for causes website" {...field} />
                </FormControl>
                <FormDescription>
                  Logo path in the server. Please make sure you have uploaded the image in the repo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="img_path"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono">Image path</FormLabel>
                <FormControl>
                  <Input placeholder="Coders for causes website" {...field} />
                </FormControl>
                <FormDescription>
                  Image path in the server. Please make sure you have uploaded the image in the repo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono">Expected start date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <span className="material-symbols-sharp ml-auto h-6 w-6 opacity-50">date_range</span>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("2020-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono">Expected completion date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <span className="material-symbols-sharp ml-auto h-6 w-6 opacity-50">date_range</span>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("2020-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="github_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono">Source code link</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://github.com/codersforcauses" {...field} />
                </FormControl>
                <FormDescription>Link to source code</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono">Project website link</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://codersforcauses.org" {...field} />
                </FormControl>
                <FormDescription>Link to project website/app</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <ImpactForm />
          <TechForm />
          <FormField
            control={form.control}
            name="is_application_open"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormLabel className="font-mono">Applications open?</FormLabel>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormDescription>Start taking applications</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_public"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormLabel className="font-mono">Make this project public?</FormLabel>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormDescription>Public means everyone can see it</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row-reverse justify-between">
            <Button type="submit" size="lg">
              Submit
            </Button>
            <Button variant="ghost" type="button">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default function CreateProject() {
  return (
    <div className="w-full p-4 pt-0">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create New Project</Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-auto sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              <CreateProjectForm />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
