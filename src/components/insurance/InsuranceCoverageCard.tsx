import { InsuranceCoverageItemWrapper } from "@/components/insurance/InsuranceCoverageItemWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { BiSolidBuoy, BiSolidShieldPlus } from "react-icons/bi";
import { BsFillHeartPulseFill, BsShieldFillPlus } from "react-icons/bs";
import { MdOtherHouses } from "react-icons/md";

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
    "general": boolean
    className: string
}

export const InsuranceCoverageCard = ({ total_annual_premiums: totalAnnualPremiums, life, accident_and_health: accidentAndHealth, investments, general, className }: InsuranceCoverageCardProps) => {
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
                    <BiSolidBuoy className="w-[60px] h-[60px]" color="#5585FF" />
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
                    <BsFillHeartPulseFill className="w-[60px] h-[60px]" color="#F95757" />
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
                    <BiSolidShieldPlus className="w-[60px] h-[60px]" color="#00E709" />
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
                    <MdOtherHouses className="w-[60px] h-[60px]" color="#00D1FF" />
                    <div className="ml-10">
                        <span className="font-semibold text-md">General</span>
                        <ul className="grid grid-cols-2 grid-rows-2">
                            <InsuranceCoverageItemWrapper label="General Policies" checked={general} />
                        </ul>
                    </div>
                </div>
            </div>

        </CardContent>
    </Card >
}