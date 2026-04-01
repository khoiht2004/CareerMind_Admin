import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }) {
  return <li {...props} />
}

function PaginationPrevious({ className, disabled, onClick, href, ...props }) {
  const Comp = href ? "a" : "button"
  return (
    <Comp
      href={href}
      onClick={onClick}
      disabled={Comp === "button" ? disabled : undefined}
      aria-disabled={disabled}
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "gap-1 pl-2.5",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      <ChevronLeft className="size-4" />
      <span>Trước</span>
    </Comp>
  )
}

function PaginationNext({ className, disabled, onClick, href, ...props }) {
  const Comp = href ? "a" : "button"
  return (
    <Comp
      href={href}
      onClick={onClick}
      disabled={Comp === "button" ? disabled : undefined}
      aria-disabled={disabled}
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "gap-1 pr-2.5",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      <span>Sau</span>
      <ChevronRight className="size-4" />
    </Comp>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
}
