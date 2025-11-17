"use client"

import { useState } from "react"
import { siDiscord, siGithub } from "simple-icons"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"

import EditProfile from "~/app/_components/clients/EditProfile/page"
import ProfilePageSkeleton from "~/app/_components/clients/ProfilePageSkeleton/page"
import TitleText from "~/app/_components/title-text"
import { UNIVERSITIES } from "~/lib/constants"
import { api } from "~/trpc/react"
import { type RouterOutputs } from "~/trpc/shared"

interface ProfilePageProps {
  id: string
  currentUser: RouterOutputs["users"]["getCurrent"]
}

const ProfilePageContent = ({ id, currentUser }: ProfilePageProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const { data: user, refetch } = api.users.get.useQuery(id)

  let universityLabel: string | undefined
  if (user?.student_number?.length) {
    universityLabel = "University of Western Australia"
  } else if (!UNIVERSITIES.find((u) => u.value === user?.university) && user?.university !== "UWA") {
    universityLabel = user?.university || undefined
  } else {
    universityLabel = user ? UNIVERSITIES.find((u) => u.value === user.university)?.label : undefined
  }

  if (user) {
    return (
      <main className="main">
        <TitleText typed>./profile</TitleText>
        <div className="container mx-auto p-4">
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0 md:py-12">
            <div className="space-y-2 p-2 md:w-1/4">
              {!isEditing ? (
                <>
                  <div>
                    {user.role && <Badge className="bg-primary/80 capitalize">{user.role}</Badge>}
                    <h2 className="text-2xl font-bold">{user.preferred_name}</h2>
                    <div className="flex flex-row space-x-1 italic text-primary/80">
                      <p>{user.name}</p>{" "}
                      {user.pronouns && (
                        <>
                          <p>·</p>
                          <p className="capitalize">{user.pronouns}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row space-x-2">
                    {user.github && (
                      <Badge className="items-center hover:bg-primary">
                        <svg
                          aria-label="GitHub logo"
                          viewBox="0 0 24 24"
                          height={12}
                          width={12}
                          className="mr-1 fill-current"
                        >
                          <path d={siGithub.path} />
                        </svg>
                        {user.github}
                      </Badge>
                    )}
                    {user.discord && (
                      <Badge className="items-center bg-[#5865F2] text-white hover:bg-[#5865F2]">
                        <svg
                          aria-label="Discord logo"
                          viewBox="0 0 24 24"
                          height={12}
                          width={12}
                          className="mr-1 fill-current"
                        >
                          <path d={siDiscord.path} />
                        </svg>
                        {user.discord}
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-col text-primary">
                    {user.student_number && (
                      <div className="flex items-center space-x-1">
                        <span className="material-symbols-sharp text-2xl">badge</span>
                        <p className="text-xs">{user.student_number}</p>
                      </div>
                    )}
                    {user.university ? (
                      <div className="flex items-center space-x-1">
                        <span className="material-symbols-sharp text-2xl">school</span>
                        <p className="text-xs capitalize">{universityLabel}</p>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <span className="material-symbols-sharp text-2xl">school</span>
                        <p className="text-xs">The University of Western Australia</p>
                      </div>
                    )}
                  </div>
                  {currentUser?.id === user.id && (
                    <div className="pt-12">
                      <Button className="h-min w-full bg-primary/80" onClick={() => setIsEditing(true)}>
                        {" "}
                        Edit Profile{" "}
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <EditProfile setIsEditing={setIsEditing} id={id} refetch={refetch} />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">Projects</h1>
              <p className="italic">Coming soon...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return <ProfilePageSkeleton />
}

export default ProfilePageContent
