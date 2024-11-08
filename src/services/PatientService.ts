import { APIClient } from "./Http";

export interface OnlyPatientData {
  id?: number;
  nom: string;
  prenom: string;
  cin?: string;
  date: string;
  sex: string;
  address: string;
  phoneNumber?: string;
  mutuelle: string;
  note?: string;
  agecalc?: string;
  allergy?: string[];
  disease?: string[];
  referral?: string[];
}
const patientAPIClient = new APIClient<OnlyPatientData>("/Patient");
export default patientAPIClient;
