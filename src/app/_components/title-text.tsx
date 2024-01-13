import TypedText from "./typed-text"

interface TypedTitleTextProps {
  children: string
  typed?: boolean
}
const TitleText = ({ children, typed = false }: TypedTitleTextProps) => {
  return (
    <div className="flex items-center bg-primary py-16 font-mono text-secondary md:py-24">
      <div className="container mx-auto px-3">
        <h1 className="text-3xl">
          {typed ? <TypedText text={[children]} /> : children}
        </h1>
      </div>
    </div>
  )
}

export default TitleText
