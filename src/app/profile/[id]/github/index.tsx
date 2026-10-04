"use client"

import * as React from "react"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { siGithub } from "simple-icons"
import { useQueryState, parseAsInteger, parseAsBoolean } from "nuqs"

// import { getQueryClient } from "~/trpc/react"
import { Field, FieldLabel } from "~/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/ui/select"
import { Switch } from "~/ui/switch"
import { getContributionYears, getReposWithUser, getUsersContribution } from "./fetch-data"
import GithubHeatmap, { contributionText } from "./heatmap"
import ContributedProjects from "./projects"

interface GithubHeatmapWrapperProps {
  username: string
}

export default function GithubProfile({ username }: GithubHeatmapWrapperProps) {
  // const queryClient = getQueryClient()
  const [active, setActive] = useQueryState("year", parseAsInteger.withDefault(new Date().getFullYear()))
  const [restrictToCFC, setRestriction] = useQueryState("cfc_only", parseAsBoolean.withDefault(false))
  const { data: years } = useSuspenseQuery(getContributionYears(username))
  const { data, isFetching } = useQuery(getUsersContribution(username, active, restrictToCFC))

  // Promise.all([
  //   queryClient.prefetchQuery(getReposWithUser(username, year)),
  // ])

  return (
    <div className="grid flex-1 gap-10">
      <div className="grid gap-4">
        <div className="inline-flex w-full items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-2">
              <svg aria-label="GitHub username: " viewBox="0 0 24 24" className="size-4 fill-current select-none">
                <path d={siGithub.path} />
              </svg>
              <h3 className="font-semibold tracking-tight">{username}</h3>
            </div>
            <p className="text-sm leading-none font-medium text-muted-foreground">
              {data?.totalContributions
                ? `${contributionText(data.totalContributions)} in ${active}`
                : `No contributions in ${active}`}
            </p>
          </div>
          <Select value={active} onValueChange={(val) => setActive(val)} items={years}>
            <SelectTrigger>
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="w-(--anchor-width)">
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {data && (
          <GithubHeatmap isLoading={isFetching} data={data.weeks}>
            <Field orientation="horizontal" className="ml-auto w-fit">
              <FieldLabel htmlFor="switch">CFC only</FieldLabel>
              <Switch id="switch" size="sm" checked={restrictToCFC} onCheckedChange={(val) => setRestriction(val)} />
            </Field>
          </GithubHeatmap>
        )}
      </div>
      {years.length > 0 && (
        <React.Suspense fallback={<>loading</>}>
          <ContributedProjects years={years} username={username} />
        </React.Suspense>
      )}
    </div>
  )
}
