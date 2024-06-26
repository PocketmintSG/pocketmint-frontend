import { getAccessToken } from "@/utils/Store";

export const BASE_URL = import.meta.env.VITE_ENV === "dev" ? import.meta.env.VITE_BACKEND_URL_DEV : import.meta.env.VITE_BACKEND_URL_PROD;

export const API_URL = BASE_URL + "/api"

export const getRequestHeader = async () => {
    const accessToken = await getAccessToken()
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }
};