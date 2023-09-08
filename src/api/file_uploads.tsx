import { API_URL, getRequestHeader } from "@/utils/api";
import axios from "axios";


export const UploadImageAPI = async (file: File) => {
  const formData = new FormData()
  formData.append("image_file", file)
  const header = await getRequestHeader()
  return axios.post(`${API_URL}/upload_image`, formData, {
    headers: {
      ...header.headers,
      'Content-Type': 'muiltipart/form-data'
    }
  })
}