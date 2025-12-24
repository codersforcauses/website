import * as React from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import snarkdown from "snarkdown"

import { ScrollArea } from "~/components/ui/scroll-area"
import { Button } from "~/ui/button"

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

  const html = React.useMemo(() => snarkdown(data), [data])

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
    <>
      <style>
        {`
          .constitution strong {
            margin-top: 0.5rem;
          }
          .constitution br {
            margin-bottom: 0.5rem;
          }
        `}
      </style>
      <ScrollArea className="h-[calc(100vh-84px)] w-full font-sans text-sm sm:h-[calc(95vh-84px)]">
        <div className="constitution flex flex-col" dangerouslySetInnerHTML={{ __html: html }} />
      </ScrollArea>
    </>
  )
}
