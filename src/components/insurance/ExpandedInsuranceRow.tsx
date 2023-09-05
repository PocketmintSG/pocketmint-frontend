import { ReadInsuranceAPI } from "@/api/insurance";
import { InsuranceDialog, InsuranceDialogActions } from "@/components/insurance/InsuranceDialog";
import { InsuranceItemWithIcon } from "@/components/insurance/InsuranceItemWithIcon";
import { Badge } from "@/components/ui/badge";
import { InsuranceModel } from "@/types/insurance";
import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsClipboard, BsFillTelephoneFill } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa"
import { FadeLoader } from "react-spinners";

export const ExpandedInsuranceRow = (data) => {
    const [insuranceDetails, setInsuranceDetails] = useState<InsuranceModel>()
    useEffect(() => {
        ReadInsuranceAPI(data.data._id).then(res => {
            setInsuranceDetails(res.data.data)
        })
    }, [])

    if (insuranceDetails === undefined) {
        return <div className="w-full p-5 bg-grey-200 flex flex-col justify-center items-center">
            <FadeLoader />
        </div>
    }

    const maturityDate = new Date(insuranceDetails.policy_details.maturity_date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })

    return <div className="w-full p-5 bg-grey-200 flex flex-col" key={data.data._id}>
        <div className='w-full grid grid-cols-[80%,20%]'>
            <div className="flex flex-col w-full">
                <p className="text-lg font-semibold">
                    {insuranceDetails?.policy_details.insurance_name}
                </p>
                <div className="w-full mt-1">
                    {insuranceDetails?.insurance_coverage.coverage_details.map(c => <Badge variant="outline">{c.insurance_type}</Badge>)}
                </div>
                <div className="grid grid-cols-2 mt-2">
                    <div className="grid grid-rows-4 gap-3">
                        <span className="font-semibold text-md">Important Details</span>
                        <div className="flex gap-3">
                            <InsuranceItemWithIcon label={insuranceDetails?.agent_details.name + ", " + insuranceDetails?.agent_details.contact_number} icon={BsFillTelephoneFill} />
                            <InsuranceItemWithIcon label={insuranceDetails?.policy_details.policy_number!} icon={BsClipboard} />
                        </div>
                        <div className="flex gap-3">
                            <InsuranceItemWithIcon
                                label={"Maturity: " + maturityDate} icon={AiOutlineClockCircle} />
                        </div>
                        <div className="flex gap-3">
                            <InsuranceItemWithIcon label={"Insured: " + insuranceDetails?.policy_details.insured_person!} icon={FaAddressBook} />
                            <InsuranceItemWithIcon label={"Insured By: " + insuranceDetails?.policy_details.insurer!} icon={FaAddressBook} />
                        </div>
                    </div>
                    <div className="flex flex-row gap-6">
                        <div className="flex flex-col">
                            <span className="text-lg">{insuranceDetails?.insurance_coverage.cash_premiums}</span>
                            <span className="text-sm">
                                Cash Premiums
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg">{insuranceDetails?.insurance_coverage.non_cash_premiums}</span>
                            <span className="text-sm">
                                Non-Cash Premiums
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg">{insuranceDetails?.insurance_coverage.total_premiums}</span>
                            <span className="text-sm">
                                Total Premiums
                            </span>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex flex-col items-end'>
                <span className="text-lg">{insuranceDetails?.policy_details.insured_person}</span>
                <span className="text-caption -mt-1">Beneficiary</span>
            </div>
        </div>
        <div className="bg-grey-500 rounded pt-8 pb-10 pl-5 pr-5 mt-5">{insuranceDetails?.description.desc_text}</div>
        <InsuranceDialog buttonLabel="View/Edit Insurance" currentAction={InsuranceDialogActions.READ_INSURANCE} className="w-[20% mt-3 place-self-end" insuranceData={insuranceDetails} insuranceId={data.data._id} setInsuranceSummary={data["setInsuranceSummary"]} setInsuranceList={data["setInsuranceList"]} setIsLoadingInsurance={data["setIsLoadingInsurance"]} setIsLoadingSummary={data["setIsLoadingSummary"]} insuranceCategory={data["insuranceCategory"]} />
    </div>
}