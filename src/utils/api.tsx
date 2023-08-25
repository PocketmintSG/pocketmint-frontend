import { getAccessToken } from "@/utils/Store";

export const BASE_URL = import.meta.env.VITE_BASE_URL
export const API_URL = BASE_URL + "/api"

export const accessToken = getAccessToken()
export const requestHeader = {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
};