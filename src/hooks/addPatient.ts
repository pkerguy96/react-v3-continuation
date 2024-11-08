import { APIClient } from "../services/Http";
import { Patient } from "../pages/AddPatientForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_PATIENTS } from "../constants";
const apiclient = new APIClient<Patient>("/Patient");
interface Patientscontext {
  previousPatients: Patient[];
}
//TODO : modify inptu date mm/yy to french
export const useAddPatientMutation = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Patient, Error, Patient, Patientscontext>({
    mutationFn: async (data: Patient) => {
      return await apiclient.Postall(data, undefined);
    },
    onMutate: async (newPatient: Patient) => {
      const previousPatients =
        queryClient.getQueryData<Patient[]>(CACHE_KEY_PATIENTS) || [];
      queryClient.setQueryData<Patient[]>(
        CACHE_KEY_PATIENTS,
        (patients = []) => [newPatient, ...patients]
      );
      onAdd();
      return { previousPatients };
    },
    // apiPatient  we get from backend , formPatient is the client side
    onSuccess: (apiPatient, formPatient) => {
      queryClient.setQueryData<Patient[]>(CACHE_KEY_PATIENTS, (patients) =>
        patients?.map((patient) => {
          // @ts-ignore
          return patient.cin === formPatient.cin ? apiPatient.data : patient;
        })
      );
    },
    onError: (_error, _newPatient, context) => {
      if (!context) return;
      queryClient.setQueryData<Patient[]>(
        CACHE_KEY_PATIENTS,
        context.previousPatients
      );
    },
  });
};
