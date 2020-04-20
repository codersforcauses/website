export const phemeLogin = async (
  user: string,
  pass: string,
  url: string,
  token: string
) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify({
      user,
      pass,
      token
    })
  })

  return response.json()
}
