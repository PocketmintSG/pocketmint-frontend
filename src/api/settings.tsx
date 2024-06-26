import { BaseAPIResponse } from "@/types/api";
import { API_URL, getRequestHeader } from "@/utils/api";
import axios, { AxiosResponse } from "axios";



export const SettingsUpdatePasswordAPI = async (email: string, oldPassword: string, newPassword: string, confirmNewPassword: string): Promise<AxiosResponse<BaseAPIResponse>> => {
  return axios.post(`${API_URL}/profile_change_password`, {
    "email": email,
    "old_password": oldPassword,
    "new_password": newPassword,
    "confirm_new_password": confirmNewPassword
  }, await getRequestHeader())
}

export const SettingsUpdateProfileAPI = async (uid: string, username: string, profilePictureURL: string, firstName: string, lastName: string, email: string) => {
  return axios.post(`${API_URL}/update_profile`, {
    uid,
    username,
    "first_name": firstName,
    "last_name": lastName,
    email,
    "profile_picture_url": profilePictureURL,
  }, await getRequestHeader())
}
