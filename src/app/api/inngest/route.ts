import { serve } from "inngest/next"
import { inngest } from "../../../inngest/client"
import { syncUser } from "~/inngest/functions"

// Create an API to handle incoming Inngest webhooks
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUser],
})
