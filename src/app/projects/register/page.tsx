"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "~/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Textarea } from "~/components/ui/textarea"

const formSchema = z.object({
  experience: z.string().min(2, {
    message: "Name is required.",
  }),
  interest: z.string().optional(),
  attending: z.string(),
  availability: z.string(),
  other_info: z.string().optional(),
})

type FormSchema = z.infer<typeof formSchema>

export default function Register() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experience: "",
      interest: "",
      attending: "",
      other_info: "",
    },
  })

  const onSubmit = (values: FormSchema) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <main className="main">
      <div className="container">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl space-y-4">
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">Describe your technical experience</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your answer" {...field} />
                  </FormControl>
                  <FormDescription>
                    Feel free to add in links to website(s) and/or repositories if it helps explain some of the tech
                    you&apos;ve used
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">Why do you want to be part of the projects?</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your answer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attending"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">Are you able to attend the project sessions in person?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="font-normal">Other</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>Project sessions will be held on Saturdays at UWA around 11am - 4pm</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">What is your rough weekly availability?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Less than 3 hours</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">3 - 5 hours</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="font-normal">5 - 7 hours</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="font-normal">7 - 10 hours</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="font-normal">10 - 15 hours</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="font-normal">15+ hours</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Includes in-person project sessions (~4hrs) and online meetings (~30 mins)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="other_info"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">Anything else that you&apos;d like us to know?</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your answer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row-reverse justify-between">
              <Button type="submit">Submit</Button>
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
