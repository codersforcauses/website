"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm, useFormContext } from "react-hook-form"
import * as simpleIcons from "simple-icons"
import { format } from "date-fns"
import * as z from "zod"

import { cn } from "~/lib/utils"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "~/components/ui/command"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Calendar } from "~/components/ui/calendar"
import { Badge } from "~/components/ui/badge"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required.",
  }),
  slug: z.string().min(2, {
    message: "Slug is required.",
  }),
  description: z.string().min(10, {
    message: "Description is required.",
  }),
  type: z.string().optional(),
  completion_date: z.date().optional(),
  source: z.string().optional(),
  link: z.string().optional(),
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
  members: z
    .array(
      z.object({
        value: z.string(),
      }),
    )
    .optional(),
})

type FormSchema = z.infer<typeof formSchema>

const defaultValues = {
  name: "",
  slug: "",
  description: "",
  type: "website",
  source: "",
  link: "",
  impact: [
    {
      value: "",
    },
  ],
  tech: [
    {
      label: "",
      value: "",
      path: "",
    },
  ],
  members: [
    {
      value: "",
    },
  ],
}

const ImpactForm = () => {
  const { control } = useFormContext()
  const { fields, append, remove, swap, move } = useFieldArray({
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
  typeof simpleIcons === "object" && simpleIcons !== null
    ? Object.values(simpleIcons).map(({ title, slug, path }) => ({
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
                Select technologies
                <span className="material-symbols-sharp ml-2 h-6 w-6 shrink-0 opacity-50">unfold_more</span>
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput placeholder="Search technologies..." />
              <CommandEmpty>Technology not found.</CommandEmpty>
              <CommandGroup className="max-h-52 overflow-y-scroll">
                {icons.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.label}
                    onSelect={() => {
                      if (!tech.some(({ value }) => value === item.value)) append(item)
                    }}
                  >
                    <span
                      className={cn(
                        "material-symbols-sharp mr-2 h-6 w-6",
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
          tech.length > 1 &&
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

  const { tech: techArray } = getValues()
  const tech = Array.isArray(techArray) ? techArray.filter(({ value }) => Boolean(value)) : []

  return (
    <div className="space-y-1.5">
      <FormItem className="flex flex-col">
        <FormLabel className="font-mono">Members</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button variant="outline" role="combobox" className="w-full justify-between">
                Select technologies
                <span className="material-symbols-sharp ml-2 h-6 w-6 shrink-0 opacity-50">unfold_more</span>
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput placeholder="Search technologies..." />
              <CommandEmpty>Technology not found.</CommandEmpty>
              <CommandGroup className="max-h-52 overflow-y-scroll">
                {icons.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.label}
                    onSelect={() => {
                      if (!tech.some(({ value }) => value === item.value)) append(item)
                    }}
                  >
                    <span
                      className={cn(
                        "material-symbols-sharp mr-2 h-6 w-6",
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
          tech.length > 1 &&
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

export default function Register() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = (values: FormSchema) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <main className="main">
      <div className="container py-8">
        <h1>Create project</h1>
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
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">Project slug</FormLabel>
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
                          <RadioGroupItem value="app" />
                        </FormControl>
                        <FormLabel className="font-normal">Mobile application</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="website" />
                        </FormControl>
                        <FormLabel className="font-normal">Website</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="webapp" />
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
              name="completion_date"
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
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">Source code</FormLabel>
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
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">Project link</FormLabel>
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
    </main>
  )
}
