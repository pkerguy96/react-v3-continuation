import { Patient } from "../pages/AddPatientForm";
import { APIClient } from "./Http";
interface OperationType {
  id: number;
  operation_id: number;
  tooth_id: string;
  operation_type: string;
  price: string;
  created_at: string;
  updated_at?: string;
}

interface Operation {
  total_cost: string;
  operation_type: OperationType[];
}
//new
/* export interface XrayProps {
  patient_id?: string;
  xray_type: string[];
  view_type: string[];
  body_side: string[];
  note?: string;
}

export const xrayApiClient = new APIClient<XrayProps>("storeOperation");
 */
//new

export interface Patientinfo extends Patient {
  operations: Operation[];
}
const patientdetailsApiClient = new APIClient<Patientinfo>("/patientDetails");
export default patientdetailsApiClient;
