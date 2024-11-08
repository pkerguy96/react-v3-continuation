import { APIClient } from "./Http";
export interface SettingsData {
  period: string;
}
export interface OperationPreference {
  id?: number | undefined;
  name: string;
  code?: string;
  price: number;
  operation_type?: string;
}
export interface DeleteOperationPreference {
  id: number;
}
export const SettingsApiClient = new APIClient<SettingsData>(
  "DashboardKpiUserPref"
);
export const OperationPrefApiClient = new APIClient<OperationPreference>(
  "OperationUserPref"
);
export const OperationsPrefApiClient = new APIClient<OperationPreference[]>(
  "getOperationPrefs"
);
export const DeleteOperationsPrefApiClient =
  new APIClient<DeleteOperationPreference>("deleteOperationPrefs");
