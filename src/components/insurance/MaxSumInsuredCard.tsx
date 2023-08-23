import { InsuranceCoverageItemWrapper } from "@/components/insurance/InsuranceCoverageItemWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export interface InsuranceCoverageCardProps {
    life: number
    accidentAndHealth: number
    others: number
    className: string
}

export const MaxSumInsuredCard = ({ life, accidentAndHealth, others, className }: InsuranceCoverageCardProps) => {
    return <Card className={className}>
        <CardHeader>
            <CardTitle className="text-lg">Maximum Sum Insured</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-10">
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
                        <span className="font-semibold text-md">Life</span>
                        <p className="font-light">Medical: ${accidentAndHealth}</p>
                    </div>
                </div>

                <div className="flex flex-row gap-10">
                    <img src="/src/assets/insurance/OthersLogo.svg" alt="Others Logo" className="w-[60px] h-[60px]" />
                    <div>
                        <span className="font-semibold text-md">Others</span>
                        <p className="font-light">Other Policies: ${others}</p>
                    </div>
                </div>
            </div>

        </CardContent>
    </Card >
}