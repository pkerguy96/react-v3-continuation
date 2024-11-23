import { APIClient } from "./Http";

export interface Supplier {
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
  id?: number;
  product_name?: string;
  supplier_name?: string;
  supplier_id?: string;
  quantity?: number;
  buy_price?: string; // Use string since it's formatted as a decimal string
  sell_price?: string; // Use string for consistency with buy_price
  expiry_date?: string | null; // Nullable if expiry_date might not always be present
  invoice?: string | null; // Nullable if invoice might not always be present
  created_at?: string;
}

export const SupplierApiClient = new APIClient<Supplier>("/Supplier");
export const SupplierNamesApiClient = new APIClient<SupplierTinyData>(
  "/showAllSuppliers"
);

export const SupplierProductApiClient = new APIClient<ProductSupplier>(
  "/Supplierproduct"
);
