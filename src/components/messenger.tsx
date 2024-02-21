import Script from "next/script"

const Messenger = () => (
  <>
    <div id="fb-root"></div>
    <div id="fb-customer-chat" className="fb-customerchat"></div>
    <Script id="fb-messenger" strategy="lazyOnload">
      {`
        var chatbox = document.getElementById('fb-customer-chat');
        chatbox.setAttribute("page_id", "700598980115471");
        chatbox.setAttribute("attribution", "biz_inbox");

        window.fbAsyncInit = function() {
          FB.init({
            xfbml            : true,
            version          : 'v19.0'
          });
        };
  
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/en_GB/sdk/xfbml.customerchat.js';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      `}
    </Script>
  </>
)

export default Messenger
