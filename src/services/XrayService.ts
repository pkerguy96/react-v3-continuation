import { APIClient } from "./Http";

export interface XrayProps {
  patient_id?: string;
  xray_type: string[];
  view_type: string[];
  body_side: string[];
  note?: string;
}
export interface XrayData {
  operation_id: number;
  patient_id: number;
  xray_type: string;
  price: number;
}
export const xrayApiClient = new APIClient<XrayProps>("xray");
export const PatientXrayApiClient = new APIClient<XrayData>("showpatientxrays");
export const insertOpwithoutxray = new APIClient<XrayData>("insertWihtoutxray");
