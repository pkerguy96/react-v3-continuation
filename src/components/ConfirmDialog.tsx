import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Box,
  IconButton,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import useConfirmDialogStore from "../zustand/useConfirmDialogStore";

export const confirmDialog = (message: string, onSubmit: () => void) => {
  useConfirmDialogStore.setState({
    message,
    onSubmit,
  });
};
const ConfirmDialog = () => {
  const { message, onSubmit, close } = useConfirmDialogStore();

  return (
    <Dialog open={Boolean(onSubmit)} onClose={close} maxWidth="sm" fullWidth>
      <DialogTitle>Confirmez l'action</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={close}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={close}>
          Annuler
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            if (onSubmit) {
              onSubmit();
            }
            close();
          }}
        >
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
