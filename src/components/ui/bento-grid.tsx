import { cn } from "~/lib/utils"

export const BentoGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return (
    <div className={cn("mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ", className)}>
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  alt = false,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: string
  alt: boolean
}) => {
  return (
    <div
      className={cn(
        "row-span-1 flex flex-col justify-between space-y-4 border bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className,
      )}
    >
      {!alt && header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        <div className="mb-2 mt-2 font-mono text-xl font-black">
          <span aria-hidden className="material-symbols-sharp relative top-1 select-none pr-2">
            {icon}
          </span>
          {title}
        </div>
        <div>{description}</div>
      </div>
      {alt && header}
    </div>
  )
}
