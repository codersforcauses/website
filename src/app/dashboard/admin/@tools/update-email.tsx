"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { toast } from "~/components/ui/use-toast"

import { api } from "~/trpc/react"

const formSchema = z.object({
  userId: z.string(),
  oldEmail: z.string().email(),
  newEmail: z.string().email(),
})

type FormSchema = z.infer<typeof formSchema>

const defaultValues: FormSchema = {
  userId: "",
  oldEmail: "",
  newEmail: "",
}

const UpdateEmail = () => {
  return (
    <div className="col-span-2 border bg-card text-card-foreground">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <h3 className="text-sm font-medium tracking-tight">Update Email</h3>
      </div>
      <div className="w-full p-6 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open form</Button>
          </DialogTrigger>
          <DialogContent className="max-h-screen overflow-auto sm:max-w-5xl">
            <DialogHeader>
              <DialogTitle>Update user email</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <UpdateEmailForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

const UpdateEmailForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })
  const { isLoading, mutate: updateEmailAdmin } = api.admin.users.updateEmail.useMutation({
    onSuccess: () => {
      toast({
        title: "Email updated",
        description: "Email has been updated",
      })
    },
    onError: (error) => {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Failed to update email",
        description: error.message,
      })
    },
  })

  const onSubmit = async (values: FormSchema) => {
    updateEmailAdmin(values)
  }

  return (
    <Form {...form}>
      <form className="flex flex-col flex-wrap gap-4 text-left" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex space-x-1 font-mono">
                <p>User ID</p>
                <p className="font-sans">*</p>
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="oldEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex space-x-1 font-mono">
                <p>Old email address</p>
                <p className="font-sans">*</p>
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@codersforcauses.org" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex space-x-1 font-mono">
                <p>New email address</p>
                <p className="font-sans">*</p>
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@codersforcauses.org" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Please wait" : "Submit"}
          {isLoading && <span className="material-symbols-sharp ml-2 animate-spin">progress_activity</span>}
        </Button>
      </form>
    </Form>
  )
}

export default UpdateEmail
