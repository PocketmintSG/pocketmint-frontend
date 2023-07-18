import axios from "axios";
import { LoginUserCredentials } from "src/types/auth";

const BASE_URL = "http://127.0.0.1:8000";

export const loginUserAPI = async ({
  email,
  password,
}: LoginUserCredentials) => {
  console.log("Calling API to log in user");
  return axios
    .post(BASE_URL + "/login", {
      email,
      password,
    })
    .then((res) => {
      console.log(res);
      return res;
    });
};
