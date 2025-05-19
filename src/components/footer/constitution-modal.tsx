import snarkdown from "snarkdown"

import { DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog"
import { ScrollArea } from "~/components/ui/scroll-area"

const ConstitutionModal = async () => {
  const data = await fetch(
    "https://raw.githubusercontent.com/codersforcauses/cfc-constitution/master/Constitution.md",
    { cache: "force-cache" },
  )
  const md = await data.text()
  const lines = md.split("\n")
  const filteredMd = lines.slice(1).join("\n")
  const html = snarkdown(filteredMd)

  return (
    <>
      <DialogContent className="max-h-screen max-w-2xl overflow-hidden sm:max-h-[calc(95vh)]">
        <DialogHeader>
          <DialogTitle>Constitution of Coders for Causes</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(100vh-84px)] w-full font-sans text-sm sm:h-[calc(95vh-84px)]">
          <div className="flex flex-col constitution" dangerouslySetInnerHTML={{ __html: html }} />
        </ScrollArea>
      </DialogContent>

      <style>
        {`
          .constitution strong {
            margin-top: 1rem;
          }
          .constitution br {
            margin-bottom: .5rem;
          }
        `}
      </style>
    </>
  )
}

export default ConstitutionModal
