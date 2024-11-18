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


export interface XrayItem {
  patient_name: string; // Full name of the patient
  xray_type: string;    // Type of X-ray
  view_type: string;    // View type of the X-ray (e.g., Face, Side)
  body_side: string;    // Side of the body (e.g., Left, Right, etc.)
}

// Interface for the entire response
export interface XrayResponse {
  data: XrayItem[]; // Array of X-ray items
}
export const xrayApiClient = new APIClient<XrayProps>("xray");
export const PatientXrayApiClient = new APIClient<XrayData>("showpatientxrays");
export const insertOpwithoutxray = new APIClient<XrayData>("insertWihtoutxray");
export const NurseXrayvalidationApiClient = new APIClient<XrayResponse>("getXraysByOperation");
