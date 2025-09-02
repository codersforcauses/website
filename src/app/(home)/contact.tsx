"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "~/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { toast } from "~/components/ui/use-toast"

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

const defaultValues: FormSchema = {
  name: "",
  org_name: "",
  email: "",
  message: "",
}

const Contact = () => {
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  React.useEffect(() => {
    if (open) {
      form.setFocus("name")
    }
  }, [form, open])

  const close = React.useCallback(() => {
    setOpen(false)
    form.reset()
  }, [form])

  const onSubmit = async (values: FormSchema) => {
    try {
      setLoading(true)
      const response = await fetch("https://formspree.io/mrgyryzj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(values),
      })
      if (response.status === 200) {
        form.reset()
        setOpen(false)
        toast({
          title: "We've received your message",
          description: "Your query has been submitted to us, we will get back to you as soon as we can.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: "Your message was unable to be sent, please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {!open && (
        <CollapsibleTrigger asChild>
          <Button variant="outline-dark" className="text-md" size="lg">
            Contact us
          </Button>
        </CollapsibleTrigger>
      )}
      <AnimatePresence>
        <CollapsibleContent asChild forceMount>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
                height: 0,
              }}
              animate={{
                opacity: 1,
                y: 0,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: 0,
              }}
            >
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
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="dark" disabled={loading} type="submit" className="relative order-1">
                      {loading ? "Sending" : "Send"}
                      {loading && (
                        <span className="material-symbols-sharp absolute right-4 animate-spin">progress_activity</span>
                      )}
                    </Button>
                    <Button variant="ghost-dark" disabled={loading} type="button" className="order-0" onClick={close}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          )}
        </CollapsibleContent>
      </AnimatePresence>
    </Collapsible>
  )
}

export default Contact
