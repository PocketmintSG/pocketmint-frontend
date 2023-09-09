import { InsuranceCoverageItemWrapper } from "@/components/insurance/InsuranceCoverageItemWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { BiSolidBuoy, BiSolidShieldPlus } from "react-icons/bi";
import { BsFillHeartPulseFill, BsShieldFillPlus } from "react-icons/bs";
import { MdOtherHouses } from "react-icons/md";

interface MaxTotalPremium {
    "_id": null,
    "max_total_premiums": number
}
export interface InsuranceCoverageCardProps {
    "life": number[]
    "accident_and_health": number[]
    "investments": number[]
    "general": number[]
    className: string
}

export const MaxSumInsuredCard = ({ life, "accident_and_health": accidentAndHealth, investments, general, className }: InsuranceCoverageCardProps) => {
    return <Card className={className}>
        <CardHeader>
            <CardTitle className="text-lg">Maximum Sum Insured</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-5">
                <div className="flex flex-row gap-10">
                    <BiSolidBuoy className="w-[60px] h-[60px]" color="#5585FF" />
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-md">Life</span>
                        <p className="font-light">Term: ${life.length > 0 ? life : 0}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-10">
                    <BsFillHeartPulseFill className="w-[60px] h-[60px]" color="#F95757" />
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-md">Accident and Health</span>
                        <p className="font-light">Medical: ${accidentAndHealth.length > 0 ? accidentAndHealth : 0}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-10">
                    <BiSolidShieldPlus className="w-[60px] h-[60px]" color="#00E709" />
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-md">Investments</span>
                        <p className="font-light">Total Payments: ${investments.length > 0 ? investments : 0}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-10">
                    <MdOtherHouses className="w-[60px] h-[60px]" color="#00D1FF" />
                    <div>
                        <span className="font-semibold text-md">General</span>
                        <p className="font-light">General Policies: ${general.length > 0 ? general : 0}</p>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card >
}