import React from "react";
import { Field, ErrorMessage } from "formik";
import { mergeClasses } from "src/utils/MergeClasses";
import { cn } from "@/lib/utils";

export interface SelectOption {
  optionLabel: string;
  optionValue: string;
}

interface FormInputProps {
  name: string;
  type: string;
  label?: string;
  selectOptions?: SelectOption[];
  labelProps?: string;
  placeholder?: string;
  className?: string;
}

export const FormInput = ({
  label = "",
  name,
  type,
  labelProps = "",
  placeholder = "",
  className = "",
  selectOptions = [],
  ...restProps
}: FormInputProps) => {
  const classes = mergeClasses({
    classes: ["flex flex-col h-min-[50px]", className],
  });
  return (
    <div className={classes} {...restProps}>
      {label &&
        <label htmlFor={label} className={cn("text-lg font-medium", labelProps)}>
          {label}
        </label>
      }
      {type !== "select" &&
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          className={`border-b-[1px] border-black bg-grey-200 p-2 rounded`}
        />
      }
      {type === "select" &&
        <Field
          as="select"
          name={name}
          placeholder={placeholder}
          className="border-b-[1px] border-black bg-grey-200 p-2 rounded invalid:text-grey-400"
        >
          <option key={-1} value="" selected disabled>
            <p>Select an option...</p>
          </option>
          {selectOptions.map((opt, idx) => <option key={idx} value={opt["optionValue"]}>{opt["optionLabel"]}</option>)}
        </Field>
      }

      <ErrorMessage
        className="text-sm text-error mt-1"
        name={name}
        component="div"
      />
    </div >
  );
};
