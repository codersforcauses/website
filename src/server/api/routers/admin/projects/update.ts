import { and, eq, ne } from "drizzle-orm"
import { z } from "zod"

import { PROJECT_ICONS, PROJECT_TYPES } from "~/lib/constants"
import { adminProcedure } from "~/server/api/trpc"
import { Project } from "~/server/db/schema"

type ProjectIcon = (typeof PROJECT_ICONS)[number]

export const update = adminProcedure
  .input(
    z.object({
      logo_path: z
        .string()
        .min(2, {
          message: "Project logo_path url is required",
        })
        .trim()
        .optional(),
      img_path: z
        .string()
        .min(2, {
          message: "Project image url is required",
        })
        .trim()
        .optional(),

      name: z
        .string()
        .min(2, {
          message: "Name is required",
        })
        .trim(),
      client: z
        .string()
        .min(2, {
          message: "Client name is required",
        })
        .trim()
        .optional(),
      type: z.enum(PROJECT_TYPES),
      start_date: z.date().optional(),
      end_date: z.date().optional(),
      website_url: z.string().trim().optional(),
      github_url: z.string().trim().optional(),
      description: z.string().trim().optional(),
      tech: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
            path: z.string(),
          }),
        )
        .optional(),
      impact: z
        .array(
          z.object({
            value: z.string(),
          }),
        )
        .optional(),
      members: z.string().array().optional(),
      is_application_open: z.boolean().default(false).optional(),
      application_url: z.string().trim().optional().nullable(),
      is_public: z.boolean().default(false).optional(),
      id: z.string().trim(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const project_data = await ctx.db.query.Project.findFirst({
      where: and(eq(Project.name, input.name), ne(Project.id, input.id)),
    })
    if (project_data) throw new Error(`Project ${input.name} already exist`)
    let icon: ProjectIcon = "devices" // default "devices"
    if (input.type === "Mobile application") {
      icon = "mobile"
    } else if (input.type === "Website") {
      icon = "computer"
    }

    const [project] = await ctx.db
      .update(Project)
      .set({
        name: input.name,
        icon: icon,
        logo_path: input.logo_path?.trim(),
        img_path: input.img_path?.trim(),
        client: input.client?.trim(),
        type: input.type,
        start_date: input.start_date,
        end_date: input.end_date,
        website_url: input.website_url?.trim() ?? null,
        github_url: input.github_url?.trim() ?? null,
        description: input.description?.trim(),
        tech: input.tech,
        impact: input.impact,
        members: input.members,
        is_application_open: input.is_application_open ?? false,
        application_url: input.application_url?.trim() ?? null,
        is_public: input.is_public ?? false,
      })
      .where(eq(Project.name, input.name))
      .returning()

    return project
  })
