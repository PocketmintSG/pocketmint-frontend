import { BaseAPIResponse } from "@/types/api";
import axios, { AxiosResponse } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_URL = BASE_URL + "/api"

export const loginUserAPI = async (userToken: string): Promise<AxiosResponse<BaseAPIResponse, any>> => {
  return axios.post(API_URL + "/login", {
    token: userToken,
  })
};
