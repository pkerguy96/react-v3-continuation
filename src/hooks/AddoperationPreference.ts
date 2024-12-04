import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  OperationPrefApiClient,
  OperationPreference,
} from "../services/SettingsService";
import { CACHE_KEY_OperationPref } from "../constants";
interface operationscontext {
  previousData: OperationPreference[];
}

export const AddoperationPreference = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<
    OperationPreference,
    Error,
    OperationPreference,
    operationscontext
  >({
    mutationFn: async (data: OperationPreference) => {
      return await OperationPrefApiClient.Postall(data, undefined);
    },
    onMutate: async (newData: OperationPreference) => {
      const previousData =
        queryClient.getQueryData<OperationPreference[]>(
          CACHE_KEY_OperationPref
        ) || [];
      queryClient.setQueryData<OperationPreference[]>(
        CACHE_KEY_OperationPref,
        (operations = []) => [...operations, newData]
      );
      onAdd();
      return { previousData };
    },
    onSuccess: (apiOperation, FormOperation) => {
      queryClient.setQueryData<OperationPreference[]>(
        CACHE_KEY_OperationPref,
        (operations) =>
          operations?.map((operation) => {
            return operation.code === FormOperation.code
              ? //@ts-ignore
                apiOperation.data
              : operation;
          })
      );
    },
    onError: (_error, _newOperation, context) => {
      if (!context) return;
      queryClient.setQueryData<OperationPreference[]>(
        CACHE_KEY_OperationPref,
        context.previousData
      );
    },
  });
};
