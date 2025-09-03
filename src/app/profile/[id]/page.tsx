import NotFound from "~/app/not-found"
import { api } from "~/trpc/server"

import ProfilePageContent from "./page-content"

const Profile = async ({ params: { id } }: { params: { id: string } }) => {
  const currentUser = await api.users.getCurrent.query()

  if (currentUser) {
    return <ProfilePageContent currentUser={currentUser} id={id} />
  }

  return <NotFound />
}

export default Profile
