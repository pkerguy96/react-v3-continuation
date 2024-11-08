import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const getGlobalv2 = <T>(
  _Tname: T,
  queryKey: string[],
  service: any,
  page = 0, // Default page number
  pageSize = 20,
  searchQuery?: string, // Default page size
  opts?: UseQueryOptions<T[], Error, any, any>
) => {
  const paginatedQueryKey = [...queryKey, page, pageSize, searchQuery]; // Append page and pageSize to the query key

  return useQuery<T[], Error, any, any>({
    queryKey: paginatedQueryKey,
    queryFn: async () => {
      const response = await service.getalls(page, pageSize, searchQuery);

      // Pass page and pageSize to getall function
      return response;
    },
    /* keepPreviousData: true, */

    ...opts,
  });
};

export default getGlobalv2;
