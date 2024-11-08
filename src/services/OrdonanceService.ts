import { APIClient } from "./Http";
export interface Ordonance {
  patient_id?: number;
  date: string;
  medicine?: {
    medicine_name: string;
    note: string;
  }[];
}
const ordonanceApiClient = new APIClient<Ordonance>("/Ordonance");
export default ordonanceApiClient;
