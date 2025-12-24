// Run using bun in root directory
// save the csv for migration in the root directory and change the path accordingly
// !Run command: `bun run scripts/migrate.ts`

import fs from "node:fs/promises"
import { hashPassword } from "better-auth/crypto"
import { auth } from "../src/lib/auth"

type User = {
  id: string
  email: string
  name: string
  preferred_name: string
  pronouns: string
  student_number: string
  university: string
  github: string
  discord: string
  subscribe: boolean
  role: string
  square_customer_id: string
  created_at: Date
  updated_at: Date
}

const exportedUserCSV = "cfc-website_user.csv" // CSV file to read migrations from

async function getUserCSVData() {
  const csv = await fs.readFile(exportedUserCSV, "utf-8")
  const lines = csv.split("\n").filter((line) => line.trim())
  const headers = lines[0]?.split(",").map((header) => header.trim()) || []
  const jsonData = lines.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim())
    return headers.reduce(
      (obj, header, index) => {
        if (header === "pronouns") {
          obj[header] = values[index] || "they/them"
        } else if (header === "subscribe") {
          obj[header] = Boolean(values[index]) ?? true
        } else if (header === "created_at") {
          obj[header] = new Date(values[index])
        } else if (header === "updated_at") {
          if (!!values[index]) obj[header] = new Date(values[index]) || new Date()
        } else if (header.includes("xata")) {
          // left empty to skip xata fields
        } else {
          obj[header] = values[index] || null
        }
        return obj
      },
      {} as Record<string, string | boolean | Date>,
    )
  })
  return jsonData as Array<User>
}

const failed: Array<{
  id: string
  name: string
  reason: string
}> = []

async function migrate() {
  const users = await getUserCSVData()
  const ctx = await auth.$context

  for (const user of users) {
    const { id, preferred_name, student_number, square_customer_id, created_at, updated_at, ...oldUser } = user
    const pass = await hashPassword(crypto.randomUUID())
    try {
      const createdUser = await ctx.adapter.create<{
        id: string
      }>({
        model: "user",
        data: {
          ...oldUser,
          preferredName: preferred_name,
          studentNumber: student_number,
          squareCustomerId: square_customer_id,
          createdAt: created_at,
          updatedAt: updated_at,
          banned: false,
        },
      })
      if (createdUser?.id) {
        await ctx.adapter.create({
          model: "account",
          data: {
            providerId: "credential",
            accountId: createdUser.id,
            userId: createdUser.id,
            createdAt: created_at,
            updatedAt: created_at,
            password: pass,
          },
        })
      }
    } catch (err) {
      failed.push({ id, name: oldUser.name, reason: err.cause.detail })
      console.log(err)
    }
  }
}

migrate()
  .then(() => {
    console.log("Migration completed")
    console.log("Failed CSV IDs: ", JSON.stringify(failed, null, 2))
    process.exit(0)
  })
  .catch((err) => {
    console.error("Migration failed:", err)

    process.exit(1)
  })
