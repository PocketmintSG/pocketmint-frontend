import { ButtonFilled } from "@/components/general/buttons/ButtonFilled";
import { ButtonGhost } from "@/components/general/buttons/ButtonGhost";
import { FormInput, SelectOption } from "@/components/general/form/FormInput";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { InsuranceCategory, CoverageDetail, LifeInsurance, HealthInsurance, InvestmentInsurance, GeneralInsurance, CoverageType } from "@/types/insurance";
import { Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import { IconType } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import * as Yup from "yup";

interface InsuranceDialogProps {
    buttonLabel: string
    buttonIcon: IconType
    currentAction: "CREATE_INSURANCE" | "READ_INSURANCE" | "EDIT_INSURANCE"
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

const blankInsuranceCoverageDetail = { insuranceType: "", coverageType: "", coverageAmount: "" }

const CreateInsuranceForm = () => {
    // Missing CoverageDetailsInsuranceType, CoverageDetailsCoverageType, CoverageDetailsCoverageAmount, Description
    const initialValues = {
        policyDetailsPolicyNumber: "",
        policyDetailsInsuranceName: "",
        policyDetailsCashPremiums: "",
        policyDetailsInsuredPerson: "",
        policyDetailsInsurer: "",
        policyDetailsBeneficiary: "",
        policyDetailsMaturityDate: "",
        insuranceCoverageCashPremiums: "",
        insuranceCoverageNonCashPremiums: "",
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

    const handleSubmit = async (values, actions) => {
        console.log(values)
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
                            <FormInput label="Contact Number" name="agentDetailsContactNumber" type="number" placeholder="Enter a number" labelProps="font-normal text-md pb-1" />
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
                        <ButtonFilled type="submit" className="mt-12 w-[30%] justify-self-end self-end">Submit</ButtonFilled>
                    </div>
                </Form>
            )}
        </Formik>
    </DialogContent>
}

export const InsuranceDialog = ({ buttonLabel, buttonIcon: ButtonIcon, buttonProps }: InsuranceDialogProps) => {
    return <Dialog>
        <DialogTrigger className="px-4 py-3 hover:bg-primary-400 hover:text-white transition duration-[300ms] ease-in-out leading-tight rounded-[4px] bg-primary-500 text-white disabled:opacity-40 flex flex-row justify-center items-center w-[20%]">
            <ButtonIcon />
            <span>{buttonLabel}</span>
        </DialogTrigger>

        <CreateInsuranceForm />
    </Dialog >
}