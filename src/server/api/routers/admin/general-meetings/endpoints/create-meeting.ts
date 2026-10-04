import { like } from "drizzle-orm"
import * as z from "zod"
import slugify from "@sindresorhus/slugify"
import { TRPCError } from "@trpc/server"

import { retrieveSuggestion, retrieveSuggestionFromID } from "~/lib/mapbox"
import { DEFAULT_POSITIONS, DEFAULT_QUESTIONS } from "~/lib/defaults"
import { adminProcedure } from "~/server/api/trpc"
import { generalMeetings } from "~/server/db/schema"
import { createPositions, createQuestions } from "../sub-routes/util/create"

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
        positions: z.boolean().default(true),
        questions: z.boolean().default(true),
      })
      .refine((data) => data.endDate && data.endDate > data.startDate, {
        error: "End date and time must be after start date and time",
        path: ["endDate"],
      }),
  )
  .mutation(async ({ ctx, input }) => {
    let mapboxData: z.infer<typeof retrieveSuggestion>["features"][number] | undefined
    const { title, startDate, endDate, room, venue, venueID, positions, questions } = input

    const slug = slugify(title)
    // check if slug exists since it has to be unique
    const checkSlug = await ctx.db.$count(generalMeetings, like(generalMeetings.slug, `${slug}%`))

    // Save the mapbox data to save on mapbox query tokens
    if (venueID) {
      try {
        mapboxData = await retrieveSuggestionFromID({
          userID: ctx.session.user.id,
          mapboxID: venueID,
        })
      } catch (error) {
        console.log(error)
      }
    }

    const [meeting] = await ctx.db
      .insert(generalMeetings)
      .values({
        title,
        slug: checkSlug > 0 ? `${slug}-${checkSlug}` : slug,
        start: startDate,
        end: endDate,
        room,
        venue: mapboxData,
        venueFallback: !mapboxData?.hasOwnProperty("geometry") ? venue : null,
        createdBy: ctx.session.user.id,
      })
      .returning()

    if (!meeting) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create meeting" })
    }

    let _positions, _questions
    if (positions) {
      _positions = createPositions({
        meetingId: meeting.id,
        positions: DEFAULT_POSITIONS.map((pos, i) => ({
          ...pos,
          priority: i,
        })),
      })
    }
    if (questions) {
      _questions = createQuestions({
        meetingId: meeting.id,
        questions: DEFAULT_QUESTIONS.map((ques, i) => ({
          ...ques,
          order: i,
        })),
      })
    }
    await Promise.allSettled([_positions, _questions])

    return meeting
  })

export default createMeeting
