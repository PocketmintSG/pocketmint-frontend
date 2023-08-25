export enum InsuranceTypes {
    INSURANCE_GENERAL = "General",
    INSURANCE_HEALTH = "Health",
    INSURANCE_LIFE = "Life",
    INSURANCE_INVESTMENTS = "Investments"
}

export enum LifeInsurance {
    TERM_LIFE = "Term Life",
    WHOLE_LIFE = "Whole Life",
    UNIVERSAL_LIFE = "Universal Life",
}

export enum InvestmentInsurance {
    ENDOWMENT = "Endowment",
    INVESTMENT_RELATED = "Investment Related",
    RETIREMENT = "Retirement",
}

export enum HealthInsurance {
    HOSPITALIZATION = "Hospitalization",
    CRITICAL_ILLNESS = "Critical Illness",
    PERSONAL_ACCIDENT = "Personal Accident",
    PRIVATE_INTEGRATED_SHIELD_PLANS = "Private Integrated Shield Plans",
}

export enum GeneralInsurance {
    HELPER = "Helper",
    TRAVEL = "Travel",
    CAR = "Car",
    DISABILITY = "Disability",
    FURNITURE_AND_HOME_CONTENTS = "Furniture and Home Contents",
    GENERAL_BUILDING = "General Building",
    HOME_MORTGAGE = "Home Mortgage",
}

export enum CoverageType {
    OTHERS = "Others",
    TOTAL_PERMANENT_DISABILITY = "Total Permanent Disability",
    PERSONAL_ACCIDENT = "Personal Accident",
    HOSPITALIZATION_CHARGES = "Hospitalization Charges",
    GENERAL_BUILDING_RENOVATIONS = "General Building/Renovations",
    FURNITURE_HOME_CONTENT = "Furniture/Home Content",
    DISABILITY_HOSPITALIZATION_INCOME = "Disability/Hospitalization Income",
    CRITICAL_ILLNESS = "Critical Illness",
    DEATH = "Death",
}

export interface CoverageDetail {
    insurance_type: GeneralInsurance | LifeInsurance | InvestmentInsurance | HealthInsurance;
    coverage_type: CoverageType;
    coverage_amount: number;
}

export interface InsuranceModelPolicyDetails {
    policy_number: string;
    cash_premiums: number;
    insurance_name: string;
    insured_person: string;
    insurer: string;
    beneficiary: string;
    maturity_date: Date;
}

export interface InsuranceModelInsuranceCoverage {
    cash_premiums: number;
    insurance_type: string;
    non_cash_premiums: number;
    total_premiums: number;
    coverage_details: CoverageDetail[];
}

export interface InsuranceModelAgentDetails {
    name: string;
    contact_number: string;
    email: string;
    agency: string;
}

export interface InsuranceModelDescription {
    desc_text: string;
    files: string[]; // List of file URLs stored on AWS S3 bucket
}

export interface InsuranceModel {
    uid: string;
    policy_details: InsuranceModelPolicyDetails;
    insurance_coverage: InsuranceModelInsuranceCoverage;
    agent_details: InsuranceModelAgentDetails;
    description: InsuranceModelDescription;
}

export interface InsuranceModelMinified {
    _id: string;
    policy_name: string;
    policy_insurer: string;
    policy_insurance_types: string;
    agent_name: string;
    agent_contact_number: string;
    beneficiary: string;
    // insured_by: string;
}