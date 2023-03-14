import React from "react";
import { resellerFetcher } from "@tm-wear/app/api/fetcher/reseller";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import shopee from "@tm-wear/assets/shopee.svg";
import tokopedia from "@tm-wear/assets/tokopedia.svg";
import instagram from "@tm-wear/assets/instagram.svg";

interface Props {
  reseller: string;
}

const Reseller = ({ reseller }: Props) => {
  const { data } = useQuery(
    [`/catalog/reseller`],
    () =>
      resellerFetcher({
        url: `/catalog/reseller`,
        headers: { reseller },
      }),
    {
      enabled: !!reseller,
    }
  );
  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-6 shadow-md">
      <div className="flex items-center gap-5">
        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
          <svg
            className="absolute -left-1 h-12 w-12 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="flex flex-col">
          <Link className="text-blue-600 underline" to={`/${reseller}`}>
            {data?.name}
          </Link>
          {data?.createdAt ? (
            <span className="text-xs italic text-gray-500">
              Member sejak {format(new Date(data?.createdAt), "dd MMM yyyy")}
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          {data?.instagram ? (
            <a
              href={data?.instagram}
              rel="noreferrer"
              target="_blank"
              className={`${data?.instagram ? "opacity-100" : "opacity-30"}`}
            >
              <img src={instagram} alt="instagram" width="20" />
            </a>
          ) : null}
          {data?.shopee ? (
            <a
              href={data?.shopee}
              rel="noreferrer"
              target="_blank"
              className={`${data?.shopee ? "opacity-100" : "opacity-30"}`}
            >
              <img src={shopee} alt="shopee" width="20" />
            </a>
          ) : null}
          {data?.tokopedia ? (
            <a
              href={data?.tokopedia}
              rel="noreferrer"
              target="_blank"
              className={`${data?.tokopedia ? "opacity-100" : "opacity-30"}`}
            >
              <img src={tokopedia} alt="tokopedia" width="20" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Reseller;
