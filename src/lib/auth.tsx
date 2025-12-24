// ! DO NOT CHANGE DIRECTORY

import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin as adminPlugin, emailOTP } from "better-auth/plugins"
import { eq } from "drizzle-orm"
import { uuidv7 } from "uuidv7"

import { db } from "~/server/db"
import { users } from "~/server/db/schema"
import OTPEmail from "~/emails/otp"
import { getBaseUrl } from "./utils"
import { squareClient } from "./square.server"
import { sendEmail } from "./send-email"
import { ac, admin, committee, member, returning } from "./permissions"

export const auth = betterAuth({
  baseURL: getBaseUrl(),
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  plugins: [
    adminPlugin({
      ac,
      roles: {
        member,
        committee,
        returning,
        admin,
      },
      defaultRole: undefined,
      bannedUserMessage: "You have been banned. Please contact a committee member if you believe this is a mistake.",
    }),
    emailOTP({
      disableSignUp: true,
      expiresIn: 60 * 10, // 10 minutes
      sendVerificationOnSignUp: true,
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp }) {
        await sendEmail({
          to: [email],
          subject: "Sign in to Coders for Causes",
          email: <OTPEmail code={otp} />,
        })
      },
    }),
    nextCookies(),
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: true,
  },
  emailVerification: {
    autoSignInAfterVerification: true,
  },
  user: {
    // changeEmail: {
    //   enabled: true,
    //   sendChangeEmailVerification
    // },
    additionalFields: {
      preferredName: {
        type: "string",
        required: true,
      },
      pronouns: {
        type: "string",
        required: true,
        returned: true,
      },
      studentNumber: {
        type: "string",
        required: false,
        unique: true,
      },
      university: {
        type: "string",
        required: false,
      },
      github: {
        type: "string",
        required: false,
        unique: true,
      },
      discord: {
        type: "string",
        required: false,
        unique: true,
      },
      subscribe: {
        type: "boolean",
        defaultValue: true,
      },
      squareCustomerId: {
        type: "string",
        required: false,
        unique: true,
        input: false,
      },
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for", "x-vercel-forwarded-for", "x-real-ip"],
      disableIpTracking: false,
    },
  },
  databaseHooks: {
    user: {
      create: {
        async after(incorrectlyTypedUser) {
          const user = incorrectlyTypedUser as typeof incorrectlyTypedUser & {
            preferredName: string
            squareCustomerId: string | undefined
          }

          if (user.squareCustomerId) return
          const { customer } = await squareClient.customers.create({
            idempotencyKey: uuidv7(),
            emailAddress: user.email,
            givenName: user.preferredName,
            familyName: user.name,
            referenceId: user.id,
          })
          if (customer) {
            await db.update(users).set({ squareCustomerId: customer.id }).where(eq(users.id, user.id))
          }
        },
      },
    },
  },
})
