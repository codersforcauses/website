import { GetServerSideProps } from 'next'
import useSWR from 'swr'
import Meta from '@components/Utils/Meta'
import ProfilePage from '@components/Auth/ProfilePage'
import { User } from '@helpers/types'
import { useUser } from '@helpers/user'

const Profile = ({ slug }: ProfileProps) => {
  const { user: current } = useUser()
  const { data: user } = useSWR<User>(`/api/users/${slug}`)

  return user ? (
    <>
      <Meta
        title={`${user.name}'s Profile`}
        name={`${user.name}'s Profile`}
        page={`profile/${user._id}`}
        description={`View ${user.name}'s profile and their linked accounts`}
        image={`https://og-social-cards.vercel.app/**.%2F${encodeURIComponent(
          `${user.firstName.toLowerCase()}'s profile`
        )}**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg`}
      />
      <ProfilePage user={user} canEdit={current?._id === user._id} />
    </>
  ) : null
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => ({
  props: { slug: params?.slug }
})

interface ProfileProps {
  slug: string
}

export default Profile
