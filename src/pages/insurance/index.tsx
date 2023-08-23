import React from "react";
import { Container } from "@/components/general/containers/Container";
import { InsuranceCoverageCard } from "@/components/insurance/InsuranceCoverageCard";
import { MaxSumInsuredCard } from "@/components/insurance/MaxSumInsuredCard";

const insuranceCoverageCardData = {
    totalAnnualPremiums: 1500,
    life: {
        term: false,
        wholeLife: false,
        endowment: true,
        annuity: false,
    },
    accidentAndHealth: {
        medical: true,
        longTermCare: false,
        criticalIllness: true,
        disability: false,
        personalAccident: true,
    },
    others: {
        otherPolicies: true,
    },
};

const maxSumInsuredData = {
    life: 200000,
    accidentAndHealth: 60000,
    others: 24500
}


export const Insurance = () => {

    return <Container className="mt-0">
        <div className="flex flex-row gap-3">
            <InsuranceCoverageCard className="w-[50%]" {...insuranceCoverageCardData} />
            <MaxSumInsuredCard className="w-[50%]" {...maxSumInsuredData} />
        </div>
    </Container>
};
