import Image from "next/image"

const LogoCard = (props: { dark?: boolean; main?: boolean; svg: string; png: string }) => (
  <div
    className={[
      "flex flex-col border border-primary",
      props.dark ? "bg-primary text-secondary" : "bg-secondary text-primary",
    ]
      .join(" ")
      .trim()}
  >
    <div className="flex h-24 flex-grow items-center justify-center p-2 md:h-56 md:p-4">
      <div className="relative h-full w-2/3">
        <Image src={props.svg} alt="CFC logo" layout="fill" />
      </div>
    </div>
    <div className="flex items-center p-1 text-sm sm:px-2 md:px-3">
      <span className="flex-grow">
        <a href={props.png} download className="flex self-center">
          <span className="material-icons-sharp">get_app</span>
        </a>
      </span>
      <a href={props.svg} download className="hover:underline">
        .svg
      </a>
      &emsp;
      <a href={props.png} download className="hover:underline">
        .png
      </a>
    </div>
  </div>
)

export default LogoCard
