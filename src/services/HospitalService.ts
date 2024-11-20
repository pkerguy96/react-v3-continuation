import { APIClient } from "./Http";
export interface Hospital {
    id?: number ;
  name: string; // Required, must be a string
  address?: string | null; // Optional or nullable, must be a string
  contact_info?: string | null; // Optional or nullable, must be a string
}

export const hospitalApiClient = new APIClient<Hospital>("/Hospital");
export const hospitalOperationApiClient = new APIClient<Hospital>("/Hospitaloperations");