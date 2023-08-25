import React from "react";
import { IconType } from "react-icons";

interface InsuranceItemWithIconProps {
    icon: IconType
    label: string
}

export const InsuranceItemWithIcon = ({ icon: Icon, label }: InsuranceItemWithIconProps) => {
    return <span className="flex items-center gap-3">
        <Icon />
        {label}
    </span>
}