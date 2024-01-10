"use server"

const query = `
query($userName:String!) {
  user(login: $userName){
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            weekday
          }
        }
      }
    }
  }
}
`

const getUserGithub = async (username: string) => {
  if (!username) return

  const variables = `
  {
    "userName": "${username}"
  }
`
  const body = {
    query,
    variables,
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

export default getUserGithub
