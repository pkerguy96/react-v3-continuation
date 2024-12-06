import { APIClient } from "./Http";

export interface appointmentsCount {
  data: number;
}
export interface CanceledappointmentsCount {
  data: number;
}
export interface Revenue {
  data: (string | number)[][];
}
export interface Agegroup {
  age_group: string;
  count: number;
}
export interface AgeData {
  data: Agegroup[];
}
export interface TotalPatients {
  data: number;
}
export interface AppointmentKpi {
  title: string;
  date: string;
  patient_name: string;
  note: string;
}
export interface AppointmentKpiData {
  data: AppointmentKpi[];
}
export interface NewAppointments {
  data: number[];
}
export interface CanceledAppointments {
  data: number[];
}
export interface CashierNumber {
  data: number;
}
export interface OperationDataDebt {
  data?: any;
  name: string;
  date: string;
  total_cost: number;
  operation_type: string[];
  total_amount_paid: number;
  amount_due: number;
}

export interface DebtApiResponse {
  data: OperationDataDebt[];
}
export const AppointmentsKpiClient = new APIClient<appointmentsCount>(
  "/getAppointments"
);
export const CanceledMonthlyAppointmentsKpiClient =
  new APIClient<CanceledAppointments>("/getMonthlyCanceledAppointments");
export const MonthlyAppointmentsKpiClient = new APIClient<NewAppointments>(
  "/getMonthlyAppointments"
);
export const TotalRevenueKpiClient = new APIClient<Revenue>("/getTotalRevenue");
export const PatientsDebtKpiClient = new APIClient<OperationDataDebt>(
  "/fetchPayments"
);
export const CashierNumberKpiClient = new APIClient<CashierNumber>(
  "/OnlyCashierNumber"
);
export const AppointmentKpiClient = new APIClient<AppointmentKpiData>(
  "/appointmentKpipeak"
);
export const TotalPatientKpiClient = new APIClient<TotalPatients>(
  "/TotalPatients"
);
export const PatientsAgeGroupKpiClient = new APIClient<AgeData>(
  "/calculateAgePercentage"
);
export const PatientsReferralClient = new APIClient<AgeData>(
  "/countPatientsByReferral"
);
export const TotalcachierAmount = new APIClient<any>("/retrieveFromCashier");
export const CanceledAppointmentsKpiClient =
  new APIClient<CanceledappointmentsCount>("/getCanceledAppointments");

export default AppointmentsKpiClient;
