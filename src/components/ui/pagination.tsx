import * as React from "react"
import Link from "next/link"

import { type ButtonProps, buttonVariants, Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"

interface PaginationButton {
  withText?: boolean
}

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

const PaginationFirstPageLink = ({
  className,
  withText = true,
  ...props
}: PaginationButton & React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to first page"
    size={withText ? "default" : "icon"}
    className={cn(withText && "gap-1 pl-2.5", className)}
    {...props}
  >
    <span className="material-symbols-sharp w-5">first_page</span>
    {withText && <span>First page</span>}
  </PaginationLink>
)
PaginationFirstPageLink.displayName = "PaginationFirstPageLink"

const PaginationFirstPageButton = ({
  className,
  withText = true,
  ...props
}: PaginationButton & React.ComponentProps<typeof Button>) => (
  <Button
    type="button"
    variant="ghost"
    aria-label="Go to first page"
    size={withText ? "default" : "icon"}
    className={cn(withText && "gap-1 pl-2.5", className)}
    {...props}
  >
    <span className="material-symbols-sharp w-5">first_page</span>
    {withText && <span>First page</span>}
  </Button>
)
PaginationFirstPageButton.displayName = "PaginationFirstPageButton"

const PaginationPreviousLink = ({
  className,
  withText = true,
  ...props
}: PaginationButton & React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size={withText ? "default" : "icon"}
    className={cn(withText && "gap-1 pl-2.5", className)}
    {...props}
  >
    <span className="material-symbols-sharp w-5">chevron_left</span>
    {withText && <span>Previous</span>}
  </PaginationLink>
)
PaginationPreviousLink.displayName = "PaginationPreviousLink"

const PaginationPreviousButton = ({
  className,
  withText = true,
  ...props
}: PaginationButton & React.ComponentProps<typeof Button>) => (
  <Button
    type="button"
    variant="ghost"
    aria-label="Go to previous page"
    size={withText ? "default" : "icon"}
    className={cn(withText && "gap-1 pl-2.5", className)}
    {...props}
  >
    <span className="material-symbols-sharp w-5">chevron_left</span>
    {withText && <span>Previous</span>}
  </Button>
)
PaginationPreviousButton.displayName = "PaginationPreviousButton"

const PaginationNextLink = ({
  className,
  withText = true,
  ...props
}: PaginationButton & React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size={withText ? "default" : "icon"}
    className={cn(withText && "gap-1 pr-2.5", className)}
    {...props}
  >
    {withText && <span>Next</span>}
    <span className="material-symbols-sharp w-5">chevron_right</span>
  </PaginationLink>
)
PaginationNextLink.displayName = "PaginationNextLink"

const PaginationNextButton = ({
  className,
  withText = true,
  ...props
}: PaginationButton & React.ComponentProps<typeof Button>) => (
  <Button
    type="button"
    variant="ghost"
    aria-label="Go to next page"
    size={withText ? "default" : "icon"}
    className={cn(withText && "gap-1 pr-2.5", className)}
    {...props}
  >
    {withText && <span>Next</span>}
    <span className="material-symbols-sharp w-5">chevron_right</span>
  </Button>
)
PaginationNextButton.displayName = "PaginationNextButton"

const PaginationLastPageLink = ({
  className,
  withText = true,
  ...props
}: PaginationButton & React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to last page"
    size={withText ? "default" : "icon"}
    className={cn(withText && "gap-1 pr-2.5", className)}
    {...props}
  >
    {withText && <span>Last page</span>}
    <span className="material-symbols-sharp w-5">last_page</span>
  </PaginationLink>
)
PaginationLastPageLink.displayName = "PaginationLastPageLink"

const PaginationLastPageButton = ({
  className,
  withText = true,
  ...props
}: PaginationButton & React.ComponentProps<typeof Button>) => (
  <Button
    type="button"
    variant="ghost"
    aria-label="Go to last page"
    size={withText ? "default" : "icon"}
    className={cn(withText && "gap-1 pr-2.5", className)}
    {...props}
  >
    {withText && <span>Last page</span>}
    <span className="material-symbols-sharp w-5">last_page</span>
  </Button>
)
PaginationLastPageButton.displayName = "PaginationLastPageButton"

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
  PaginationLastPageButton,
  PaginationLastPageLink,
  PaginationNextButton,
  PaginationNextLink,
  PaginationFirstPageButton,
  PaginationFirstPageLink,
  PaginationPreviousButton,
  PaginationPreviousLink,
}
