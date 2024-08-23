import { z } from "zod"

export const syncUserEvent = z.object({
  name: z.literal("clerk/user.created"),
  data: z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    emailAddresses: z.array(z.object({ id: z.string(), emailAddress: z.string() })),
    primaryEmailAddressId: z.string(),
    unsafeMetadata: z.object({
      pronouns: z.string(),
      student_number: z.string(),
      university: z.string(),
      github: z.string(),
      discord: z.string(),
      subscribe: z.boolean(),
    }),
  }),
})
