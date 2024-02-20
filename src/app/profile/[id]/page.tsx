import NotFound from "~/app/not-found"
import ProfilePage from "./ProfilePage/page"
import { getUserCookie } from "~/app/actions"

const Profile = async ({ params: { id } }: { params: { id: string } }) => {
  const currentUser = await getUserCookie()

  if (currentUser) {
    return <ProfilePage currentUser={currentUser} id={id} />
  }

  return <NotFound />
}

export default Profile
