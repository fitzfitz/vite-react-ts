import client, { AxiosResponse } from "@tm-wear/app/utils/axiosClient";
import {
  ProductCategoryType,
  ProductListResponseType,
  ProductType,
} from "../types/product";

import { BaseApiResponse } from "../types/base";

type Props = {
  url: string;
  headers?: { [key: string]: string | undefined };
};

const productListFetcher = async ({ url, headers }: Props) =>
  await client
    .get(url, {
      headers,
    })
    .then(({ data }: AxiosResponse<ProductListResponseType>) => {
      return data.success ? data?.data : null;
    });

const productDetailFetcher = async ({ url, headers }: Props) =>
  await client
    .get(url, {
      headers,
    })
    .then(({ data }: AxiosResponse<BaseApiResponse<ProductType>>) => {
      return data.success ? data?.data : null;
    })
    .catch(({ response: { data } }) => {
      throw data;
    });

const productCategoryFetcher = async () =>
  await client
    .get("/catalog/product-category/")
    .then(({ data }: AxiosResponse<BaseApiResponse<ProductCategoryType[]>>) => {
      return data.success ? data?.data : null;
    })
    .catch(({ response: { data } }) => {
      throw data;
    });

export { productListFetcher, productDetailFetcher, productCategoryFetcher };
