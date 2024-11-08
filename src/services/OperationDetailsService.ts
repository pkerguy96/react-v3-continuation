import { APIClient } from "./Http";
export interface OperationDetail {
  doctor_id: number;
  patient_id: number;
  total_cost: string;
  is_paid: number;
  note: null | string;
  operation_details: OperationDetailItem[];
  payments: Payment[];
}

export interface OperationDetailItem {
  id: number;
  tooth_id: string;
  operation_type: string;
  price: string;
}

export interface Payment {
  id: number;
  total_cost: string;
  amount_paid: string;
  date: string;
}

const operationDetailsApiClient = new APIClient<OperationDetail>(
  "/getByOperationId"
);
export const deleteoperationdetailsApiclient = new APIClient<OperationDetail>(
  "/deletePaymentDetail"
);
export default operationDetailsApiClient;
