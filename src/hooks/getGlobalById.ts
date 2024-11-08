import { useQuery } from "@tanstack/react-query";

const getGlobalById = <T>(
  _Tname: T,
  queryKey: string[],
  service: any,
  opts: object | undefined,
  id: number
) => {
  return useQuery<T[], Error, any, any>({
    queryKey: queryKey,
    queryFn: () => service.getById(id),
    ...opts,
  });
};
export default getGlobalById;
