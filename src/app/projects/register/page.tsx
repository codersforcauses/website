"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import TitleText from "~/app/_components/title-text"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"

const formSchema = z.object({
  type: z.string(),
  experience: z.string().min(2, {
    message: "Name is required.",
  }),
  interest: z.string().optional(),
  attending: z.string(),
  availability: z.string(),
  other_info: z.string().optional(),
})

type FormSchema = z.infer<typeof formSchema>

const dates = {
  applyBy: "27th of October",
  programStart: "16th of November 2024",
  programEnd: "15th of February 2025",
  breakStart: "18th of December 2024",
  breakEnd: "1st of January 2025",
}

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
      <TitleText typed>./project_application</TitleText>
      <div className="container py-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
            <div className="space-y-2 pb-2">
              <h1 className="font-mono text-xl font-bold">Coders for Causes Summer 2024/25 Project Application</h1>
              <Alert>
                <span className="material-symbols-sharp size-4 text-xl leading-4">info</span>
                <AlertTitle>Important Dates</AlertTitle>
                <AlertDescription>
                  <p>The last day to apply for a project is {dates.applyBy} at 11:59pm.</p>
                  <p>
                    The program will run from {dates.programStart} to {dates.programEnd} with a Christmas break in
                    between.
                  </p>
                  <p>
                    The Christmas break will run from {dates.breakStart} to {dates.breakEnd}.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">
                    Are you applying for our charity projects or our beginner-friendly project?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="charity" />
                        </FormControl>
                        <FormLabel className="font-normal">Charity/NFP</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="beginner" />
                        </FormControl>
                        <FormLabel className="font-normal">Beginner</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="both" />
                        </FormControl>
                        <FormLabel className="font-normal">Both</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
