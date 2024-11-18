import { APIClient } from "./Http";
export interface SettingsData {
  period: string;
}
export interface OperationPreference {
  id?: number | undefined;
  name?: string;
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
  "OperationPreferences"
);
export const OperationsPrefApiClient = new APIClient<OperationPreference[]>(
  "getOperationPrefs"
);
export const DeleteOperationsPrefApiClient =
  new APIClient<DeleteOperationPreference>("deleteOperationPrefs");

export interface XrayPreference {
  id: number;
  xray_type: string;
  price: string;
}

export interface XrayPreferencesResponse {
  data: XrayPreference[];
}

export const XrayPreferenceApiClient = new APIClient<XrayPreferencesResponse>(
  "XrayPreferences"
);
