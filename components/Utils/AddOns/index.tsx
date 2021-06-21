import Script from 'next/script'
import { useContext } from 'react'
import { UserContext } from '@helpers/user'

const AddOns = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      <div id='fb-root' />
      <div id='fb-customer-chat' className='fb-customerchat' />
      <Script strategy='lazyOnload'>
        {`
          var chatbox = document.getElementById('fb-customer-chat');
          chatbox.setAttribute("page_id", "700598980115471");
          chatbox.setAttribute("attribution", "biz_inbox");
          chatbox.setAttribute("theme_color", "#000000");
          chatbox.setAttribute("greeting_dialog_display", "fade");
          chatbox.setAttribute("logged_in_greeting", ${`Hi ${
            user?.firstName ?? 'there'
          }! How can we help you?`});
          chatbox.setAttribute("logged_out_greeting", "Please log into facebook to chat with us");
          window.fbAsyncInit = function() {
            FB.init({
              xfbml   : true,
              version : 'v11.0'
            });
          };

        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/en_GB/sdk/xfbml.customerchat.js';
          fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk'));
      `}
      </Script>
    </>
  )
}

export default AddOns
