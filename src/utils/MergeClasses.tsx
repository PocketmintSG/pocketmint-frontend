import { twMerge } from "tailwind-merge";

type P = {
  classes: string[];
  ignore?: string;
};

/**
 * **This function merges tailwindcss classes into one string by removing same utitlity classes.**
 *
 * @description
 * An issue comes when we put the low specificity classes in the end. So by default this function always remove low specificity classes and will keep high specificity classes (only if we have defined same classes two times with different values). In order to solve it there is parameter `ignore` that helps us to ignore a particular class to go through the merge algorithm and just gets putted in the end of the return string.
 *
 * @param params - It is an {@link P object} which has two properties called `classes` and `ignore`.
 * @returns merged classes (string)
 * @exmaple
 * ```ts
 * mergeClasses({
 *      classes: ['px-2 py-1 bg-red','p-3 bg-[#B91C1C]'],
 *      ignore: 'bg-green-400'
 * })
 * => 'p-3 bg-[#B91C1C] bg-green-400'
 * ```
 */
export function mergeClasses(params: P) {
  const { classes, ignore = "" } = params;
  const mergedClasses = twMerge(...classes);

  return `${mergedClasses} ${ignore}`;
}
