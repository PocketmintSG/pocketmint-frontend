import axios, { AxiosResponse } from "axios"
import { User } from "firebase/auth"

const BASE_URL = import.meta.env.VITE_ENV === "dev" ? import.meta.env.VITE_BACKEND_DEV_URL : import.meta.env.VITE_BACKEND_PROD_URL

export const loginUserAPI = async (authToken: string): Promise<User> => {
  return axios.post(BASE_URL + "/login", {
    authToken
  }).then((res: AxiosResponse<User>) => {
    console.log(res)
    const userData: User = res.data
    return userData;
  })
}