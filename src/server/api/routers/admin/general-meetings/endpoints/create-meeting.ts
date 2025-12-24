import { z } from "zod"
import slugify from "@sindresorhus/slugify"

import { adminProcedure } from "~/server/api/trpc"
import { users } from "~/server/db/schema"

const today = new Date()

/**
 * Creates a new general meeting
 * @param {number} - Number of months to query: 1, 3, 6, 12, and 0 where 0 is all time
 * @returns {Promise<Object>} - Object returning general meeting details
 * @throws {TRPCError} - If user is not logged in, does not have admin privileges, or the db operation fails
 */
const createMeeting = adminProcedure
  .input(
    z
      .object({
        title: z
          .string()
          .min(1, "Meeting title is required")
          .max(256, "Meeting title must be less than 256 characters"),
        start_date: z
          .date()
          .min(today, "Date is required")
          .max(new Date(new Date().setFullYear(today.getFullYear() + 5)), "Date must be within the next five years"),
        end_date: z
          .date()
          .min(today, "Date is required")
          .max(new Date(new Date().setFullYear(today.getFullYear() + 5)), "Date must be within the next five years")
          .optional(),
        venue: z.string().min(1, "Venue is required"),
        positions: z.boolean().default(false),
        questions: z.boolean().default(false),
      })
      .refine((data) => data.end_date && data.end_date > data.start_date, {
        error: "End date and time must be after start date and time",
        path: ["end_date"],
      }),
  )
  .mutation(async ({ ctx, input }) => {
    const { title, start_date, end_date, venue, positions, questions } = input

    const slug = slugify(title)
  })

export default createMeeting
