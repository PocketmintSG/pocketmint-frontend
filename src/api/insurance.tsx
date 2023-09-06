import { InsuranceModel, InsuranceCategory } from "@/types/insurance"
import { API_URL, getRequestHeader } from "@/utils/api"
import axios from "axios"

export const CreateInsuranceAPI = async (insuranceData: InsuranceModel) => {
    return axios.post(API_URL + "/create_insurance", insuranceData, getRequestHeader())
}

export const ReadInsuranceAPI = async (insuranceId: string) => {
    return axios.get(API_URL + "/get_insurance/" + insuranceId, getRequestHeader())
}

export const ListInsuranceAPI = async (userId: string, insuranceCategory: InsuranceCategory | "") => {
    // insuranceCategory === "" means to display all insurances
    return axios.post(API_URL + "/list_insurance", {
        "user_id": userId,
        "insurance_category": insuranceCategory
    }, getRequestHeader())
}
export const UpdateInsuranceAPI = async (userId: string, insuranceId: string, insuranceData: InsuranceModel) => {
    return axios.post(API_URL + "/update_insurance", {
        "user_id": userId,
        "insurance_id": insuranceId,
        "updated_details": insuranceData
    }, getRequestHeader())
}

export const DeleteInsuranceAPI = async (userId: string, insuranceId: string) => {
    return axios.post(API_URL + "/delete_insurance", {
        "user_id": userId,
        "insurance_id": insuranceId
    }, getRequestHeader())
}

export const FetchInsuranceSummariesAPI = async (userId: string) => {
    return axios.post(API_URL + "/get_insurance_summaries", {
        "user_id": userId
    }, getRequestHeader())
}