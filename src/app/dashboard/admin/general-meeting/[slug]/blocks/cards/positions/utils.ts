import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import * as z from "zod"

const { fieldContext, formContext, useFieldContext } = createFormHookContexts()

const { useAppForm, withFieldGroup } = createFormHook({
  fieldComponents: {},
  formComponents: {},
  fieldContext,
  formContext,
})

const formSchema = z.object({
  positions: z.array(
    z.object({
      id: z.uuidv7(),
      title: z.string().min(1, "Position title is required"),
      openings: z.number().min(1, "There must be at least one opening"),
      description: z.string(),
    }),
  ),
})

export { useFieldContext, useAppForm, withFieldGroup, formSchema }
