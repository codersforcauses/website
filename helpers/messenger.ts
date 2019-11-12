export const initMessenger = () => {
  ;((d, s, id) => {
    if (d.getElementById(id)) return
    const fjs = d.getElementsByTagName(s)[0]
    const js = d.createElement(s)
    js.id = id
    // @ts-ignore
    js.src =
      'https://connect.facebook.net/en_GB/sdk/xfbml.customerchat.js#xfbml=1&version=v5.0&autoLogAppEvents=1'
    // @ts-ignore
    fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')
}
