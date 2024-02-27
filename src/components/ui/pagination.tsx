import * as React from "react"
import Link from "next/link"

import { cn } from "~/lib/utils"
import { type ButtonProps, buttonVariants, Button } from "~/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  ),
)
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<typeof Link>

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "ghost" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPreviousLink = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("flex items-center gap-1 pl-2.5", className)}
    {...props}
  >
    <span className="material-symbols-sharp w-5">chevron_left</span>
    <span>Previous</span>
  </PaginationLink>
)
PaginationPreviousLink.displayName = "PaginationPreviousLink"

const PaginationPreviousButton = ({ className, ...props }: React.ComponentProps<typeof Button>) => (
  <Button
    type="button"
    variant="ghost"
    aria-label="Go to previous page"
    size="default"
    className={cn("flex items-center gap-1 pl-2.5", className)}
    {...props}
  >
    <span className="material-symbols-sharp w-5">chevron_left</span>
    <span>Previous</span>
  </Button>
)
PaginationPreviousButton.displayName = "PaginationPreviousButton"

const PaginationNextLink = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="default" className={cn("gap-1 pr-2.5", className)} {...props}>
    <span>Next</span>
    <span className="material-symbols-sharp w-5">chevron_right</span>
  </PaginationLink>
)
PaginationNextLink.displayName = "PaginationNextLink"

const PaginationNextButton = ({ className, ...props }: React.ComponentProps<typeof Button>) => (
  <Button
    type="button"
    variant="ghost"
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <span className="material-symbols-sharp w-5">chevron_right</span>
  </Button>
)
PaginationNextButton.displayName = "PaginationNextButton"

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden className={cn("flex size-9 items-center justify-center", className)} {...props}>
    <span className="material-symbols-sharp">more_horiz</span>
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNextButton,
  PaginationNextLink,
  PaginationPreviousButton,
  PaginationPreviousLink,
}
