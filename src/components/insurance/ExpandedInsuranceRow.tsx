import { ButtonFilled } from "@/components/general/buttons/ButtonFilled";
import { InsuranceItemWithIcon } from "@/components/insurance/InsuranceItemWithIcon";
import { Badge } from "@/components/ui/badge";
import { InsuranceModel, InsuranceModelMinified } from "@/types/insurance";
import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsClipboard, BsFillTelephoneFill } from "react-icons/bs";
import { FaAd, FaAddressBook } from "react-icons/fa"

const sampleData = {
    "status": "success",
    "message": "Insurance found!",
    "data": {
        "_id": "64e8b95160b78fc8fd967ac8",
        "uid": "65zJmgDad0b0QOt2I7EKmML9T1u2",
        "policy_details": {
            "policy_number": "P002",
            "cash_premiums": 800.0,
            "insurance_name": "Health Insurance",
            "insured_person": "Jane Smith",
            "insurer": "ABC Health",
            "beneficiary": "John Smith",
            "maturity_date": "2032-06-15T00:00:00"
        },
        "insurance_coverage": {
            "cash_premiums": 800.0,
            "insurance_type": "Health Insurance",
            "non_cash_premiums": 0.0,
            "total_premiums": 800.0,
            "coverage_details": [
                {
                    "insurance_type": "Retirement",
                    "coverage_type": "Personal Accident",
                    "coverage_amount": 60500.0
                }
            ]
        },
        "agent_details": {
            "name": "Agent Johnson",
            "contact_number": "987-654-3210",
            "email": "agent2@example.com",
            "agency": "XYZ Health Agency"
        },
        "description": {
            "desc_text": "This is a sample health insurance policy.",
            "files": [
                "https://s3.amazonaws.com/bucket/file3.pdf",
                "https://s3.amazonaws.com/bucket/file4.pdf"
            ]
        }
    }
}

export const ExpandedInsuranceRow = ({ _id: insuranceId }: InsuranceModelMinified) => {
    const [insuranceDetails, setInsuranceDetails] = useState<InsuranceModel>()

    useEffect(() => {
        // ReadInsuranceAPI(insuranceId).then(res => {
        // console.log(res.data.data)
        // setInsuranceDetails(res.data.data)
        // })
        setInsuranceDetails(sampleData.data)
    }, [])

    const maturityDate = new Date(insuranceDetails?.policy_details.maturity_date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })

    return <div className="w-full p-5 bg-grey-200 flex flex-col">
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
        <ButtonFilled className="w-[20%] mt-3 place-self-end">View/Edit Insurance</ButtonFilled>
    </div>
}