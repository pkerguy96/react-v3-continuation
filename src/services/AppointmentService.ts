import { APIClient } from "./Http";

export interface Appointments {
  id: number;
  patient_id?: number;
  title: string;
  note: string;
  date: Date;
  patient_name?: string;
}
const appointmentAPIClient = new APIClient<Appointments>("/Appointment");
export const paginatedAppointmentApiClient = new APIClient<Appointments>(
  "/GetAppointmentPagated"
);
export default appointmentAPIClient;
