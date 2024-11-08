import { CACHE_KEY_OperationPref } from "../constants";
import {
  OperationPreference,
  OperationsPrefApiClient,
} from "../services/SettingsService";
import getGlobal from "./getGlobal";

export const useGlobalOperationPreference = () => {
  const { data, refetch, isLoading } = getGlobal(
    {} as OperationPreference,
    CACHE_KEY_OperationPref,
    OperationsPrefApiClient,
    undefined
  );

  return { data, refetch, isLoading };
};
