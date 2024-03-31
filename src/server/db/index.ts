import { drizzle } from "drizzle-orm/xata-http"
import { getXataClient } from "./xata"

import * as schema from "./schema"

const xata = getXataClient()

export const db = drizzle(xata, { schema })
