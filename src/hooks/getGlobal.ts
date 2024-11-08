import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const getGlobal = <T>(
  _Tname: T,
  queryKey: string[],
  service: any,
  opts: UseQueryOptions<T[], Error, any, any> | undefined
) => {
  return useQuery<T[], Error, any, any>({
    queryKey: queryKey,
    queryFn: service.getall,
    ...opts,
  });
};
export default getGlobal;
