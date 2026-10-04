import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import * as z from "zod"

import { MEETING_QUESTION_TYPE } from "~/lib/constants"

const { fieldContext, formContext, useFieldContext } = createFormHookContexts()

const { useAppForm, withFieldGroup } = createFormHook({
  fieldComponents: {},
  formComponents: {},
  fieldContext,
  formContext,
})

const formSchema = z.object({
  questions: z.array(
    z.object({
      id: z.uuidv7(),
      text: z.string().min(1, "Question text is required"),
      type: z.enum(MEETING_QUESTION_TYPE),
      required: z.boolean(),
    }),
  ),
})

export { useFieldContext, useAppForm, withFieldGroup, formSchema }
