import Image from "next/image"

import { Button } from "~/components/ui/button"

const LogoCard = (props: { dark?: boolean; main?: boolean; svg: string; png: string }) => (
  <div
    className={[
      "flex flex-col border border-black/25 dark:border-white/25",
      props.dark ? "bg-neutral-950 text-white" : "bg-white text-neutral-950",
    ]
      .join(" ")
      .trim()}
  >
    <div className="flex h-24 flex-grow items-center justify-center p-2 md:h-56 md:p-4">
      <div className="relative h-full w-2/3">
        <Image src={props.svg} alt="CFC logo" fill />
      </div>
    </div>
    <div className="flex items-center p-1 text-sm sm:px-2 md:px-3">
      <span className="flex-grow">
        <Button variant="ghost" asChild>
          <a href={props.png} download className="flex self-center">
            <span className="material-symbols-sharp">download</span>
          </a>
        </Button>
      </span>
      <Button variant="ghost" size="icon" asChild>
        <a href={props.svg} download>
          .svg
        </a>
      </Button>
      &nbsp;
      <Button variant="ghost" size="icon" asChild>
        <a href={props.png} download>
          .png
        </a>
      </Button>
    </div>
  </div>
)

export default LogoCard
