import { AxiosResponse } from "axios";

export interface BaseAPIResponse extends AxiosResponse {
  data: {
    status: StatusEnum;
    message: string;
    status_code?: string;
    data?: any;
  }
}


export enum StatusEnum {
  SUCCESS = "success",
  FAILURE = "failure"
}