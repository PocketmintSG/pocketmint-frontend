import { CreateInsuranceAPI, ReadInsuranceAPI, UpdateInsuranceAPI } from "@/api/insurance";
import { ButtonFilled } from "@/components/general/buttons/ButtonFilled";
import { ButtonGhost } from "@/components/general/buttons/ButtonGhost";
import { FormInput, SelectOption } from "@/components/general/form/FormInput";
import { Label } from "@/components/general/form/Label";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { InsuranceCategory, CoverageDetail, LifeInsurance, HealthInsurance, InvestmentInsurance, GeneralInsurance, CoverageType, InsuranceModel } from "@/types/insurance";
import { triggerGenericNotification } from "@/utils/Notifications";
import { getUser } from "@/utils/Store";
import { format, parseISO } from "date-fns";
import { Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FadeLoader } from "react-spinners";
import * as Yup from "yup";

export enum InsuranceDialogActions {
    CREATE_INSURANCE,
    READ_INSURANCE,
    EDIT_INSURANCE
}

interface InsuranceDialogProps {
    buttonLabel: string
    buttonIcon?: IconType
    currentAction: InsuranceDialogActions
    className?: string
}

interface InsuranceFormValues {
    policyDetailsPolicyNumber: string;
    policyDetailsInsuranceName: string;
    policyDetailsCashPremiums: number;
    policyDetailsInsuredPerson: string;
    policyDetailsInsurer: string;
    policyDetailsBeneficiary: string;
    policyDetailsMaturityDate: string;
    insuranceCoverageCashPremiums: number;
    insuranceCoverageNonCashPremiums: number;
    insuranceCoverageInsuranceCategory: string;
    insuranceCoverageCoverageDetails: InsuranceCoverageDetail[];
    agentDetailsName: string;
    agentDetailsContactNumber: string;
    agentDetailsEmail: string;
    agentDetailsAgency: string;
    description: {
        descText: string;
        files: string[]; // You can update the type for files if needed
    };
}

interface InsuranceCoverageDetail {
    insuranceType: GeneralInsurance | LifeInsurance | InvestmentInsurance | HealthInsurance;
    coverageType: CoverageType;
    coverageAmount: number;
}


const selectInsuranceCategoryOptions: SelectOption[] = Object.values(InsuranceCategory).sort().map((ic) => {
    return {
        optionLabel: ic,
        optionValue: ic
    }
})
const selectInsuranceTypeOptions: SelectOption[] = [
    ...Object.values(LifeInsurance),
    ...Object.values(HealthInsurance),
    ...Object.values(InvestmentInsurance),
    ...Object.values(GeneralInsurance),
].sort().map((it) => {
    return {
        optionLabel: it,
        optionValue: it
    }
})

const selectCoverageTypeOptions: SelectOption[] = Object.values(CoverageType).sort().map((ct) => {
    return {
        optionLabel: ct,
        optionValue: ct
    }
})

const insuranceFormSchema = Yup.object().shape({
    policyDetailsPolicyNumber: Yup.string().required("Policy number is required"),
    policyDetailsInsuranceName: Yup.string().required("Insurance name is required"),
    policyDetailsCashPremiums: Yup.number().required("Cash premiums is required"),
    policyDetailsInsuredPerson: Yup.string().required("Insured person is required"),
    policyDetailsInsurer: Yup.string().required("Insurer is required"),
    policyDetailsBeneficiary: Yup.string().required("Beneficiary is required"),
    policyDetailsMaturityDate: Yup.date().required("Maturity date is required"),
    insuranceCoverageCashPremiums: Yup.number().required("Cash premiums is required"),
    insuranceCoverageNonCashPremiums: Yup.number(),
    insuranceCoverageInsuranceCategory: Yup.string().required("Insurance category is required"),
    insuranceCoverageCoverageDetails: Yup.array().of(
        Yup.object().shape({
            insuranceType: Yup.string().required("Insurance type is required"),
            coverageType: Yup.string().required("Coverage type is required"),
            coverageAmount: Yup.string().required("Coverage amount is required"),
        })
    ),
    agentDetailsName: Yup.string().required("Agent name is required"),
    agentDetailsContactNumber: Yup.number().required("Contact number is required"),
    agentDetailsEmail: Yup.string().email("Invalid email").required("Email is required"),
    agentDetailsAgency: Yup.string().required("Agency is required"),
    description: Yup.object().shape({
        descText: Yup.string().required("Description text is required"),
        files: Yup.array(),
    }),
});

