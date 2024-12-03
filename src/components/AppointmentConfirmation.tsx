//@ts-nocheck
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { APIClient } from "../services/Http";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

import { CACHE_KEY_APPOINTMENTS } from "../constants";
import { useQueryClient } from "@tanstack/react-query";

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  data: {
    id: number;
    patient_id: number;
    note: string;
    date: string;
    patient_name: string;
  };
}
const AppointmentConfirmation = ({
  open,
  onClose,
  data,
}: ModalComponentProps) => {
  const queryClient = useQueryClient();

  const [snackBar, setSnackBar] = useState({
    isopen: false,
    message: "",
    severity: "success",
  });
  const [date, time] = data?.date.split("T");

  const deleteAppointement = async () => {
    try {
      const apiclient = new APIClient("Appointment");
      await apiclient.DeleteOne(data?.id);
      queryClient.invalidateQueries(CACHE_KEY_APPOINTMENTS);
      setSnackBar({
        isopen: true,
        message: "Le rendez-vous est supprimé",
        severity: "warning",
      });
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
  //todo zustand
  useEffect(() => {
    let intervalId: number;
    if (snackBar.severity === "warning") {
      intervalId = setInterval(() => {
        setSnackBar({
          severity: "success",
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
          className="flex flex-col items-center gap-3 rounded-lg border-0"
        >
          <Box className=" w-full flex flex-row justify-end">
            <IconButton onClick={() => onClose()}>
              <ClearIcon />
            </IconButton>
          </Box>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Détails du rendez-vous
          </Typography>

          <TextField
            fullWidth
            label="patient_name"
            id="patient_name-text"
            value={data?.patient_name}
            disabled
          />

          <TextField
            id="large-text"
            label="date"
            value={`${date}  ${time}`}
            disabled
            fullWidth
          />

          <TextField
            id="large-text"
            label="Note"
            multiline
            value={data?.note ?? ""}
            rows={4}
            variant="outlined"
            disabled
            fullWidth
          />
          <Box className=" mx-4 w-full flex gap-4 justify-center	 ">
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={deleteAppointement}
            >
              Supprimer
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AppointmentConfirmation;
