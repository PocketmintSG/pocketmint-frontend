import { getAccessToken } from "@/utils/Store";
import { getRequestHeader } from "@/utils/api";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_URL = BASE_URL + "/api"

export const UploadImageAPI = (file: File) => {
  const formData = new FormData()
  formData.append("image_file", file)
  return axios.post(`${API_URL}/upload_image`, formData, {
    headers: {
      ...getRequestHeader().headers,
      'Content-Type': 'muiltipart/form-data'
    }
  })
}