import Link from "next/link"
import Image from "next/image"

import { getServerAuthSession } from "~/server/auth"
import { api } from "~/trpc/server"

export default async function Dashboard() {
  return <main className="main"></main>
}
