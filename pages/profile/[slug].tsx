import React from 'react'
import Head from 'next/head'
import Seo from 'components/Utils/SEO'
import ProfilePage from 'components/Auth/ProfilePage'
import { User } from 'helpers/user'

const Profile = ({ user }: { user: User }) => {
  console.log(user)

  return (
    <>
      <Head>
        <title>{user?.name}'s Profile | Coders for Causes</title>
        <Seo
          title='Edit your account'
          page='account_settings'
          description='Customise your personal preferences and settings'
          image='https://og-social-cards.vercel.app/**.%2Fsettings**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
        />
      </Head>
      <ProfilePage user={user} />
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
  delete user.__v
  return {
    props: { user: { ...user, name: `${user.firstName} ${user.lastName}` } }
  }
}

export default Profile
