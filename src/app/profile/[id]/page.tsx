import Link from "next/link"
import TitleText from "~/app/_components/title-text"
import { type User } from "~/lib/types"
import { api } from "~/trpc/server"
import { siDiscord, siGithub } from "simple-icons"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { getUserCookie } from "~/app/actions"

const uni = [
  {
    label: "Curtin University",
    value: "curtin",
  },
  {
    label: "Edith Cowan University",
    value: "ecu",
  },
  {
    label: "Murdoch University",
    value: "murdoch",
  },
  {
    label: "University of Notre Dame",
    value: "notre-dame",
  },
  {
    label: "TAFE",
    value: "tafe",
  },
] as const

const Profile = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await api.user.get.query(id)
  const currentUser = await getUserCookie()

  const universityLabel = user ? uni.find((u) => u.value === user.university)?.label : undefined

  if (user) {
    return (
      <main className="main">
        <TitleText typed>./profile</TitleText>
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row md:space-x-2 md:py-12">
            <div className="space-y-2 p-2 md:w-1/4">
              <div>
                <Badge className="bg-primary/80 capitalize">{user.role}</Badge>
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
                  <Badge className="items-center">
                    <svg
                      aria-label="GitHub logo"
                      viewBox="0 0 24 24"
                      height={24}
                      width={24}
                      className="mr-1 fill-current"
                    >
                      <path d={siGithub.path} />
                    </svg>
                    {user.github}
                  </Badge>
                )}
                {user.discord && (
                  <Badge className="items-center bg-[#5865F2] hover:bg-[#5865F2]/80">
                    <svg
                      aria-label="Discord logo"
                      viewBox="0 0 24 24"
                      height={24}
                      width={24}
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
                  <Button className="h-min w-full bg-primary/80"> Edit Profile </Button>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">Projects</h1>
              <p className="italic">There are no projects here currently...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return <>loading</>
}

export default Profile
