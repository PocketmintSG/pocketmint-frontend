import React, { ComponentPropsWithoutRef } from "react"
import { mergeClasses } from "src/utils/MergeClasses"

type P = ComponentPropsWithoutRef<'section'>

export const Container = ({ children, className = '', ...props }: P) => {
    return (
        <section
            className={mergeClasses({ classes: ["w-full mx-auto -mt-3 pl-5 pr-5", className] })}
            {...props}
        >
            {children}
        </section>
    )
}
