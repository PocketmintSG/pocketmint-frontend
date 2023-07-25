import { BaseAPIResponse } from "@/types/api";
import { getAccessToken, getUser } from "@/utils/Store";
import axios, { AxiosResponse } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_URL = BASE_URL + "/api"

const token = getAccessToken()
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const SettingsUpdatePasswordAPI = (email: string, oldPassword: string, newPassword: string, confirmNewPassword: string): Promise<AxiosResponse<BaseAPIResponse>> => {
  return axios.post(`${API_URL}/profile_change_password`, {
    "email": email,
    "old_password": oldPassword,
    "new_password": newPassword,
    "confirm_new_password": confirmNewPassword
  }, config)
}

