import useSWRInfinite from "swr/infinite";

type Props = {
  url: string;
  limit?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetcher: any;
  extraHeaders?: {
    [key: string]: string | undefined;
  };
};

export const useProductPagination = <T>({
  url,
  limit = 5,
  fetcher,
  extraHeaders,
}: Props) => {
  const getKey = (pageIndex: number, previousPageData: T[]) => {
    if (previousPageData && !previousPageData?.length) return null;
    return {
      url: `${url}?limit=${limit}&page=${pageIndex + 1}`,
      headers: extraHeaders,
    };
  };

  const { data, size, setSize, error, mutate } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateFirstPage: false,
      persistSize: true,
    }
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const dataSet = data?.flat() as T[];

  return {
    dataSet,
    isLoadingMore,
    isReachingEnd,
    error,
    size,
    setSize,
    mutate,
  };
};
