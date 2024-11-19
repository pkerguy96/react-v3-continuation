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

export interface SupplierTinyData {
  id: number;
  name: string;
}

export interface ProductSupplier {
  buy_price: number; // The purchase price per unit
  sell_price: number; // The selling price per unit
  date: string; // Date in "YYYY-MM-DD" format
  quantity: number; // Quantity purchased
  supplier_id: number; // ID of the supplier
  patient_id: number;
}

export const SupplierApiClient = new APIClient<Supplier>("/Supplier");
export const SupplierNamesApiClient = new APIClient<SupplierTinyData>(
  "/showAllSuppliers"
);

export const SupplierProductApiClient = new APIClient<ProductSupplier>(
  "/Supplierproduct"
);
