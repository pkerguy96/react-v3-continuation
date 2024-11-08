//@ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
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
  const [snackBar, setSnackBar] = useState({
    isopen: false,
    message: "",
    severity: "info",
  });
  const queryClient = useQueryClient();
  const dateTimeMoment = moment(dateTime);
  const [patient, setPatient] = useState<Patient>();
  const [title, setTitle] = useState("");
  const [dateTimeValue, setDateTimeValue] = useState<string>();
  const [note, setNote] = useState("");
  const { data: patientsData, isLoading } = getGlobal(
    {} as OnlyPatientData, // Tname (you can use a placeholder object here)
    [CACHE_KEY_PATIENTS[0]], // query
    patientAPIClient, // service
    undefined // opts
  );

  let dataArray = [];
  if (patientsData && typeof patientsData === "object") {
    dataArray = Object.values(patientsData);
  }

  if (open && !dateTimeValue) {
    setDateTimeValue(dateTimeMoment.format("YYYY-MM-DDTHH:mm:ss"));
  }

  const handlePatientChange = (_event: any, newValue: Patient) => {
    if (newValue) {
      // Update the state with the selected patient
      setPatient(newValue);
    } else {
      // Handle the case when nothing is selected
      setPatient(undefined);
    }
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
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
      //TODO: this;
      const apiclient = new APIClient<Appointments>("/Appointment");
      const response = await apiclient.Postall(formData);

      setSnackBar({
        isopen: true,
        message: "Le rendez-vous a été créé",
        severity: "success",
      });
      queryClient.invalidateQueries(CACHE_KEY_APPOINTMENTS);
    } catch (error: any) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;

      setSnackBar({
        isopen: true,
        message: message,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    let intervalId: number;
    if (snackBar.severity === "success") {
      intervalId = setInterval(() => {
        setSnackBar({
          severity: "info",
        });

        onClose();
      }, 1500);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [snackBar.severity]);
  return (
    <>
      <Snackbar
        open={snackBar.isopen}
        autoHideDuration={3000} // Adjust the duration for how long the snackbar should be displayed
        onClose={() =>
          setSnackBar((prevState) => ({ ...prevState, isopen: false }))
        }
        anchorOrigin={{
          vertical: "top", // Set the vertical position to top
          horizontal: "right", // Set the horizontal position to right
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() =>
            setSnackBar((prevState) => ({ ...prevState, isopen: false }))
          }
          severity={snackBar.severity as AlertColor}
        >
          {snackBar.message}
        </MuiAlert>
      </Snackbar>
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
            options={dataArray}
            getOptionLabel={(option) => `${option.nom} ${option.prenom}`}
            sx={{ width: " 100% " }}
            renderInput={(params) => <TextField {...params} label="Patient" />}
            onChange={handlePatientChange} // Handle changes
          />
          {/*    <TextField
            fullWidth
            label="Titre"
            id="title-text"
            onChange={handleTitleChange}
          /> */}

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
