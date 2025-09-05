"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { track } from "@vercel/analytics/react"
import { format } from "date-fns"
import { useFieldArray, useForm, useFormContext } from "react-hook-form"
import * as z from "zod"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import { Checkbox } from "~/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "~/components/ui/command"
import { DialogClose } from "~/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Textarea } from "~/components/ui/textarea"
import { toast } from "~/components/ui/use-toast"

import { PROJECT_TYPES } from "~/lib/constants"
import { iconMap } from "~/lib/constants"
import { cn } from "~/lib/utils"
import { insertProjectSchema } from "~/server/db/schema"
import { api } from "~/trpc/react"

import DeleteProject from "./delete"
import PreviewProject from "./preview"

const TypeEnum = z.enum(PROJECT_TYPES)
const formSchema = insertProjectSchema
  .extend({
    name: z.string().min(2, {
      message: "Name is required. Minimum 2 characters.",
    }),
    client: z.string().min(2, {
      message: "Client is required. Minimum 2 characters.",
    }),
    logo_path: z.string().regex(/^\/.*/, "Path must start with '/'").min(2, {
      message: "Logo is required. Minimum 2 characters.",
    }),
    description: z.string().min(10, {
      message: "Description is required. Minimum 10 characters.",
    }),
    img_path: z.string().regex(/^\/.*/, "Path must start with '/'").optional(),
    type: TypeEnum.default("Progressive Web App (PWA)"),
    start_date: z.date().optional(),
    end_date: z.date().optional(),
    github_url: z.string().optional(),
    website_url: z.string().optional(),
    application_url: z.string().optional(),
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
    members: z.string().array().optional(),
    is_application_open: z.boolean(),
    is_public: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.start_date && data.end_date) {
        return data.end_date > data.start_date
      }
      return true
    },
    {
      message: "End date must be after start date",
      path: ["end_date"],
    },
  )
export type ProjectType = z.infer<typeof TypeEnum>
export type defaultValueType = {
  logo_path: string
  img_path?: string | undefined
  name: string
  client: string
  type: ProjectType
  start_date?: Date | undefined
  end_date?: Date | undefined
  github_url?: string
  website_url?: string
  description: string
  impact?: { value: string }[]
  members?: string[]
  tech?: { label: string; value: string; path: string }[]
  is_application_open: boolean
  application_url?: string
  is_public: boolean
  id?: string
}
type FormSchema = z.infer<typeof formSchema>
const defaultValues: defaultValueType = {
  logo_path: "", // logo_path url.
  name: "",
  client: "",
  type: "Progressive Web App (PWA)",
  description: "",
  impact: [
    {
      value: "",
    },
  ],
  members: [],
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
        <Popover modal={true}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button variant="outline" role="combobox" className="w-full justify-between">
                Select tech
                <span className="material-symbols-sharp ml-2 h-6 w-6 shrink-0 opacity-50">unfold_more</span>
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0 ">
            <Command>
              <CommandInput placeholder="Search technologies..." />
              <CommandEmpty>Technology not found.</CommandEmpty>
              <CommandGroup>
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
                        "material-symbols-sharp mr-2 h-6 w-6 text-primary",
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
const MembersForm = () => {
  const { getValues } = useFormContext<FormSchema>()
  const { append, remove } = useFieldArray({
    name: "members",
  })

  const { data: users } = api.admin.users.getAll.useQuery()
  const { members: emailArray = [] } = getValues()

  return (
    <div className="space-y-1.5">
      <FormItem className="flex flex-col">
        <FormLabel className="font-mono">Members</FormLabel>
        <Popover modal={true}>
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
              <CommandGroup>
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
                        "material-symbols-sharp mr-2 h-6 w-6 text-primary",
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

type ProjectFormProps = {
  formDefaultValues?: defaultValueType
  isNew?: boolean //create new project or update project
}

export default function ProjectForm({
  formDefaultValues = defaultValues, // default empty
  isNew = true, // default false
}: ProjectFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
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
    onError: (error) => {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Failed to create project",
        description: error.message,
      })
    },
  })
  const updateProject = api.admin.projects.update.useMutation({
    onSuccess: async () => {
      toast({
        title: "Project updated successfully",
        description: "Your project has been updated and is now available.",
      })
      await utils.admin.projects.invalidate()
    },
    onError: (error) => {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Failed to update project",
        description: error.message,
      })
    },
  })
  const onSubmit = (values: FormSchema) => {
    if (isNew) {
      createProject.mutate({
        name: values.name,
        client: values.client,
        type: values.type,
        start_date: values.start_date ? values.start_date : undefined,
        end_date: values.end_date ? values.end_date : undefined,
        github_url: values.github_url,
        website_url: values.website_url,
        application_url: values.application_url ?? "",
        description: values.description,
        impact: values.impact,
        tech: values.tech?.map((item) => ({
          label: item.label,
          value: item.value,
          path: item.path,
        })),
        members: values.members,
        is_application_open: values.is_application_open,
        is_public: values.is_public,
        logo_path: values.logo_path.trim(),
        img_path: values.img_path?.trim(),
      })
    } else {
      updateProject.mutate({
        name: values.name,
        client: values.client,
        type: values.type,
        start_date: values.start_date ? values.start_date : undefined,
        end_date: values.end_date ? values.end_date : undefined,
        github_url: values.github_url,
        website_url: values.website_url,
        application_url: values.application_url ?? "",
        description: values.description,
        impact: values.impact ?? undefined,
        tech: values.tech ?? undefined,
        members: values.members,
        is_application_open: values.is_application_open,
        is_public: values.is_public,
        logo_path: values.logo_path.trim(),
        img_path: values.img_path?.trim(),
        id: formDefaultValues.id ?? "",
      })
    }
  }

  return (
    <div className="container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono">Name *</FormLabel>
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
                <FormLabel className="font-mono">Client *</FormLabel>
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
                <FormLabel className="font-mono">Description *</FormLabel>
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
                <FormLabel className="font-mono">Project type *</FormLabel>
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
                <FormLabel className="font-mono">Logo path *</FormLabel>
                <FormControl>
                  <Input placeholder="/client/xxxx.svg" {...field} />
                </FormControl>
                <FormDescription>
                  Logo path in the server usually start with `/client`. Please make sure you have uploaded the image in
                  the repo.
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
                  <Input placeholder="/projects/xxxx.svg" {...field} />
                </FormControl>
                <FormDescription>
                  Image path in the server usually start with `/projects`. Please make sure you have uploaded the image
                  in the repo.
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
                <FormLabel className="font-mono">Source</FormLabel>
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
                <FormLabel className="font-mono">Website</FormLabel>
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
          <MembersForm />
          <FormField
            control={form.control}
            name="is_application_open"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormLabel className="font-mono">Applications open?</FormLabel>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormDescription>Taking applications</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="application_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono">Application form link</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://docs.google.com/forms" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
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
                <FormDescription>Means everyone can see it</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row-reverse justify-between">
            <Button type="submit" size="lg">
              Submit
            </Button>
            {!isNew && formDefaultValues.name != "" && (
              <>
                <DeleteProject name={formDefaultValues.name} />
                <PreviewProject data={form.getValues()} />
              </>
            )}
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
