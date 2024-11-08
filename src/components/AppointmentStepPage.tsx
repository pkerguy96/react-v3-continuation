import { Paper, Box, Typography, TextField, Button } from "@mui/material";
import {
  LocalizationProvider,
  DateTimePicker,
  DateTimeValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import React, { useRef, useState } from "react";
import { CACHE_KEY_PATIENTS } from "../constants";
import getGlobalById from "../hooks/getGlobalById";
import patientAPIClient, { OnlyPatientData } from "../services/PatientService";

import addGlobal from "../hooks/addGlobal";
import appointmentAPIClient from "../services/AppointmentService";

import LoadingSpinner from "./LoadingSpinner";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import { AxiosError } from "axios";
import useGlobalStore from "../zustand/useGlobalStore";
import {
  finishtreatmentApiClient,
  modifytreatmentApiClient,
} from "../services/OperationService";
interface DataSend {
  patient_id: number; // Ensure patient_id is defined as a number
  title?: string; // Optional string property
  date: string;
  note?: string;
}
const AppointmentStepPage = ({ onNext }: any) => {
  const [selectedDateTime, setSelectedDateTime] = useState(moment());

  const { showSnackbar } = useSnackbarStore();
  const { id, operationId, ordonanceId } = useGlobalStore();
  const noteRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const dateTimePickerRef = useRef(null);
  console.log(id, operationId, ordonanceId);

  const { data, isLoading } = id
    ? getGlobalById(
        {} as OnlyPatientData,
        [CACHE_KEY_PATIENTS[0], id],
        patientAPIClient,
        undefined,
        parseInt(id)
      )
    : { data: {}, isLoading: false };
  const Addmutation = addGlobal({} as DataSend, appointmentAPIClient);
  if (isLoading) return <LoadingSpinner />;

  const handleDateTimeChange = (
    value: Moment | null,
    _context: PickerChangeHandlerContext<DateTimeValidationError>
  ) => {
    if (value !== null) {
      setSelectedDateTime(value);
    } else {
      return;
    }
  };
  const onsubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleRef?.current?.value) {
      showSnackbar("Veuillez saisir un titre.", "error");
      return;
    }

    // Frontend validation for the date field
    if (!selectedDateTime) {
      showSnackbar("Veuillez sélectionner une date.", "error");
      return;
    }
    const formData = {
      patient_id: parseInt(id),
      title: titleRef?.current?.value || "",
      date: selectedDateTime.format("YYYY-MM-DDTHH:mm:ss"),
      note: noteRef?.current?.value,
    };
    await modifytreatmentApiClient.update(+operationId);
    await Addmutation.mutateAsync(formData, {
      onSuccess: () => {
        showSnackbar("Le rendez-vous a été créé", "success");
        onNext();
      },
      onError: (error: any) => {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message
            : error.message;
        showSnackbar(message, "error");
      },
    });
  };
  const finishtreatment = async () => {
    await finishtreatmentApiClient.update(+operationId);
  };
  return (
    <div>
      <Paper className="!p-6 w-full flex flex-col gap-4">
        <Box className="flex gap-4 flex-col">
          <Box className="flex justify-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Ajouter un rendez-vous ?
            </Typography>
          </Box>

          <TextField
            fullWidth
            id="name"
            value={`${data.nom} ${data.prenom}`}
            disabled
          />
          <TextField inputRef={titleRef} label="Titre" fullWidth id="title" />

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              value={selectedDateTime}
              ampm={false}
              onChange={handleDateTimeChange}
              inputRef={dateTimePickerRef}
            />
          </LocalizationProvider>

          <TextField
            inputRef={noteRef}
            id="large-text"
            label="Note"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
          <Box className="flex justify-between flex-row mt-5 content-center">
            <Button
              variant="outlined"
              onClick={async () => {
                await finishtreatment();
                await onNext();
              }}
            >
              <p className="text-sm">Skip</p>
            </Button>
            <Button onClick={onsubmit} variant="contained">
              Confirmer
            </Button>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default AppointmentStepPage;
