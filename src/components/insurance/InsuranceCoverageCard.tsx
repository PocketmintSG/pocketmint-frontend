import { InsuranceCoverageItemWrapper } from "@/components/insurance/InsuranceCoverageItemWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export interface InsuranceCoverageCardProps {
    "total_annual_premiums": number
    "life": {
        "term": boolean,
        "whole_life": boolean
        "universal_life": boolean
    }
    "accident_and_health": {
        "hospitalization": boolean
        "critical_illness": boolean
        "personal_accident": boolean
        "private_integrated_shield_plans": boolean
    }
    "investments": {
        "endowment": boolean
        "investment_related": boolean
        "retirement": boolean
    }
    "others": boolean
    className: string
}

export const InsuranceCoverageCard = ({ total_annual_premiums: totalAnnualPremiums, life, accident_and_health: accidentAndHealth, investments, others, className }: InsuranceCoverageCardProps) => {
    return <Card className={className}>
        <CardHeader>
            <CardTitle className="text-lg">Insurance Coverage</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
            <div>
                <span className="font-light">Total Annual Premiums</span>
                <p className="font-semibold text-1.5xl">SGD ${totalAnnualPremiums}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row w-full">
                    <img src="/src/assets/insurance/LifeLogo.svg" alt="Life Logo" className="w-[60px] h-[60px]" />
                    <div className="ml-10">
                        <span className="font-semibold text-md">Life</span>
                        <ul className="grid grid-cols-2 grid-rows-2">
                            <InsuranceCoverageItemWrapper label="Term" checked={life.term} />
                            <InsuranceCoverageItemWrapper label="Whole Life" checked={life.whole_life} />
                            <InsuranceCoverageItemWrapper label="Universal Life" checked={life.universal_life} />
                        </ul>
                    </div>
                </div>
                <div className="flex flex-row w-full">
                    <img src="/src/assets/insurance/AccidentAndHealthLogo.svg" alt="Accident and Health Logo" className="w-[60px] h-[60px]" />
                    <div className="ml-10">
                        <span className="font-semibold text-md">Accident & Health</span>
                        <ul className="grid grid-cols-2 grid-rows-2">
                            <InsuranceCoverageItemWrapper label="Hospitalization" checked={accidentAndHealth.hospitalization} />
                            <InsuranceCoverageItemWrapper label="Critical Illness" checked={accidentAndHealth.critical_illness} />
                            <InsuranceCoverageItemWrapper label="Personal Accident" checked={accidentAndHealth.personal_accident} />
                            <InsuranceCoverageItemWrapper label="Integrated Shield Plans" checked={accidentAndHealth.private_integrated_shield_plans} />
                        </ul>
                    </div>
                </div>

                <div className="flex flex-row w-full">
                    <img src="/src/assets/insurance/InsuranceLogo.svg" alt="Insurance Logo" className="w-[60px] h-[60px]" />
                    <div className="ml-10">
                        <span className="font-semibold text-md">Investments</span>
                        <ul className="grid grid-cols-2 grid-rows-2">
                            <InsuranceCoverageItemWrapper label="Endowment" checked={investments.endowment} />
                            <InsuranceCoverageItemWrapper label="Investment-Related" checked={investments.investment_related} />
                            <InsuranceCoverageItemWrapper label="Retirement" checked={investments.retirement} />
                        </ul>
                    </div>
                </div>

                <div className="flex flex-row w-full">
                    <img src="/src/assets/insurance/OthersLogo.svg" alt="Others Logo" className="w-[60px] h-[60px]" />
                    <div className="ml-10">
                        <span className="font-semibold text-md">Others</span>
                        <ul className="grid grid-cols-2 grid-rows-2">
                            <InsuranceCoverageItemWrapper label="Other Policies" checked={others} />
                        </ul>
                    </div>
                </div>
            </div>

        </CardContent>
    </Card >
}