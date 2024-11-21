//@ts-nocheck
import { useInfiniteQuery } from "@tanstack/react-query";
import { APIClient } from "../services/Http";

interface PaginatedSearchParams {
  search: string;
  page?: number;
}

export const usePaginatedSearch = <T>(
  apiClient: APIClient<T>,
  queryKey: string[],
  initialSearch: string = ""
) => {
  return useInfiniteQuery({
    queryKey: [...queryKey, initialSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await apiClient.getPaginated({ search: initialSearch, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.next_page_url ? lastPage.current_page + 1 : undefined,
  });
};
