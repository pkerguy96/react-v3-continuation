import { APIClient } from "./Http";

interface StockInterface {
  bar_code?: string;
  product_name: string;
  product_family: string;
  product_nature?: string;
  min_stock?: number;
}
export interface ProductOperation {
  id: number;
  product_name: string;
}
export const StockApiClient = new APIClient<StockInterface>("/Stock");
export const productOperationApiClient = new APIClient<ProductOperation>(
  "/getProductsForOperation"
);

/* api client for stock exit table */
interface ProductConsumed {
  id: number;
  product: string; // Name of the product
  quantity: number; // Quantity of the product
  date: string; // Date in ISO format
  patient: string; // Name of the patient
}

interface ProductOperationResponse {
  data: ProductConsumed[]; // Array of product operations
}
export const productconsumedApiClient = new APIClient<ProductOperationResponse>(
  "/consumables"
);
