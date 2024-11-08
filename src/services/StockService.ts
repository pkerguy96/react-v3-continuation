import { APIClient } from "./Http";

interface StockInterface {
  bar_code?: string;
  product_name: string;
  product_family: string;
  product_nature?: string;
  min_stock?: number;
}
export const StockApiClient = new APIClient<StockInterface>("/Stock");
