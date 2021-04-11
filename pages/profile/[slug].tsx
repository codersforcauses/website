import { useContext } from 'react'
import Meta from 'components/Utils/Meta'
import ProfilePage from 'components/Auth/ProfilePage'
import { UserProps, UserContext } from 'helpers/user'

const Profile = ({ user }: { user: UserProps }) => {
  const { user: currentUser } = useContext(UserContext)

  return (
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
      <ProfilePage user={user} canEdit={currentUser?._id === user._id} />
    </>
  )
}

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}users?_id=${params.slug}`
  )
  const {
    data: [user]
  } = await res.json()
  return user ? { props: { user } } : { notFound: true }
}

export default Profile
