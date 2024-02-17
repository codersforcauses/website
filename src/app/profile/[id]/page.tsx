import Link from "next/link"
import TitleText from "~/app/_components/title-text"
import { type User } from "~/lib/types"
import { api } from "~/trpc/server"
import { siDiscord, siGithub } from "simple-icons"
import { Badge } from "~/components/ui/badge"

const Profile = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await api.user.get.query(id)

  if (user) {
    return (
      <main className="main">
        <TitleText typed>./profile</TitleText>
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row md:space-x-2 md:py-12">
            <div className="h-full space-y-2 bg-muted p-2 md:w-1/4">
              <div>
                <Badge className="bg-primary/80 capitalize">{user.role}</Badge>
                <h2 className="text-2xl font-bold">{user.preferred_name}</h2>
                <p className="capitalize italic text-primary/80">{user.pronouns}</p>
              </div>
              <div className="flex flex-row space-x-2">
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
              </div>
              <div className="flex flex-col text-primary">
                {user.student_number && (
                  <div className="flex items-center">
                    <span className="material-symbols-sharp text-2xl">account_circle</span>
                    {user.student_number}
                  </div>
                )}
                {user.university && (
                  <div className="flex items-center">
                    <span className="material-symbols-sharp text-3xl">school</span>
                    {user.university}
                  </div>
                )}
              </div>
            </div>
            <div>
              <h1>Projects</h1>
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
