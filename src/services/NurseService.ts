import { APIClient } from "./Http";

export interface Nurse {
  id: number;
  nom: string;
  prenom: string;
  cin: string;
  date: string;
  sex: string;
  address: string;
  phoneNumber?: string;
}

const nurseApiClient = new APIClient<Nurse>("/Nurse");
export default nurseApiClient;
