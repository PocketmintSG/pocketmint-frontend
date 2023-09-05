import { BaseAPIResponse } from "@/types/api";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_URL = BASE_URL + "/api"

export const loginUserAPI = async (userToken: string): Promise<BaseAPIResponse> => {
  return axios.post(API_URL + "/login", {
    token: userToken,
  })
};

export const registerUserAPI = async (userToken: string, username: string, firstName: string, lastName: string): Promise<BaseAPIResponse> => {
  return axios.post(API_URL + "/register", {
    "token": userToken,
    "username": username,
    "first_name": firstName,
    "last_name": lastName
  })
};