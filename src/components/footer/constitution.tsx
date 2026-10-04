import * as React from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { marked } from "marked"

export const constitutionUrl =
  "https://raw.githubusercontent.com/codersforcauses/cfc-constitution/master/Constitution.md"
export default function ConstitutionModal() {
  const { data, isError } = useSuspenseQuery({
    queryKey: ["constitution"],
    queryFn: async () => {
      const response = await fetch(constitutionUrl)
      const md = await response.text()
      const lines = md.split("\n")
      return lines.slice(1).join("\n")
    },
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: 0,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  })

  const html = React.useMemo(() => {
    return (
      // snarkdown(data)
      marked.parse(data, {
        // gfm: true,
        // breaks: true,
        pedantic: true,
      })
    )
  }, [data])

  // if (isError) {
  //   return (
  //     <div className="inline-block p-4">
  //       Failed to load constitution. Please try again later or you can find it{" "}
  //       <Button asChild variant="link" size="sm" className="h-auto w-fit p-0">
  //         <a href={constitutionUrl}>here</a>
  //       </Button>
  //       .
  //     </div>
  //   );
  // }

  return (
    <div className="no-scrollbar -mx-4 max-h-[calc(100vh-84px)] overflow-y-auto px-4 sm:max-h-[calc(95vh-84px)]">
      <div
        className="constitution flex flex-col gap-1 font-sans text-sm [&_strong]:my-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
