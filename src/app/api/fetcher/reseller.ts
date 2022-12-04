import client, { AxiosResponse } from "@tm-wear/app/utils/axiosClient";
import { ResellerResponseType } from "../types/reseller";

const resellerFetcher = async (url: string) =>
  await client
    .get(url)
    .then(({ data }: AxiosResponse<ResellerResponseType>) => {
      return data.success ? data?.data : null;
    });

export { resellerFetcher };
