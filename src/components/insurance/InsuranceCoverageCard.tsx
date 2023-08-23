import { InsuranceCoverageItemWrapper } from "@/components/insurance/InsuranceCoverageItemWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export interface InsuranceCoverageCardProps {
    totalAnnualPremiums: number
    life: {
        term: boolean,
        wholeLife: boolean
        endowment: boolean
        annuity: boolean
    }
    accidentAndHealth: {
        medical: boolean
        longTermCare: boolean
        criticalIllness: boolean
        disability: boolean
        personalAccident: boolean
    }
    others: {
        otherPolicies: boolean
    }
    className: string
}

export const InsuranceCoverageCard = ({ totalAnnualPremiums, life, accidentAndHealth, others, className }: InsuranceCoverageCardProps) => {
    return <Card className={className}>
        <CardHeader>
            <CardTitle className="text-lg">Insurance Coverage</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
            <div>
                <span className="font-light">Total Annual Premiums</span>
                <p className="font-semibold text-1.5xl">SGD ${totalAnnualPremiums}</p>
            </div>
            <div className="flex flex-col gap-10">
                <div className="flex flex-row gap-10">
                    <img src="/src/assets/insurance/LifeLogo.svg" alt="Life Logo" className="w-[60px] h-[60px]" />
                    <div>
                        <span className="font-semibold text-md">Life</span>
                        <ul className="grid grid-cols-2 grid-rows-2 gap-3">
                            <InsuranceCoverageItemWrapper label="Term" checked={life.term} />
                            <InsuranceCoverageItemWrapper label="Endowment" checked={life.endowment} />
                            <InsuranceCoverageItemWrapper label="Whole Life" checked={life.wholeLife} />
                            <InsuranceCoverageItemWrapper label="Annuity" checked={life.annuity} />
                        </ul>
                    </div>
                </div>
                <div className="flex flex-row gap-10">
                    <img src="/src/assets/insurance/AccidentAndHealthLogo.svg" alt="Accident and Health Logo" className="w-[60px] h-[60px]" />
                    <div>
                        <span className="font-semibold text-md">Accident & Health</span>
                        <ul className="grid grid-cols-2 grid-rows-2 gap-3">
                            <InsuranceCoverageItemWrapper label="Medical" checked={accidentAndHealth.medical} />
                            <InsuranceCoverageItemWrapper label="Critical Illness" checked={accidentAndHealth.criticalIllness} />
                            <InsuranceCoverageItemWrapper label="Personal Accident" checked={accidentAndHealth.personalAccident} />
                            <InsuranceCoverageItemWrapper label="Long Term Care" checked={accidentAndHealth.longTermCare} />
                            <InsuranceCoverageItemWrapper label="Disability" checked={accidentAndHealth.disability} />
                        </ul>
                    </div>
                </div>

                <div className="flex flex-row gap-10">
                    <img src="/src/assets/insurance/OthersLogo.svg" alt="Others Logo" className="w-[60px] h-[60px]" />
                    <div>
                        <span className="font-semibold text-md">Others</span>
                        <ul className="grid grid-cols-2 grid-rows-2 gap-3">
                            <InsuranceCoverageItemWrapper label="Other Policies" checked={others.otherPolicies} />
                        </ul>
                    </div>
                </div>
            </div>

        </CardContent>
    </Card >
}