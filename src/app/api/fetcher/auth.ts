import client, { AxiosResponse } from "@tm-wear/app/utils/axiosClient";
import { AuthParamsType, AuthResponseType } from "../types/auth";

const authLoginResellerFetcher = async (data: AuthParamsType) =>
  await client
    .post("https://thrift-api.themonograf.com/api/catalog/login", data)
    .then(({ data }: AxiosResponse<AuthResponseType>) => {
      return data.success ? data : null;
    })
    .catch((err) => err.response);

export { authLoginResellerFetcher };
