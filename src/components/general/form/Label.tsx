import { cn } from "@/lib/utils"
import React from "react"

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  labelTitle: string
  labelContent: string
}

export const Label = React.forwardRef<
  HTMLDivElement,
  LabelProps
>(({ className, labelTitle, labelContent, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col",
      className
    )}
    {...props}
  >
    <p className="font-medium text-darkGrey-600 text-sm">{labelTitle}</p>
    <p className="text-lg">{labelContent}</p>
  </div>
))