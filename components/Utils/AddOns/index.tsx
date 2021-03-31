import { useContext, useEffect } from 'react'
import { UserContext } from 'helpers/user'

const initMessenger = () => {
  const widgetInit = (d, s, id) => {
    if (d.getElementById(id)) return
    const fjs = d.getElementsByTagName(s)[0]
    const js = d.createElement(s)
    js.id = id
    js.src =
      'https://connect.facebook.net/en_GB/sdk/xfbml.customerchat.js#xfbml=1&version=v10.0&autoLogAppEvents=1'
    fjs.parentNode.insertBefore(js, fjs)
  }
  setTimeout(() => {
    widgetInit(document, 'script', 'facebook-jssdk')
  }, 4000)
}

const AddOns = () => {
  if (process.env.NODE_ENV !== 'production') return null

  const { user } = useContext(UserContext)
  useEffect(() => {
    initMessenger()
  }, [])

  return (
    <>
      <div id='fb-root' />
      <div
        className='fb-customerchat'
        data-attribution='setup_tool'
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
}

export default AddOns
