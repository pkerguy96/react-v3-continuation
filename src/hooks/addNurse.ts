import { APIClient } from "../services/Http";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_NURSES } from "../constants";
import { Nurse } from "../pages/AddNurseForm";
const apiclient = new APIClient<Nurse>("/Nurse");
interface Nursecontext {
  previousNurses: Nurse[];
}

export const useAddNurseMutation = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Nurse, Error, Nurse, Nursecontext>({
    mutationFn: async (data: Nurse) => {
      return await apiclient.Postall(data, undefined);
    },
    onMutate: async (newNurse: Nurse) => {
      const previousNurses =
        queryClient.getQueryData<Nurse[]>(CACHE_KEY_NURSES) || [];
      queryClient.setQueryData<Nurse[]>(CACHE_KEY_NURSES, (nurses = []) => [
        newNurse,
        ...nurses,
      ]);
      onAdd();
      return { previousNurses };
    },
    // apiPatient  we get from backend , formPatient is the client side
    onSuccess: (apiPatient, formPatient) => {
      queryClient.setQueryData<Nurse[]>(CACHE_KEY_NURSES, (nurses) =>
        nurses?.map((nurse) => {
          // @ts-ignore
          return nurse.cin === formPatient.cin ? apiPatient.data : nurse;
        })
      );
    },
    onError: (_error, _newNurse, context) => {
      if (!context) return;
      queryClient.setQueryData<Nurse[]>(
        CACHE_KEY_NURSES,
        context.previousNurses
      );
    },
  });
};
