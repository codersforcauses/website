import * as React from "react"
import { notFound } from "next/navigation"
import { siDiscord, siGithub } from "simple-icons"

import { api } from "~/trpc/server"
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar"
import { Badge } from "~/ui/badge"
import GithubProfile from "./github"

export default async function ProfilePage(props: PageProps<"/profile/[id]">) {
  const { id } = await props.params
  const user = await api.user.get(id)

  if (!user) notFound()

  const roles = user.role?.split(",").map((role) => role.trim())

  return (
    <div className="container mx-auto flex flex-col gap-6 px-4 py-12">
      <div className="flex gap-4">
        <Avatar className="size-32">
          <AvatarImage src={user.image!} />
          <AvatarFallback className="text-2xl">{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold">
            <span className="sr-only">Preferred Name:</span>
            {user.preferredName}
          </p>
          <p>{user.name}</p>
          {roles?.map((role) => (
            <Badge key={role} className="bg-accent text-neutral-950">
              {role}
            </Badge>
          ))}
          <p className="text-neutral-500 dark:text-neutral-400">{user.pronouns}</p>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-sharp leading-none! text-neutral-500 dark:text-neutral-400">school</span>
            <p className="text-sm">
              The University of Western Australia {user?.studentNumber && <>({user.studentNumber})</>}
            </p>
          </div>

          <div className="flex gap-1">
            {user?.github && (
              <Badge aria-label={`GitHub username of ${user.preferredName}`}>
                <svg aria-hidden viewBox="0 0 24 24" className="fill-current">
                  <path d={siGithub.path} />
                </svg>
                {user.github}
              </Badge>
            )}
            {user?.discord && (
              <Badge
                aria-label={`Discord username of ${user.preferredName}`}
                className="bg-[#5865F2] dark:bg-[#5865F2] dark:text-neutral-50"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="fill-current">
                  <path d={siDiscord.path} />
                </svg>
                {user.discord}
              </Badge>
            )}
          </div>
        </div>
      </div>
      <div>
        {user.github && (
          <>
            <h3 className="mb-2 font-semibold tracking-tight">{user.preferredName}&apos;s GitHub Contributions</h3>
            <React.Suspense fallback={<div className="text-center">Loading GitHub profile...</div>}>
              <GithubProfile username={user.github} />
            </React.Suspense>
          </>
        )}
      </div>
    </div>
  )
}
