"use server"
import { formatISO } from "date-fns"

const contributionByYear = `
query ($userName: String!, $from: DateTime, $to: DateTime) {
  user(login: $userName) {
    contributionsCollection(to: $to, from: $from) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionLevel
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

export const getUserGithub = async (username: string, year: string) => {
  if (!username) return

  const toDate = formatISO(new Date(`${year}-12-31`))
  const fromDate = formatISO(new Date(`${year}-01-01`))

  const variables = `
  {
    "userName": "${username}",
    "to": "${toDate}",
    "from": "${fromDate}"
  }
`
  const body = {
    query: contributionByYear,
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
    throw new Error("Network response was not ok for contribution data")
  }
  return response.json()
}

const contributionYears = `
query ($userName: String!) {
  user(login: $userName) {
    contributionsCollection {
      contributionYears
    }
  }
}
`

export const getUserGithubYears = async (username: string) => {
  if (!username) return
  const variables = `
  {
    "userName": "${username}"
  }
`
  const body = {
    query: contributionYears,
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
    throw new Error("Network response was not ok for years")
  }
  return response.json()
}
