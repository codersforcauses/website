import NotFound from "~/app/not-found"
import { api } from "~/trpc/server"
import ProfilePage from "./profile/page"

const Profile = async ({ params: { id } }: { params: { id: string } }) => {
  const currentUser = await api.users.getCurrent.query()

  if (currentUser) {
    return <ProfilePage currentUser={currentUser} id={id} />
  }

  return <NotFound />
}

export default Profile
