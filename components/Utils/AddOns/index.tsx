import { useContext } from 'react'
import { UserContext } from 'helpers/user'

const AddOns = () => {
  const { user } = useContext(UserContext)

  return (
    process.env.NODE_ENV === 'production' && (
      <>
        <div id='fb-root' />
        <div
          className='fb-customerchat'
          data-theme_color='#000000'
          data-page_id='700598980115471'
          data-logged_in_greeting={`Hi ${
            user?.given_name ?? 'there'
          }! How can we help you?`}
          data-logged_out_greeting='Please log into facebook to chat with us'
          data-greeting_dialog_display='fade'
        />
      </>
    )
  )
}

export default AddOns
