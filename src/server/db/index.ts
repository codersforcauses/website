import { drizzle } from "drizzle-orm/xata-http"

import * as schema from "./schema"
import { getXataClient } from "./xata"

const xata = getXataClient()

export const db = drizzle(xata, { schema })
