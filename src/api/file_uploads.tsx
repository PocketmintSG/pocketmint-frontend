import { getAccessToken } from "@/utils/Store";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_URL = BASE_URL + "/api"

const token = getAccessToken()
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const UploadImageAPI = (file: File) => {
  const formData = new FormData()
  formData.append("image_file", file)
  return axios.post(`${API_URL}/upload_image`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'muiltipart/form-data'
    }
  })
}