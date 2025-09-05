import { eq } from "drizzle-orm"
import fs from "fs"
import path from "path"
import { z } from "zod"

import { PROJECT_ICONS, PROJECT_TYPES } from "~/lib/constants"
import { adminProcedure } from "~/server/api/trpc"
import { Project } from "~/server/db/schema"

type ProjectIcon = (typeof PROJECT_ICONS)[number]

export const create = adminProcedure
  .input(
    z.object({
      logo_path: z
        .string()
        .min(2, {
          message: "Project logo_path url is required",
        })
        .trim(),
      img_path: z.string().trim().optional(),
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
        .trim(),
      type: z.enum(PROJECT_TYPES),
      start_date: z.date().optional(),
      end_date: z.date().optional(),
      website_url: z.string().trim().optional(),
      github_url: z.string().trim().optional(),
      description: z.string().trim(),
      tech: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
            path: z.string(),
          }),
        )
        .optional(),
      members: z.string().array().optional(),
      impact: z
        .array(
          z.object({
            value: z.string(),
          }),
        )
        .optional(),
      is_application_open: z.boolean().default(false),
      application_url: z.string().trim().optional(),
      is_public: z.boolean().default(false),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const logoPath = path.join(process.cwd(), "public", input.logo_path)
    if (!fs.existsSync(logoPath)) {
      throw new Error(`Logo "${input.logo_path}" does not exist in "/public"`)
    }
    if (input.img_path) {
      const imgPath = path.join(process.cwd(), "public", input.img_path)
      if (!fs.existsSync(imgPath)) {
        throw new Error(`Image "${input.img_path}" does not exist in "/public"`)
      }
    }
    const project_data = await ctx.db.query.Project.findFirst({
      where: eq(Project.name, input.name),
    })
    if (project_data) throw new Error(`Project ${input.name} already exists.`)
    let icon: ProjectIcon = "devices" // default "devices"
    if (input.type === "Mobile application") {
      icon = "mobile"
    } else if (input.type === "Website") {
      icon = "computer"
    }

    const [project] = await ctx.db
      .insert(Project)
      .values({
        icon: icon,
        logo_path: input.logo_path,
        img_path: input.img_path,
        name: input.name,
        client: input.client,
        type: input.type,
        start_date: input.start_date,
        end_date: input.end_date,
        website_url: input.website_url,
        github_url: input.github_url,
        description: input.description,
        tech: input.tech,
        impact: input.impact,
        members: input.members,
        is_application_open: input.is_application_open,
        application_url: input.application_url,
        is_public: input.is_public,
      })
      .returning()

    return project
  })
