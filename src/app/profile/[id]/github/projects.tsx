import * as React from "react"
import { useSuspenseQueries } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"

import { Item, ItemContent, ItemDescription, ItemTitle } from "~/ui/item"
import { getReposWithUser } from "./fetch-data"
import { Button } from "~/ui/button"
import { cn } from "~/lib/utils"

interface ContributedProjectsProps {
  years: number[]
  username: string
}

export default function ContributedProjects({ years, username }: ContributedProjectsProps) {
  const [showAll, setShowAll] = React.useState(false)
  const { data } = useSuspenseQueries({
    queries: years.map((year) => getReposWithUser(username, year)),
    combine: (results) => {
      return {
        data: results.flatMap((res) => res.data),
        pending: results.some((res) => res.isPending),
      }
    },
  })

  // need to filter out duplicates and
  // sort by number of contributions
  const unique = [...new Map(data.map(({ repository }) => [repository["id"], repository])).values()]

  const repos = showAll ? unique : unique.slice(0, 4)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 md:justify-normal">
        <h3 className="font-semibold tracking-tight">CFC repositories</h3>
        <Button
          size="xs"
          variant="ghost"
          onClick={() => {
            setShowAll((prev) => !prev)
          }}
        >
          Show {showAll ? "less" : "all"}
        </Button>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {repos.map((repo) => (
          <Item key={repo.id} variant="outline" className="relative p-4">
            <ItemContent className="h-full gap-2">
              <ItemTitle className="truncate font-semibold">
                <span className="material-symbols-sharp text-sm! leading-none! text-muted-foreground">folder_code</span>
                {repo.name}
              </ItemTitle>
              <Button
                size="xs"
                variant="ghost"
                className="absolute top-3.5 right-4 group-hover/item:visible md:invisible"
                render={
                  <a href={repo.url}>
                    View on GitHub <span className="material-symbols-sharp">arrow_outward</span>
                  </a>
                }
              />
              <ItemDescription className={cn("flex-1 text-xs text-muted-foreground", !repo.description && "italic")}>
                {repo.description ?? "No description provided"}
              </ItemDescription>
              {repo.homepageUrl && (
                <div className="inline-flex items-center text-xs text-muted-foreground">
                  URL:&nbsp;
                  <Button size="xs" variant="link" className="size-fit justify-start p-0">
                    {repo.homepageUrl}
                  </Button>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {repo.primaryLanguage && (
                  <div className="flex items-center gap-1">
                    <span className="size-2" style={{ backgroundColor: repo.primaryLanguage.color! }} />
                    {repo.primaryLanguage?.name}
                  </div>
                )}
                <div className="flex items-center gap-0.5">
                  <span className="material-symbols-sharp text-xs! leading-none!">star</span>
                  {repo.stargazerCount}
                </div>
                {repo.licenseInfo && (
                  <div className="flex items-center gap-0.5">
                    <span className="material-symbols-sharp text-xs! leading-none!">license</span>
                    {repo.licenseInfo.spdxId}
                  </div>
                )}
                <span className="ml-auto">{`Updated ${formatDistanceToNow(repo.updatedAt)} ago`}</span>
              </div>
            </ItemContent>
          </Item>
        ))}
      </div>
    </div>
  )
}
