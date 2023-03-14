import client, { AxiosResponse } from "@tm-wear/app/utils/axiosClient";
import { ResellerResponseType } from "../types/reseller";

type Props = {
  url: string;
  headers?: { [key: string]: string | undefined };
};

const resellerFetcher = async ({ url, headers }: Props) =>
  await client
    .get(url, { headers })
    .then(({ data }: AxiosResponse<ResellerResponseType>) => {
      return data.success ? data?.data : null;
    });

export { resellerFetcher };
