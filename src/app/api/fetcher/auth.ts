import axios, { AxiosResponse } from "axios";
import { AuthParamsType, AuthResponseType } from "../types/auth";

const authLoginResellerFetcher = async (data: AuthParamsType) =>
  await axios
    .post("https://thrift-api.themonograf.com/api/catalog/login", data)
    .then(({ data }: AxiosResponse<AuthResponseType>) => {
      return data.success ? data : null;
    })
    .catch((err) => err.response);

export { authLoginResellerFetcher };
