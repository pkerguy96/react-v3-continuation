import { create } from "zustand";
interface SnackbarState {
  isOpen: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
  showSnackbar: (
    message: string,
    severity?: "success" | "info" | "warning" | "error"
  ) => void;
  hideSnackbar: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  isOpen: false,
  message: "",
  severity: "info",
  showSnackbar: (message, severity = "info") => {
    set({
      isOpen: true,
      message,
      severity,
    });
  },
  hideSnackbar: () => {
    set({
      isOpen: false,
      message: "",
      severity: "info",
    });
  },
}));
