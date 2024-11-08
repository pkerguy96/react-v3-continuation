import { APIClient } from "./Http";

export interface XrayProps {
  patient_id?: string;
  xray_type: string[];
  view_type: string[];
  body_side: string[];
  note?: string;
}
export const xrayApiClient = new APIClient<XrayProps>("xray");
