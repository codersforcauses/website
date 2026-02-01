"use client"

import { format } from "date-fns"
import Link from "next/link"
import { siDiscord, siGithub } from "simple-icons"

import PaymentFormWrapper from "~/components/payment/online/wrapper"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"

import ProfilePageSkeleton from "~/app/_components/clients/ProfilePageSkeleton/page"
import TitleText from "~/app/_components/title-text"
import { DashboardCard } from "~/app/dashboard/(root)/card"
import { UNIVERSITIES } from "~/lib/constants"
import { getIsMembershipOpen } from "~/lib/utils"
import { api } from "~/trpc/react"
import { type RouterOutputs } from "~/trpc/shared"

interface ProfilePageProps {
  id: string
  currentUser: RouterOutputs["users"]["getCurrent"]
}

const ProfilePage = ({ id, currentUser }: ProfilePageProps) => {
  const { data: user, refetch } = api.users.get.useQuery(id)
  const { isLoading: p1Loading, data: pastProjects } = api.projects.getProjectByUser.useQuery({
    user: user?.email ?? "",
    isPublic: true,
  })
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
          <div className="flex flex-col gap-4 space-y-2 md:flex-row md:py-12">
            <div className={`space-y-2 p-2 ${currentUser?.id === user.id ? "md:w-1/2" : "md:min-w-80"}`}>
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
                <div className="pt-6">
                  <Link href="/profile/settings">
                    <Button>Edit Profile</Button>
                  </Link>
                </div>
              )}
            </div>
            <div className="p-2 w-auto">
              <div className="">
                {currentUser?.id === user.id ? (
                  user?.role === null ? (
                    <div className="space-y-4 max-w-md">
                      <div className="space-y-2">
                        <h2 className="font-semibold leading-none tracking-tight">Membership</h2>
                        <div className="text-sm text-muted-foreground">
                          <p>
                            You&apos;re not a member with us yet. Become a paying member of Coders for Causes for just
                            $5 a year (ends one year from now). There are many benefits to becoming a member which
                            include:
                          </p>
                          <ul className="list-inside list-disc">
                            <li>discounts to paid events such as industry nights</li>
                            <li>the ability to vote and run for committee positions</li>
                            <li>the ability to join our projects run during the winter and summer breaks.</li>
                          </ul>
                        </div>
                      </div>
                      {getIsMembershipOpen() ? (
                        <PaymentFormWrapper />
                      ) : (
                        <p className="text-sm text-warning">
                          Memberships are temporarily closed for the new year. Please check back later.
                        </p>
                      )}
                    </div>
                  ) : (
                    user.role === "member" &&
                    user.membership_expiry && (
                      <div>
                        Your membership will expire on{" "}
                        <span className="text-destructive">
                          {format(new Date(String(user.membership_expiry)), "dd MMMM yyyy")}
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <>
                    {" "}
                    <h1 className="text-2xl font-bold">Projects</h1>
                    <div className="pt-6">
                      <div className="space-y-6">
                        {p1Loading ? (
                          <h2 className="font-mono text-3xl text-primary">Loading...</h2>
                        ) : !pastProjects || pastProjects.length == 0 ? (
                          <h2 className="font-mono text-3xl text-primary">
                            This user has not participated in any projects
                          </h2>
                        ) : (
                          <div className="grid grid-cols-[repeat(auto-fit,minmax(14rem,300px))] gap-4">
                            {pastProjects.map((project, index) => (
                              <div key={index}>
                                <DashboardCard project={project} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return <ProfilePageSkeleton />
}

export default ProfilePage
