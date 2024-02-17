import { Title } from "@radix-ui/react-toast"
import TitleText from "~/app/_components/title-text"
import { Badge } from "~/components/ui/badge"
import { api } from "~/trpc/server"
import { siGithub, siDiscord } from "simple-icons"
import { Separator } from "~/components/ui/separator"
// import GithubHeatmapWrapper from "~/app/_components/github-heatmap"

const Profile = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await api.user.get.query(id)

  if (user) {
    return (
      <main className="main">
        <TitleText typed>./profile</TitleText>
        <div className="container mx-auto py-12">
          <div>
            <div className="mb-2 flex justify-between">
              <div className="flex flex-col space-y-2">
                <div className="flex flex-col">
                  <Badge className="w-min bg-primary/80 capitalize">{user.role}</Badge>
                  <h2 className="text-2xl font-bold">{user.preferred_name}</h2>
                  <p className="text-sm capitalize italic text-primary/80">{user.pronouns}</p>
                </div>
                <div>
                  <div className="flex h-min w-min flex-col space-y-1 md:flex-row md:space-x-2 md:space-y-0">
                    {user.github && (
                      <Badge className="items-center">
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
                      <Badge className="items-center bg-[#5865F2] hover:bg-[#5865F2]/80">
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
                    {user.student_number && (
                      <Badge variant="outline" className="items-center">
                        <span className="material-symbols-sharp text-2xl">account_circle</span>
                        <p className="text-xs">{user.student_number}</p>
                      </Badge>
                    )}
                    {user.university && (
                      <div className="flex items-center">
                        <span className="material-symbols-sharp text-2xl">school</span>
                        {user.university}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <span className="material-symbols-sharp text-3xl hover:cursor-pointer">settings</span>
            </div>
            <Separator className="h-1" />
            <div id="_content" className="mb-32 py-6">
              {/* {user.github && <GithubHeatmapWrapper username={user.github} />} */}

              <h1 className="text-2xl font-bold">Projects</h1>
              <p className="italic">There are currently no projects here...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Profile
