import { TRPCError } from "@trpc/server"
import slugify from "@sindresorhus/slugify"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { generalMeetings } from "~/server/db/schema"

/**
 * Updates a general meeting. Regenerates the slug if the title changes.
 * @param {string} id - The ID of the meeting to update
 * @throws {TRPCError} - If user is not an admin or the meeting is not found
 */
const updateMeeting = adminProcedure
  .input(
    z
      .object({
        id: z.uuidv7(),
        title: z.string().min(1).max(256).optional(),
        start_date: z.date().optional(),
        end_date: z.date().nullable().optional(),
        venue: z.string().min(1).max(512).nullable().optional(),
        agenda: z.string().nullable().optional(),
        status: z.enum(["upcoming", "ongoing", "completed", "cancelled"]).optional(),
      })
      .refine(
        (data) => {
          if (data.start_date && data.end_date) return data.end_date > data.start_date
          return true
        },
        { error: "End date must be after start date", path: ["end_date"] },
      ),
  )
  .mutation(async ({ ctx, input }) => {
    const { id, title, start_date, end_date, ...rest } = input

    const updateData: Record<string, unknown> = { ...rest }
    if (title !== undefined) {
      updateData.title = title
      updateData.slug = slugify(title)
    }
    if (start_date !== undefined) updateData.start = start_date
    if (end_date !== undefined) updateData.end = end_date

    const [updated] = await ctx.db.update(generalMeetings).set(updateData).where(eq(generalMeetings.id, id)).returning()

    if (!updated) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Meeting not found" })
    }

    return updated
  })

export default updateMeeting
