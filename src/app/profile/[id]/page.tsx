import Link from "next/link"
import TitleText from "~/app/_components/title-text"
import { type User } from "~/lib/types"
import { api } from "~/trpc/server"
import { siDiscord, siGithub } from "simple-icons"

const Profile = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await api.user.get.query(id)

  if (user) {
    return (
      <main className="main">
        <TitleText typed>./profile</TitleText>
        <div className="container mx-auto p-4">
          <div className="flex flex-row md:py-12">
            <div className="w-1/2 space-y-2">
              <div>
                <div className="inline-block capitalize">{user.role}</div>
                <h2 className="text-2xl font-bold">{user.preferred_name}</h2>
                <p className="capitalize italic text-gray-700">{user.pronouns}</p>
              </div>
              <div className="flex flex-row space-x-2">
                <Link className="flex flex-row items-center" href={`https://github.com/` + user.github}>
                  <svg
                    aria-label="GitHub logo"
                    viewBox="0 0 24 24"
                    height={36}
                    width={30}
                    className="mr-1 fill-current"
                  >
                    <path d={siGithub.path} />
                  </svg>
                  @{user.github}
                </Link>
                <div className="flex flex-row items-center">
                  <svg
                    aria-label="Discord logo"
                    viewBox="0 0 24 24"
                    height={36}
                    width={30}
                    className="mr-1 fill-current"
                  >
                    <path d={siDiscord.path} />
                  </svg>
                  @{user.discord}
                </div>
              </div>
              <div className="flex flex-col text-gray-700">
                {user.student_number && (
                  <div className="flex items-center">
                    <span className="material-symbols-sharp text-3xl">account_circle</span>
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
              <p>There are no projects here currently...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return <>loading</>
}

export default Profile
