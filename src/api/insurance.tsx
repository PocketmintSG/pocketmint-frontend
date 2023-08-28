import { InsuranceModel, InsuranceCategory } from "@/types/insurance"
import { API_URL, requestHeader } from "@/utils/api"
import axios from "axios"

export const CreateInsuranceAPI = async (insuranceData: InsuranceModel) => {
    return axios.post(API_URL + "/create_insurance", insuranceData, requestHeader)
}

export const ReadInsuranceAPI = async (insuranceId: string) => {
    return axios.get(API_URL + "/get_insurance/" + insuranceId, requestHeader)
}

export const ListInsuranceAPI = async (userId: string, insuranceCategory: InsuranceCategory) => {
    return axios.post(API_URL + "/list_insurance", {
        "user_id": userId,
        "insurance_category": insuranceCategory
    }, requestHeader)
}
export const UpdateInsuranceAPI = async (userId: string, insuranceId: string, insuranceData: InsuranceModel) => {
    return axios.post(API_URL + "/update_insurance", {
        "user_id": userId,
        "insurance_id": insuranceId,
        "insurance_data": insuranceData
    }, requestHeader)
}

export const DeleteInsuranceAPI = async (userId: string, insuranceId: string) => {
    return axios.post(API_URL + "/delete_insurance", {
        "user_id": userId,
        "insurance_id": insuranceId
    }, requestHeader)
}

export const FetchInsuranceSummariesAPI = async (userId: string) => {
    return axios.post(API_URL + "/get_insurance_summaries", {
        "user_id": userId
    }, requestHeader)
}