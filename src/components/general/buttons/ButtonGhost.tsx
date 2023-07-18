import React, {
  ComponentPropsWithRef,
  forwardRef,
  ForwardRefExoticComponent,
} from "react";
import { ButtonFilled } from "src/components/general/buttons/ButtonFilled";
import { mergeClasses } from "src/utils/MergeClasses";

type P = ComponentPropsWithRef<"button"> & {
  ignoreClasses?: string;
};

/**
 * **This is Primary Alternative Variant of Button Component**
 *
 * @description
 * Used for call-to-actions, primary actions, user prompts and other really important things that usually targets the business needs.
 *
 * @param ignoreClasses - classes that have to be ignored while merging with default classes
 * @param props - all the props of the button element
 *
 * @returns Button Element
 */
export const ButtonGhost: ForwardRefExoticComponent<P> =
  forwardRef<HTMLButtonElement>((props: P, ref) => {
    const {
      children,
      className = "",
      ignoreClasses = "",
      ...restProps
    } = props;

    return (
      <ButtonFilled
        ref={ref}
        className={mergeClasses({
          classes: [
            "bg-white text-theme-black hover:bg-primary-500 group-hover:text-white border-[1px]",
            className,
          ],
        })}
        ignoreClasses={ignoreClasses}
        {...restProps}
      >
        {children}
      </ButtonFilled>
    );
  });
