"use server"

import { graphql } from "@octokit/graphql"
import type { User } from "@octokit/graphql-schema"
import { formatISO } from "date-fns"

import { env } from "~/env"

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${env.GITHUB_TOKEN}`,
  },
})

export const getUserGithub = async (username: string, year: string) => {
  const { user } = await graphqlWithAuth<{ user: Pick<User, "contributionsCollection"> }>({
    query: `query ($userName: String!, $from: DateTime, $to: DateTime) {
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
    }`,
    userName: username,
    to: formatISO(new Date(`${year}-12-31`)),
    from: formatISO(new Date(`${year}-01-01`)),
  })

  return user.contributionsCollection.contributionCalendar
}

export const getUserGithubYears = async (username: string) => {
  try {
    const { user } = await graphqlWithAuth<{ user: Pick<User, "contributionsCollection"> }>({
      query: `query ($userName: String!) {
				user(login: $userName) {
					contributionsCollection {
						contributionYears
					}
				}
			}`,
      userName: username,
    })

    return user.contributionsCollection.contributionYears
  } catch (error) {
    console.log("Error fetching GitHub years:", error)
  }
}
