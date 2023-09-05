import { cn } from "@/lib/utils"
import React from "react"

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  labelTitle: string
  labelContent: string
  labelTitleProps?: string
  labelContentProps?: string
}

export const Label = React.forwardRef<
  HTMLDivElement,
  LabelProps
>(({ className, labelTitle, labelContent, labelTitleProps = "", labelContentProps = "", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col",
      className
    )}
    {...props}
  >
    <p className={cn("font-medium text-darkGrey-600 text-sm", labelTitleProps)}>{labelTitle}</p>
    <p className={cn("text-lg", labelContentProps)}>{labelContent}</p>
  </div>
))