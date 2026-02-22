import { TRPCError } from "@trpc/server"
import slugify from "@sindresorhus/slugify"
import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { generalMeetings, positions as positionsTable, questions as questionsTable } from "~/server/db/schema"
import { DEFAULT_POSITIONS, DEFAULT_QUESTIONS } from "~/lib/defaults"

const today = new Date()

/**
 * Creates a new general meeting, optionally seeding default positions and questions.
 * @returns {Promise<Object>} - The created general meeting record
 * @throws {TRPCError} - If user is not logged in or does not have admin privileges
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
      .refine((data) => !data.end_date || data.end_date > data.start_date, {
        error: "End date and time must be after start date and time",
        path: ["end_date"],
      }),
  )
  .mutation(async ({ ctx, input }) => {
    const { title, start_date, end_date, venue, positions, questions } = input

    const slug = slugify(title)

    const [meeting] = await ctx.db
      .insert(generalMeetings)
      .values({
        slug,
        title,
        start: start_date,
        end: end_date,
        venue,
        createdBy: ctx.session.user.id,
      })
      .returning()

    if (!meeting) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create meeting" })
    }

    if (positions) {
      await ctx.db.insert(positionsTable).values(
        DEFAULT_POSITIONS.map((pos, i) => ({
          ...pos,
          meetingId: meeting.id,
          priority: i,
        })),
      )
    }

    if (questions) {
      await ctx.db.insert(questionsTable).values(
        DEFAULT_QUESTIONS.map((q, i) => ({
          ...q,
          type: q.type as "short" | "long" | "checkbox",
          meetingId: meeting.id,
          order: i,
        })),
      )
    }

    return meeting
  })

export default createMeeting
