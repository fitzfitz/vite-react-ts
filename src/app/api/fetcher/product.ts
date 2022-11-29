import client, { AxiosResponse } from "@tm-wear/app/utils/axiosClient";
import {
  ProductDetailResponseType,
  ProductListResponseType,
} from "../types/product";

const productListFetcher = async ({
  url,
  headers,
}: {
  url: string;
  headers: { [key: string]: string | undefined };
}) =>
  await client
    .get(url, {
      headers,
    })
    .then(({ data }: AxiosResponse<ProductListResponseType>) => {
      return data.success ? data?.data?.data : null;
    });

const productDetailFetcher = async ({
  url,
  headers,
}: {
  url: string;
  headers: { [key: string]: string | undefined };
}) =>
  await client
    .get(url, {
      headers,
    })
    .then(({ data }: AxiosResponse<ProductDetailResponseType>) => {
      return data.success ? data?.data : null;
    })
    .catch(({ response: { data } }) => {
      throw data;
    });

export { productListFetcher, productDetailFetcher };
