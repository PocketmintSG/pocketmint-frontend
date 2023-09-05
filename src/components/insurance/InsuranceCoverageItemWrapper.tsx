import React from "react";

interface InsuranceCoverageItemWrapperProps {
    label: string
    checked: boolean
}

export const InsuranceCoverageItemWrapper = ({ label, checked }: InsuranceCoverageItemWrapperProps) => {
    return <li className={`${checked ? "text-black" : "text-darkGrey-400"}`}>{`${checked ? "✓" : "-"}`} {label}</li>
}