import * as aws from "@aws-sdk/client-ses"
import { env } from "~/env"

const sesClient = new aws.SESClient({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

export { sesClient, aws }
