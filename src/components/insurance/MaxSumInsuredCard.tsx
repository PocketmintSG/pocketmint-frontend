import { InsuranceCoverageItemWrapper } from "@/components/insurance/InsuranceCoverageItemWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface MaxTotalPremium {
    "_id": null,
    "max_total_premiums": number
}
export interface InsuranceCoverageCardProps {
    "life": number
    "accident_and_health": number
    "investments": number
    "others": number
    className: string
}

export const MaxSumInsuredCard = ({ life, "accident_and_health": accidentAndHealth, investments, others, className }: InsuranceCoverageCardProps) => {
    return <Card className={className}>
        <CardHeader>
            <CardTitle className="text-lg">Maximum Sum Insured</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-5">
                <div className="flex flex-row gap-10">
                    <img src="/src/assets/insurance/LifeLogo.svg" alt="Life Logo" className="w-[60px] h-[60px]" />
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-md">Life</span>
                        <p className="font-light">Term: ${life}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-10">
                    <img src="/src/assets/insurance/AccidentAndHealthLogo.svg" alt="Accident and Health Logo" className="w-[60px] h-[60px]" />
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-md">Accident and Health</span>
                        <p className="font-light">Medical: ${accidentAndHealth}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-10">
                    <img src="/src/assets/insurance/InsuranceLogo.svg" alt="Accident and Health Logo" className="w-[60px] h-[60px]" />
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-md">Investments</span>
                        <p className="font-light">Total Payments: ${investments}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-10">
                    <img src="/src/assets/insurance/GeneralLogo.svg" alt="General Logo" className="w-[60px] h-[60px]" />
                    <div>
                        <span className="font-semibold text-md">General</span>
                        <p className="font-light">General Policies: ${others}</p>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card >
}