import { APIClient } from "./Http";

export interface Supplier {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  contact_person?: string;
  company_name?: string;
  supply_type?: string;
  tax_id?: string;
  status: "active" | "inactive";
  note?: string;
}

export const SupplierApiClient = new APIClient<Supplier>("/Supplier");
