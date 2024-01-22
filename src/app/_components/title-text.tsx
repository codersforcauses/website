import TypedText from "./typed-text"

interface TypedTitleTextProps {
  children: string
  typed?: boolean
}

const TitleText = ({ children, typed = false }: TypedTitleTextProps) => {
  return (
    <div className="flex items-center bg-black py-16 font-mono text-white md:py-24">
      <h1 className="container text-2xl md:text-3xl">{typed ? <TypedText text={[children]} /> : children}</h1>
    </div>
  )
}

export default TitleText
