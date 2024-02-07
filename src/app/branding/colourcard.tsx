const ColourCard = (props: { color: string; name: string; className?: string }) => (
  <div className={`flex w-full flex-col justify-between font-mono font-black sm:h-40 md:h-80 ${props.className}`}>
    <p className="p-4">{props.name}</p>
    <p className="p-4 uppercase">{props.color}</p>
  </div>
)

export default ColourCard
