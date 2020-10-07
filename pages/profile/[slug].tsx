import React, { useContext } from 'react'
import Head from 'next/head'
import Seo from 'components/Utils/SEO'
import ProfilePage from 'components/Auth/ProfilePage'
import { User, UserContext } from 'helpers/user'

const Profile = ({ user }: { user: User }) => {
  const { user: currentUser } = useContext(UserContext)

  return (
    <>
      <Head>
        <title>{user?.name}'s Profile | Coders for Causes</title>
        <Seo
          title='Edit your account'
          page={`${user.name}'s profile`}
          description={`View ${user.name}'s profile and their linked accounts`}
          image={`https://og-social-cards.vercel.app/**.%2F${encodeURIComponent(
            `${user.firstName.toLowerCase()}'s profile`
          )}**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg`}
        />
      </Head>
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
  return {
    props: { user }
  }
}

export default Profile
