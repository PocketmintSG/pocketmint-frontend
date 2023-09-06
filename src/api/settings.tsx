import { BaseAPIResponse } from "@/types/api";
import { getRequestHeader } from "@/utils/api";
import axios, { AxiosResponse } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_URL = BASE_URL + "/api"


export const SettingsUpdatePasswordAPI = (email: string, oldPassword: string, newPassword: string, confirmNewPassword: string): Promise<AxiosResponse<BaseAPIResponse>> => {
  return axios.post(`${API_URL}/profile_change_password`, {
    "email": email,
    "old_password": oldPassword,
    "new_password": newPassword,
    "confirm_new_password": confirmNewPassword
  }, getRequestHeader())
}

export const SettingsUpdateProfileAPI = (uid: string, username: string, profilePictureURL: string, firstName: string, lastName: string, email: string) => {
  return axios.post(`${API_URL}/update_profile`, {
    uid,
    username,
    "first_name": firstName,
    "last_name": lastName,
    email,
    "profile_picture_url": profilePictureURL,
  }, getRequestHeader())
}
