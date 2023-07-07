import React from "react"
import { Field, ErrorMessage } from "formik"
import { mergeClasses } from "src/utils/MergeClasses"

interface FormInputProps {
  label: string,
  name: string,
  type: string,
  placeholder?: string,
  className?: string
}

export const FormInput = ({ label, name, type, placeholder = '', className = '', ...restProps }: FormInputProps) => {
  const classes = mergeClasses(({
    classes: ['flex flex-col', className]
  }))
  return <div className={classes} {...restProps}>
    <label htmlFor={label} className='text-lg font-medium'>{label}</label>
    <Field type={type} name={name} placeholder={placeholder} className="border-b-[1px] border-black bg-grey-200 p-2 rounded" />
    <ErrorMessage className="text-sm text-error mt-1" name={name} component="div" />
  </div>
}