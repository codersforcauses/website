import { EventSchemas, Inngest } from "inngest"
import { syncUserEvent } from "./schema"

// Create a client to send and receive events
export const inngest = new Inngest({ id: "cfc-website", schemas: new EventSchemas().fromZod([syncUserEvent]) })
