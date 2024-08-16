import { randomUUID } from "crypto"
import { Client as SquareClient, Environment as SquareEnvironment } from "square"
import { env } from "~/env"
import { db } from "~/server/db"
import { users } from "~/server/db/schema"
import { inngest } from "./client"

export const syncUser = inngest.createFunction(
  { id: "sync-user-from-clerk" }, // ←The 'id' is an arbitrary string used to identify the function in the dashboard
  { event: "clerk/user.created" }, // ← This is the function's triggering event
  async ({ event, step }) => {
    const {
      id,
      firstName: preferred_name,
      lastName: name,
      emailAddresses,
      primaryEmailAddressId,
      unsafeMetadata: { pronouns, student_number, university, github, discord, subscribe },
    } = event.data
    const email = emailAddresses.find((e) => e.id === primaryEmailAddressId)?.emailAddress

    if (!email) {
      throw new Error(`No email address found for ${id}. How...`)
    }

    const square_customer_id = await step.run("create-square-customer", async () => {
      const { customersApi } = new SquareClient({
        accessToken: env.SQUARE_ACCESS_TOKEN,
        environment: env.NEXT_PUBLIC_SQUARE_APP_ID.includes("sandbox")
          ? SquareEnvironment.Sandbox
          : SquareEnvironment.Production,
      })

      const { result, statusCode } = await customersApi.createCustomer({
        idempotencyKey: randomUUID(),
        givenName: preferred_name,
        familyName: name,
        emailAddress: email,
        referenceId: id,
      })

      if (!result.customer?.id) {
        throw new Error(`Failed to create square customer ${statusCode}`)
      }

      return result.customer.id
    })

    await step.run("create-db-user", async () => {
      return await db.insert(users).values({
        id,
        name,
        preferred_name,
        email,
        pronouns,
        student_number,
        university,
        github,
        discord,
        subscribe,
        square_customer_id,
      })
    })

    return { id }
  },
)
