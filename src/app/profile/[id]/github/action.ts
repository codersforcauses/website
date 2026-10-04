"use server"

import type { User } from "@octokit/graphql-schema"
import { graphql } from "@octokit/graphql"
import { formatISO } from "date-fns"

import { env } from "~/env"

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${env.GITHUB_TOKEN}`,
  },
})

export async function githubContributionYears(username: string) {
  const { user } = await graphqlWithAuth<{ user: Pick<User, "contributionsCollection"> }>({
    userName: username,
    query: `
      query ($userName: String!) {
        user(login: $userName) {
          contributionsCollection {
            contributionYears
          }
        }
      }
    `,
  })
  return user.contributionsCollection.contributionYears
}

export async function githubUsersContribution(username: string, year: number, orgRestricted: boolean) {
  const { user } = await graphqlWithAuth<{ user: Pick<User, "contributionsCollection"> }>({
    userName: username,
    to: formatISO(new Date(`${year}-12-31`)),
    from: formatISO(new Date(`${year}-01-01`)),
    orgID: orgRestricted ? "O_kgDOAUJO7g" : undefined,
    query: `
      query ($userName: String!, $from: DateTime!, $to: DateTime!, $orgID: ID) {
        user(login: $userName) {
          contributionsCollection(to: $to, from: $from, organizationID: $orgID) {
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
    `,
  })
  return user.contributionsCollection.contributionCalendar
}

// GitHub restricts to 1 year when orgID is added
export async function githubUsersProjects(username: string, year: number) {
  const { user } = await graphqlWithAuth<{ user: Pick<User, "contributionsCollection"> }>({
    userName: username,
    to: formatISO(new Date(`${year}-12-31`)),
    from: formatISO(new Date(`${year}-01-01`)),
    orgID: "O_kgDOAUJO7g",
    query: `
      query ($userName: String!, $from: DateTime!, $to: DateTime!, $orgID: ID) {
        user(login: $userName) {
          contributionsCollection(to: $to, from: $from, organizationID: $orgID) {
            commitContributionsByRepository {
              repository {
                id
                name
                url
                description
                stargazerCount
                updatedAt
                homepageUrl
                primaryLanguage {
                  name
                  color
                  id
                }
                licenseInfo {
                  spdxId
                }
              }
            }
          }
        }
      }
    `,
  })
  return user.contributionsCollection.commitContributionsByRepository
}

// list repos in org
// query ($orgName: String!, $cursor: String) {
//   organization(login: $orgName) {
//     repositories(first: 100, after: $cursor) {
//       totalCount
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//       nodes {
//         name
//         isPrivate
//         url
//       }
//     }
//   }
// }
