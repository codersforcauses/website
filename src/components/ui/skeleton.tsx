import { cn } from "~/lib/utils"

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("animate-pulse bg-border", className)} {...props} />
}

export { Skeleton }
