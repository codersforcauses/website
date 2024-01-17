"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { CollapsibleContent } from "~/components/ui/collapsible"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required.",
  }),
  org_name: z.string().optional(),
  email: z
    .string()
    .email({
      message: "Email is invalid.",
    })
    .min(2, {
      message: "Email is required.",
    }),
  message: z.string().min(10, {
    message: "Message is required.",
  }),
})

type FormSchema = z.infer<typeof formSchema>

const Contact = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      org_name: "",
      email: "",
      message: "",
    },
  })

  const onSubmit = (values: FormSchema) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <CollapsibleContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem dark>
                <FormLabel className="font-mono">Name</FormLabel>
                <FormControl>
                  <Input dark placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="org_name"
            render={({ field }) => (
              <FormItem dark>
                <FormLabel className="font-mono">
                  Organization name&nbsp;
                  <span className="opacity-50">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input dark placeholder="Coders for causes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem dark>
                <FormLabel className="font-mono">Email</FormLabel>
                <FormControl>
                  <Input dark placeholder="hello@codersforcauses.org" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem dark>
                <FormLabel className="font-mono">Message</FormLabel>
                <FormControl>
                  <Textarea dark placeholder="Write a short message here to get things started" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row-reverse justify-between">
            <Button variant="dark" type="submit">
              Submit
            </Button>
            <Button variant="ghost-dark" type="button">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </CollapsibleContent>
  )
}

export default Contact
