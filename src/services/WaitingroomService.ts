import { APIClient } from "./Http";

export interface WaitingroomCounter {
  data: number;
}
interface patientCounteractions {
  status: string;
  message: string;
  data: string; // Adjust the data type according to the actual response data
}
export interface PatientNameWaitingRoom {
  searchQuery: string;
}
export interface incrementbyone {
  patient_id: number;
}

interface PatientListData {
  id: number;
  name: string;
  entry_time: string;
}

interface PatientResponse {
  data: PatientListData[];
}

export const waitingRoomApiClient = new APIClient<WaitingroomCounter>(
  "Waitingroom"
);
export const incrementPatientApiClient = new APIClient<patientCounteractions>(
  "incrementPatient"
);
export const decrementPatientApiClient = new APIClient<patientCounteractions>(
  "decrementPatient"
);
export const FetchPatientsWaitingRoom = new APIClient<patientCounteractions>(
  "PatientsWaitingRoom"
);
export const FetchWaitingList = new APIClient<PatientResponse>(
  "GetWaitingList"
);
export const tvWaitingListApiClient = new APIClient<PatientResponse>(
  "tvwaitinglist"
);
export const clearPatientCounterApiClient =
  new APIClient<patientCounteractions>("resetPatientCounter");
