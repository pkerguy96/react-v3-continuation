import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment"; // Import moment library

import { Patient } from "../pages/AddPatientForm";
import { useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_APPOINTMENTS } from "../constants";

import { AxiosError } from "axios";
import { APIClient } from "../services/Http";
import getGlobal from "../hooks/getGlobal";
import { CACHE_KEY_PATIENTS } from "../constants";
import patientAPIClient, { OnlyPatientData } from "../services/PatientService";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import addGlobal from "../hooks/addGlobal";
import appointmentAPIClient from "../services/AppointmentService";
import LoadingSpinner from "./LoadingSpinner";
interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  dateTime: string;
}

const AppointmentModal: React.FC<ModalComponentProps> = ({
  open,
  onClose,
  dateTime,
}) => {
  const { showSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();

  const dateTimeMoment = moment(dateTime);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [title, setTitle] = useState("");
  const [dateTimeValue, setDateTimeValue] = useState<string>();
  const [note, setNote] = useState("");
  const { data: patientsData, isLoading } = getGlobal(
    {} as OnlyPatientData, // Tname (you can use a placeholder object here)
    CACHE_KEY_PATIENTS, // query
    patientAPIClient, // service
    undefined // opts
  );

  const addmutation = addGlobal({}, appointmentAPIClient);
  let dataArray = [];

  const handlePatientChange = (_event: any, newValue: Patient) => {
    if (newValue) {
      // Update the state with the selected patient
      setPatient(newValue);
    } else {
      // Handle the case when nothing is selected
      setPatient(null);
    }
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };
  //@ts-ignore
  const handleDateTimeChange = (newDateTime) => {
    const combinedValue = newDateTime.format("YYYY-MM-DDTHH:mm:ss");

    setDateTimeValue(combinedValue); // Capture the selected date and time value
  };
  const onclicked = async () => {
    const formData: {
      patient_id: number;

      note: string;
      date: string;
    } = {
      patient_id: patient?.id,

      date: dateTimeValue,
      note: note,
    };
    try {
      addmutation.mutateAsync(formData, {
        onSuccess: () => {
          showSnackbar("Le rendez-vous a été créé", "success");
          queryClient.invalidateQueries(CACHE_KEY_APPOINTMENTS);
          setPatient(null);
          onClose();
        },
        onError: (error: any) => {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message
              : error.message;
          showSnackbar(message, "warning");
        },
      });
    } catch (error: any) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;
    }
  };

  useEffect(() => {
    if (open) {
      setDateTimeValue(dateTimeMoment.format("YYYY-MM-DDTHH:mm:ss"));
    }
  }, [open]);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <Box
          sx={{ width: 400, bgcolor: "background.paper", p: 2 }}
          className="flex flex-col items-center gap-4 rounded-lg border-0"
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Détails du rendez-vous
          </Typography>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={patientsData}
            value={patient}
            getOptionLabel={(option) => `${option.nom} ${option.prenom}`}
            sx={{ width: " 100% " }}
            renderInput={(params) => <TextField {...params} label="Patient" />}
            onChange={handlePatientChange} // Handle changes
          />

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              defaultValue={dateTimeMoment}
              ampm={false}
              sx={{ width: "100%" }}
              onChange={handleDateTimeChange}
            />
          </LocalizationProvider>

          <TextField
            id="large-text"
            label="Note"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            onChange={handleNoteChange}
          />
          <Button variant="contained" onClick={onclicked}>
            Confirmer
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AppointmentModal;
