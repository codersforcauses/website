import NotFound from "~/app/not-found"
import ProfilePage from "./profile/page"
import { api } from "~/trpc/server"

const Profile = async ({ params: { id } }: { params: { id: string } }) => {
  const currentUser = await api.user.getCurrent.query()

  if (currentUser) {
    return <ProfilePage currentUser={currentUser} id={id} />
  }

  return <NotFound />
}

export default Profile
