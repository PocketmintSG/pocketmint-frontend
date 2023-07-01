
import React, {
  ComponentPropsWithRef,
  forwardRef,
  ForwardRefExoticComponent
} from 'react'
import { mergeClasses } from 'src/utils/MergeClasses'

type P = ComponentPropsWithRef<'button'> & {
  ignoreClasses?: string
}

/**
 * **This is Primary Variant of Button Component**
 *
 * @description
 * Used for call-to-actions, primary actions, user prompts and other really important things that usually targets the business needs.
 *
 * @param ignoreClasses - classes that have to be ignored while merging with default classes
 * @param props - all the props of the button element
 *
 * @returns Button Element
 */
export const ButtonFilled: ForwardRefExoticComponent<P> =
  forwardRef<HTMLButtonElement>((props: P, ref) => {
    const { children, className = '', ignoreClasses = '', ...restProps } = props

    return (
      <button
        ref={ref}
        className={mergeClasses({
          classes: [
            'px-4 py-3 hover:bg-primary-400 hover:text-white transition duration-[300ms] ease-in-out leading-tight rounded-[4px] bg-primary-500 text-white disabled:opacity-40',
            className
          ],
          ignore: ignoreClasses
        })}
        {...restProps}
      >
        {children}
      </button>
    )
  })
