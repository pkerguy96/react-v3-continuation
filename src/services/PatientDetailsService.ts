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

export interface Patientinfo extends Patient {
  operations: Operation[];
}
const patientdetailsApiClient = new APIClient<Patientinfo>("/patientDetails");
export default patientdetailsApiClient;
