import { and, eq, like, ne } from "drizzle-orm"
import * as z from "zod"
import slugify from "@sindresorhus/slugify"
import { TRPCError } from "@trpc/server"

import { retrieveSuggestion, retrieveSuggestionFromID } from "~/lib/mapbox"
import { adminProcedure } from "~/server/api/trpc"
import { generalMeetings } from "~/server/db/schema"

const today = new Date()

/**
 * Creates a new general meeting
 * @param {number} - Number of months to query: 1, 3, 6, 12, and 0 where 0 is all time
 * @returns {Promise<Object>} - Object returning general meeting details
 * @throws {TRPCError} - If user is not logged in, does not have admin privileges, or the db operation fails
 */
const updateMeeting = adminProcedure
  .input(
    z.object({
      meetingId: z.uuidv7(),
      data: z
        .object({
          slug: z.string().min(1, "Meeting slug is required"),
          title: z
            .string()
            .min(1, "Meeting title is required")
            .max(256, "Meeting title must be less than 256 characters"),
          startDate: z
            .date()
            .min(today, "Date is required")
            .max(new Date(new Date().setFullYear(today.getFullYear() + 5)), "Date must be within the next five years"),
          endDate: z
            .date()
            .min(today, "Date is required")
            .max(new Date(new Date().setFullYear(today.getFullYear() + 5)), "Date must be within the next five years")
            .optional(),
          venue: z.string().optional(),
          venueID: z.string().optional(),
          room: z.string().optional(),
        })
        .refine((data) => data.endDate && data.endDate > data.startDate, {
          error: "End date and time must be after start date and time",
          path: ["endDate"],
        }),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    let mapboxData: z.infer<typeof retrieveSuggestion>["features"][number] | undefined
    const { data, meetingId } = input

    const slug = slugify(data.title)
    // check if slug exists since it has to be unique
    const checkSlug = await ctx.db.$count(
      generalMeetings,
      and(like(generalMeetings.slug, `${slug}%`), ne(generalMeetings.id, meetingId)),
    )

    // Save the mapbox data to save on mapbox query tokens
    if (data.venueID) {
      try {
        mapboxData = await retrieveSuggestionFromID({
          userID: ctx.session.user.id,
          mapboxID: data.venueID,
        })
      } catch (error) {
        console.log(error)
      }
    }

    const newSlug = slug !== data.slug && checkSlug > 0 ? `${slug}-${checkSlug}` : slug

    const [meeting] = await ctx.db
      .update(generalMeetings)
      .set({
        title: data.title,
        slug: newSlug,
        start: data.startDate,
        end: data.endDate,
        room: data.room,
        venue: mapboxData,
        venueFallback: !mapboxData?.hasOwnProperty("geometry") ? data.venue : null,
      })
      .where(eq(generalMeetings.id, meetingId))
      .returning()

    if (!meeting)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update user",
      })

    return meeting
  })

export default updateMeeting
