import { APIClient } from "./Http";

export interface BloodTestProps {
  patient_id?: string;
  operation_id?: string;
  blood_test: string[];
}

export const bloodTestApiClient = new APIClient<BloodTestProps>("bloodtest");
