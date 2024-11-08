import { useMutation } from "@tanstack/react-query";

const updateItem = <T>(_Tname: T, service: any) => {
  const mutation = useMutation((params: { data: T; id: number }) => {
    const { id, data } = params;
    return service.UpdateAll(data, id);
  });

  return mutation;
};
export default updateItem;
