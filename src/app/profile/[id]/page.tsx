import NotFound from "~/app/not-found"
import ProfilePage from "./ProfilePage/page"
import { api } from "~/trpc/server"
import { getUserCookie } from "~/app/actions"

const Profile = async ({ params: { id } }: { params: { id: string } }) => {
  // const user = await api.user.get.query(id)
  const currentUser = await getUserCookie()

  if (currentUser) {
    return <ProfilePage currentUser={currentUser} id={id} />
  }

  return <NotFound />
}

export default Profile
