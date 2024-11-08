import { useSnackbarStore } from "../zustand/useSnackbarStore";
import { Snackbar, Alert } from "@mui/material";

const SnackBarComponentv2 = () => {
  const { isOpen, message, severity, hideSnackbar } = useSnackbarStore();

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={hideSnackbar}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={hideSnackbar}
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarComponentv2;