// Set initial values to be "" to allow default values "Select a value..." to display in the dropdown
const blankInsuranceCoverageDetail: InsuranceCoverageDetail = { insuranceType: "", coverageType: "", coverageAmount: "" }


export const InsuranceDialog = ({ buttonLabel, buttonIcon: ButtonIcon, currentAction, className = "", ...restProps }: InsuranceDialogProps) => {
    const user = getUser()
    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const insuranceData = restProps["insuranceData"]
    const insuranceId = restProps["insuranceId"]

    const InsuranceForm = ({ setIsOpen, insuranceData, currentAction }) => {
        const [dialogAction, setDialogAction] = useState(currentAction)

        interface CreateInsuranceFormProps {
            setIsOpen: React.Dispatch<React.SetStateAction<Boolean>>
        }

        interface ReadInsuranceFormProps {
            insuranceData: InsuranceModel
        }

        interface UpdateInsuranceFormProps {
            setIsOpen: React.Dispatch<React.SetStateAction<Boolean>>
            insuranceData: InsuranceModel
        }

        const CreateInsuranceForm = ({ setIsOpen }: CreateInsuranceFormProps) => {
            const [isSubmitting, setIsSubmitting] = useState(false)
            const initialValues: InsuranceFormValues = {
                policyDetailsPolicyNumber: "",
                policyDetailsInsuranceName: "",
                policyDetailsCashPremiums: 0,
                policyDetailsInsuredPerson: "",
                policyDetailsInsurer: "",
                policyDetailsBeneficiary: "",
                policyDetailsMaturityDate: "",
                insuranceCoverageCashPremiums: 0,
                insuranceCoverageNonCashPremiums: 0,
                insuranceCoverageInsuranceCategory: "",
                insuranceCoverageCoverageDetails: [{ ...blankInsuranceCoverageDetail }],
                agentDetailsName: "",
                agentDetailsContactNumber: "",
                agentDetailsEmail: "",
                agentDetailsAgency: "",
                description: {
                    "descText": "",
                    "files": []
                }
            }

            const handleSubmit = async (values: InsuranceFormValues, actions: FormikHelpers<InsuranceFormValues>) => {
                console.log(values)
                setIsSubmitting(true)
                const formData: InsuranceModel = {
                    uid: user?.uid!,
                    policy_details: {
                        policy_number: values.policyDetailsPolicyNumber,
                        cash_premiums: values.policyDetailsCashPremiums,
                        insurance_name: values.policyDetailsInsuranceName,
                        insured_person: values.policyDetailsInsuredPerson,
                        insurer: values.policyDetailsInsurer,
                        beneficiary: values.policyDetailsBeneficiary,
                        maturity_date: new Date(values.policyDetailsMaturityDate).toISOString()
                    },
                    insurance_coverage: {
                        cash_premiums: values.insuranceCoverageCashPremiums,
                        insurance_category: values.insuranceCoverageInsuranceCategory,
                        non_cash_premiums: values.insuranceCoverageNonCashPremiums,
                        total_premiums: values.insuranceCoverageCashPremiums + values.insuranceCoverageNonCashPremiums,
                        coverage_details: values.insuranceCoverageCoverageDetails.map(d => ({
                            insurance_type: d.insuranceType,
                            coverage_type: d.coverageType,
                            coverage_amount: d.coverageAmount
                        }))
                    },
                    agent_details: {
                        name: values.agentDetailsName,
                        contact_number: values.agentDetailsContactNumber,
                        email: values.agentDetailsEmail,
                        agency: values.agentDetailsAgency
                    },
                    description: {
                        desc_text: values.description.descText,
                        files: values.description.files
                    }
                }
                CreateInsuranceAPI(formData).then(res => {
                    if (res.status === 200) {
                        triggerGenericNotification("Insurance created succesfully!", "success")
                    } else {
                        triggerGenericNotification("Error creating insurance", "danger")
                    }
                }).finally(() => {
                    setIsSubmitting(false);
                    setIsOpen(false);
                })
            }

            return <DialogContent className="min-w-[80vw] p-[100px] overflow-y-scroll max-h-screen">
                <DialogHeader className="text-1.5xl font-semibold">Create New Insurance</DialogHeader>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={insuranceFormSchema}>
                    {({ values, handleSubmit }) => (
                        <Form>
                            <div className="flex flex-col">
                                <span className="text-xl font-semibold">Policy Details</span>
                                <div className="grid grid-rows-3 grid-cols-2 gap-x-10 gap-y-1 mt-2 mb-12">
                                    <FormInput label="Policy Number" name="policyDetailsPolicyNumber" type="string" placeholder="Enter a number" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Insurance Name" name="policyDetailsInsuranceName" type="text" placeholder="Enter a name" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Cash Premiums" name="policyDetailsCashPremiums" type="number" placeholder="Enter a number" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Insured Person" name="policyDetailsInsuredPerson" type="text" placeholder="Enter a name" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Insurer" name="policyDetailsInsurer" type="text" placeholder="Enter a name" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Beneficiary" name="policyDetailsBeneficiary" type="text" placeholder="Enter a name" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Maturity Date" name="policyDetailsMaturityDate" type="date" className="cursor-pointer" labelProps="font-normal text-md pb-1" />
                                </div>
                                <span className="text-xl font-semibold">Insurance Coverage</span>
                                <div className="grid grid-rows-2 grid-cols-2 gap-x-10 gap-y-1 mt-2 mb-6">
                                    <FormInput label="Cash Premiums" name="insuranceCoverageCashPremiums" type="number" placeholder="Enter a number" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Non-Cash Premiums" name="insuranceCoverageNonCashPremiums" type="number" placeholder="Enter a number" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Insurance Category" name="insuranceCoverageInsuranceCategory" labelProps="font-normal text-md pb-1" type="select" selectOptions={selectInsuranceCategoryOptions} placeholder="Choose an option" />
                                    <span className="self-end">Total Premiums: ${(values.insuranceCoverageCashPremiums === "" && values.insuranceCoverageNonCashPremiums === "" ? 0 : values.insuranceCoverageCashPremiums + values.insuranceCoverageNonCashPremiums)}</span>
                                </div>
                                <span className="text-lg mb-2">Coverage Details</span>
                                <FieldArray name="insuranceCoverageCoverageDetails">
                                    {({ insert, remove, push }) => (
                                        <div className="grid grid-cols-[6fr_6fr_6fr_1fr] gap-x-6 gap-y-3">
                                            <span>Insurance Type</span>
                                            <span>Coverage Type</span>
                                            <span>Coverage Amount</span>
                                            <span></span>
                                            {values.insuranceCoverageCoverageDetails.map((c, idx) => (
                                                <>
                                                    <FormInput type="select" name={`insuranceCoverageCoverageDetails[${idx}].insuranceType`} selectOptions={selectInsuranceTypeOptions} ></FormInput>
                                                    <FormInput type="select" name={`insuranceCoverageCoverageDetails[${idx}].coverageType`} selectOptions={selectCoverageTypeOptions} ></FormInput>
                                                    <FormInput type="number" name={`insuranceCoverageCoverageDetails[${idx}].coverageAmount`} ></FormInput>
                                                    <button onClick={() => remove(idx)} className="justify-self-center align-self-center"><BsTrash className="w-[20px] h-[20px]" /></button>
                                                </>))}
                                            <ButtonGhost className="flex justify-center items-center gap-5 text-primary-500 border-primary-500 mb-12 mt-3" onClick={(e) => {
                                                e.preventDefault()
                                                push({ ...blankInsuranceCoverageDetail })
                                            }}>
                                                <AiOutlinePlus />
                                                Add Coverage
                                            </ButtonGhost>
                                        </div>
                                    )}
                                </FieldArray>
                                <span className="text-xl font-semibold">Agent Details</span>
                                <div className="grid grid-rows-2 grid-cols-2 gap-x-10 gap-y-1 mt-2 mb-6">
                                    <FormInput label="Name" name="agentDetailsName" type="text" placeholder="Enter a name" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Contact Number" name="agentDetailsContactNumber" type="tel" placeholder="Enter a number" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Email" name="agentDetailsEmail" type="email" placeholder="Enter an email" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Agency" name="agentDetailsAgency" type="text" placeholder="Enter an agency name" labelProps="font-normal text-md pb-1" />
                                </div>
                                <label className="text-md font-normal pb-1">
                                    {"Description"}
                                </label>
                                <Field
                                    as={"textarea"}
                                    name={"description.descText"}
                                    placeholder={"Enter a description"}
                                    className={`border-b-[1px] border-black bg-grey-200 p-2 rounded w-full`}
                                    rows={6}
                                />
                                <ButtonFilled type="submit" disabled={isSubmitting} className="mt-12 w-[30%] justify-self-end self-end flex justify-center">
                                    {isSubmitting ?
                                        <FadeLoader radius={"1"} color="#ffffff" />
                                        : "Submit"}
                                </ButtonFilled>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        }

        const ReadInsuranceForm = ({ insuranceData }: ReadInsuranceFormProps) => {
            console.log(insuranceData)
            return <DialogContent className="min-w-[80vw] p-[100px] overflow-y-scroll max-h-screen">
                <DialogHeader className="text-1.5xl font-semibold">{insuranceData.policy_details.insurance_name}</DialogHeader>
                <div className="flex flex-col">
                    <span className="text-xl font-semibold">Policy Details</span>
                    <div className="grid grid-rows-3 grid-cols-2 gap-x-10 gap-y-1 mt-2 mb-12">
                        <Label labelTitle="Policy Number" labelTitleProps="font-normal text-md pb-1" labelContent={insuranceData.policy_details.policy_number} />
                        <Label labelTitle="Insurance Name" labelTitleProps="font-normal text-md pb-1" labelContent={insuranceData.policy_details.insurance_name} />
                        <Label labelTitle="Cash Premiums" labelTitleProps="font-normal text-md pb-1" labelContent={insuranceData.policy_details.cash_premiums.toString()} />
                        <Label labelTitle="Insured Person" labelTitleProps="font-normal text-md pb-1" labelContent={insuranceData.policy_details.insured_person} />
                        <Label labelTitle="Insurer" labelTitleProps="font-normal text-md pb-1" labelContent={insuranceData.policy_details.insurer} />
                        <Label labelTitle="Beneficiary" labelTitleProps="font-normal text-md pb-1" labelContent={insuranceData.policy_details.beneficiary} />
                        <Label labelTitle="Maturity Date" labelTitleProps="font-normal text-md pb-1" labelContent={format(parseISO(insuranceData.policy_details.maturity_date), "dd/MM/yyyy")} />
                    </div>
                    <span className="text-xl font-semibold">Insurance Coverage</span>
                    <div className="grid grid-rows-2 grid-cols-2 gap-x-10 gap-y-1 mt-2 mb-6">
                        <Label labelTitle="Cash Premiums" labelTitleProps="font-normal text-md pb-1" labelContent={insuranceData.insurance_coverage.cash_premiums.toString()} />
                        <Label labelTitle="Non-Cash Premiums" labelTitleProps="font-normal text-md pb-1" labelContent={insuranceData.insurance_coverage.non_cash_premiums.toString()} />
                        <Label labelTitle="Insurance Category" labelTitleProps="font-normal text-md pb-1" labelContent={insuranceData.insurance_coverage.insurance_category} />

                        <span className="self-end">Total Premiums: ${(insuranceData.insurance_coverage.cash_premiums + insuranceData.insurance_coverage.non_cash_premiums)}</span>
                    </div>
                    <span className="text-lg mb-2">Coverage Details</span>
                    <div className="grid grid-cols-3 gap-x-6 gap-y-3">
                        <span>Insurance Type</span>
                        <span>Coverage Type</span>
                        <span>Coverage Amount</span>
                        {insuranceData.insurance_coverage.coverage_details.map(c => (<>
                            <p className="text-lg">{c.insurance_type}</p>
                            <p className="text-lg">{c.coverage_type}</p>
                            <p className="text-lg">{c.coverage_amount}</p>
                        </>))}
                    </div>
                    <span className="text-xl font-semibold">Agent Details</span>
                    <div className="grid grid-rows-2 grid-cols-2 gap-x-10 gap-y-1 mt-2 mb-6">
                        <Label labelTitle="Name" labelTitleProps="font-normal text-md pb-1" labelContent={insuranceData.agent_details.name} />
                        <Label labelTitle="Contact Number" labelTitleProps="font-normal text-md pb-1" labelContent={insuranceData.agent_details.contact_number} />
                        <Label labelTitle="Email" labelTitleProps="font-normal text-md pb-1" labelContent={insuranceData.agent_details.email} />
                        <Label labelTitle="Agency" labelTitleProps="font-normal text-md pb-1" labelContent={insuranceData.agent_details.agency} />
                    </div>
                    <Label labelTitle="Description" labelTitleProps="text-md font-normal pb-1" labelContent={insuranceData.description.desc_text} labelContentProps="pb-[2em]" />
                    <ButtonFilled className="mt-12 w-[30%] justify-self-end self-end flex justify-center" onClick={() => setDialogAction(InsuranceDialogActions.EDIT_INSURANCE)}>
                        Edit Insurance
                    </ButtonFilled>
                </div>
            </DialogContent>
        }

        const UpdateInsuranceForm = ({ setIsOpen, insuranceData }: UpdateInsuranceFormProps) => {
            const [isSubmitting, setIsSubmitting] = useState(false)
            const initialValues: InsuranceFormValues = {
                policyDetailsPolicyNumber: insuranceData.policy_details.policy_number,
                policyDetailsInsuranceName: insuranceData.policy_details.insurance_name,
                policyDetailsCashPremiums: insuranceData.policy_details.cash_premiums,
                policyDetailsInsuredPerson: insuranceData.policy_details.insured_person,
                policyDetailsInsurer: insuranceData.policy_details.insurer,
                policyDetailsBeneficiary: insuranceData.policy_details.beneficiary,
                policyDetailsMaturityDate: insuranceData.policy_details.maturity_date,
                insuranceCoverageCashPremiums: insuranceData.insurance_coverage.cash_premiums,
                insuranceCoverageNonCashPremiums: insuranceData.insurance_coverage.non_cash_premiums,
                insuranceCoverageInsuranceCategory: insuranceData.insurance_coverage.insurance_category,
                insuranceCoverageCoverageDetails: insuranceData.insurance_coverage.coverage_details.map(c => ({
                    insuranceType: c.insurance_type,
                    coverageType: c.coverage_type,
                    coverageAmount: c.coverage_amount
                })),
                agentDetailsName: insuranceData.agent_details.name,
                agentDetailsContactNumber: insuranceData.agent_details.contact_number,
                agentDetailsEmail: insuranceData.agent_details.email,
                agentDetailsAgency: insuranceData.agent_details.agency,
                description: {
                    "descText": insuranceData.description.desc_text,
                    "files": insuranceData.description.files
                }
            }

            const handleSubmit = async (values: InsuranceFormValues, actions: FormikHelpers<InsuranceFormValues>) => {
                setIsSubmitting(true)
                const formData: InsuranceModel = {
                    uid: user?.uid!,
                    policy_details: {
                        policy_number: values.policyDetailsPolicyNumber,
                        cash_premiums: values.policyDetailsCashPremiums,
                        insurance_name: values.policyDetailsInsuranceName,
                        insured_person: values.policyDetailsInsuredPerson,
                        insurer: values.policyDetailsInsurer,
                        beneficiary: values.policyDetailsBeneficiary,
                        maturity_date: new Date(values.policyDetailsMaturityDate).toISOString()
                    },
                    insurance_coverage: {
                        cash_premiums: values.insuranceCoverageCashPremiums,
                        insurance_category: values.insuranceCoverageInsuranceCategory,
                        non_cash_premiums: values.insuranceCoverageNonCashPremiums,
                        total_premiums: values.insuranceCoverageCashPremiums + values.insuranceCoverageNonCashPremiums,
                        coverage_details: values.insuranceCoverageCoverageDetails.map(d => ({
                            insurance_type: d.insuranceType,
                            coverage_type: d.coverageType,
                            coverage_amount: d.coverageAmount
                        }))
                    },
                    agent_details: {
                        name: values.agentDetailsName,
                        contact_number: values.agentDetailsContactNumber,
                        email: values.agentDetailsEmail,
                        agency: values.agentDetailsAgency
                    },
                    description: {
                        desc_text: values.description.descText,
                        files: values.description.files
                    }
                }
                UpdateInsuranceAPI(user?.uid!, insuranceId, formData).then(res => {
                    if (res.status === 200) {
                        triggerGenericNotification("Insurance updated succesfully!", "success")
                    } else {
                        console.log("Error")
                        triggerGenericNotification("Error updated insurance", "danger")
                    }
                }).finally(() => {
                    setIsSubmitting(false);
                    setIsOpen(false);
                })
            }

            return <DialogContent className="min-w-[80vw] p-[100px] overflow-y-scroll max-h-screen">
                <DialogHeader className="text-1.5xl font-semibold">Create New Insurance</DialogHeader>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={insuranceFormSchema}>
                    {({ values, handleSubmit }) => (
                        <Form>
                            <div className="flex flex-col">
                                <span className="text-xl font-semibold">Policy Details</span>
                                <div className="grid grid-rows-3 grid-cols-2 gap-x-10 gap-y-1 mt-2 mb-12">
                                    <FormInput label="Policy Number" name="policyDetailsPolicyNumber" type="string" placeholder="Enter a number" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Insurance Name" name="policyDetailsInsuranceName" type="text" placeholder="Enter a name" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Cash Premiums" name="policyDetailsCashPremiums" type="number" placeholder="Enter a number" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Insured Person" name="policyDetailsInsuredPerson" type="text" placeholder="Enter a name" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Insurer" name="policyDetailsInsurer" type="text" placeholder="Enter a name" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Beneficiary" name="policyDetailsBeneficiary" type="text" placeholder="Enter a name" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Maturity Date" name="policyDetailsMaturityDate" type="date" className="cursor-pointer" labelProps="font-normal text-md pb-1" />
                                </div>
                                <span className="text-xl font-semibold">Insurance Coverage</span>
                                <div className="grid grid-rows-2 grid-cols-2 gap-x-10 gap-y-1 mt-2 mb-6">
                                    <FormInput label="Cash Premiums" name="insuranceCoverageCashPremiums" type="number" placeholder="Enter a number" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Non-Cash Premiums" name="insuranceCoverageNonCashPremiums" type="number" placeholder="Enter a number" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Insurance Category" name="insuranceCoverageInsuranceCategory" labelProps="font-normal text-md pb-1" type="select" selectOptions={selectInsuranceCategoryOptions} placeholder="Choose an option" />
                                    <span className="self-end">Total Premiums: ${(values.insuranceCoverageCashPremiums === "" && values.insuranceCoverageNonCashPremiums === "" ? 0 : values.insuranceCoverageCashPremiums + values.insuranceCoverageNonCashPremiums)}</span>
                                </div>
                                <span className="text-lg mb-2">Coverage Details</span>
                                <FieldArray name="insuranceCoverageCoverageDetails">
                                    {({ insert, remove, push }) => (
                                        <div className="grid grid-cols-[6fr_6fr_6fr_1fr] gap-x-6 gap-y-3">
                                            <span>Insurance Type</span>
                                            <span>Coverage Type</span>
                                            <span>Coverage Amount</span>
                                            <span></span>
                                            {values.insuranceCoverageCoverageDetails.map((c, idx) => (
                                                <>
                                                    <FormInput type="select" name={`insuranceCoverageCoverageDetails[${idx}].insuranceType`} selectOptions={selectInsuranceTypeOptions} ></FormInput>
                                                    <FormInput type="select" name={`insuranceCoverageCoverageDetails[${idx}].coverageType`} selectOptions={selectCoverageTypeOptions} ></FormInput>
                                                    <FormInput type="number" name={`insuranceCoverageCoverageDetails[${idx}].coverageAmount`} ></FormInput>
                                                    <button onClick={() => remove(idx)} className="justify-self-center align-self-center"><BsTrash className="w-[20px] h-[20px]" /></button>
                                                </>))}
                                            <ButtonGhost className="flex justify-center items-center gap-5 text-primary-500 border-primary-500 mb-12 mt-3" onClick={(e) => {
                                                e.preventDefault()
                                                push({ ...blankInsuranceCoverageDetail })
                                            }}>
                                                <AiOutlinePlus />
                                                Add Coverage
                                            </ButtonGhost>
                                        </div>
                                    )}
                                </FieldArray>
                                <span className="text-xl font-semibold">Agent Details</span>
                                <div className="grid grid-rows-2 grid-cols-2 gap-x-10 gap-y-1 mt-2 mb-6">
                                    <FormInput label="Name" name="agentDetailsName" type="text" placeholder="Enter a name" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Contact Number" name="agentDetailsContactNumber" type="tel" placeholder="Enter a number" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Email" name="agentDetailsEmail" type="email" placeholder="Enter an email" labelProps="font-normal text-md pb-1" />
                                    <FormInput label="Agency" name="agentDetailsAgency" type="text" placeholder="Enter an agency name" labelProps="font-normal text-md pb-1" />
                                </div>
                                <label className="text-md font-normal pb-1">
                                    {"Description"}
                                </label>
                                <Field
                                    as={"textarea"}
                                    name={"description.descText"}
                                    placeholder={"Enter a description"}
                                    className={`border-b-[1px] border-black bg-grey-200 p-2 rounded w-full`}
                                    rows={6}
                                />
                                <div className="flex flex-row w-full mt-12 justify-end">
                                    <ButtonGhost disabled={isSubmitting} className="w-[30%] flex justify-center" onClick={() => setDialogAction(InsuranceDialogActions.READ_INSURANCE)}>
                                        Cancel
                                    </ButtonGhost>
                                    <ButtonFilled type="submit" disabled={isSubmitting} className="w-[30%] flex justify-center">
                                        {isSubmitting ?
                                            <FadeLoader radius={"1"} color="#ffffff" />
                                            : "Submit"}
                                    </ButtonFilled>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        }

        if (dialogAction === InsuranceDialogActions.CREATE_INSURANCE) {
            return <CreateInsuranceForm setIsOpen={setIsOpen} />
        } else if (dialogAction === InsuranceDialogActions.READ_INSURANCE) {
            return <ReadInsuranceForm setIsOpen={setIsOpen} insuranceData={insuranceData} />
        } else {
            return <UpdateInsuranceForm setIsOpen={setIsOpen} insuranceData={insuranceData} />
        }

        // { currentAction === InsuranceDialogActions.CREATE_INSURANCE ? <CreateInsuranceForm setIsOpen={setIsOpen} /> : currentAction === InsuranceDialogActions.READ_INSURANCE ? <ReadInsuranceForm setIsOpen={setIsOpen} insuranceData={insuranceData} /> : <UpdateInsuranceForm setIsOpen={setIsOpen} insuranceData={insuranceData} /> }
    }

    return <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className={cn("px-4 py-3 hover:bg-primary-400 hover:text-white transition duration-[300ms] ease-in-out leading-tight rounded-[4px] bg-primary-500 text-white disabled:opacity-40 flex flex-row justify-center items-center w-[20%]", className)} onClick={() => setIsOpen(true)}>
            {ButtonIcon && <ButtonIcon />}
            <span>{buttonLabel}</span>
        </DialogTrigger>

        {/* <CreateInsuranceForm setIsOpen={setIsOpen} /> */}
        {/* <ReadInsuranceForm setIsOpen={setIsOpen} {...restProps} /> */}


        <InsuranceForm setIsOpen={setIsOpen} insuranceData={insuranceData} currentAction={currentAction} />

    </Dialog >
}