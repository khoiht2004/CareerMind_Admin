import * as React from "react"
import { cn } from "@/lib/utils"

function Field({ className, orientation = "vertical", ...props }) {
  return (
    <div
      data-slot="field"
      className={cn(
        "flex gap-2",
        orientation === "horizontal" ? "flex-row items-center" : "flex-col",
        className,
      )}
      {...props}
    />
  )
}

function FieldLabel({ className, ...props }) {
  return (
    <label
      data-slot="field-label"
      className={cn("shrink-0 text-sm font-medium leading-none text-foreground", className)}
      {...props}
    />
  )
}

export { Field, FieldLabel }
