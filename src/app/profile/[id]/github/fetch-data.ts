import { queryOptions } from "@tanstack/react-query"

import { githubContributionYears, githubUsersContribution, githubUsersProjects } from "./action"

const cacheProps = {
  refetchInterval: 0,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  staleTime: 1000 * 60 * 60 * 24, // 1 day
}

export function getContributionYears(username: string) {
  return queryOptions({
    ...cacheProps,
    queryKey: ["contribution-years", username],
    queryFn: () => githubContributionYears(username),
  })
}

export function getUsersContribution(username: string, year: number, restrictToCFC: boolean) {
  return queryOptions({
    ...cacheProps,
    queryKey: ["contributions", username, year, restrictToCFC],
    queryFn: () => githubUsersContribution(username, year, restrictToCFC),
  })
}

export function getReposWithUser(username: string, year: number) {
  return queryOptions({
    ...cacheProps,
    queryKey: ["repos", username, year],
    queryFn: () => githubUsersProjects(username, year),
  })
}
