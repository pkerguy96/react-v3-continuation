import { create } from "zustand";

interface ConfirmDialogStore {
  message: string;
  onSubmit?: () => void;
  close: () => void;
}
const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
  message: "",
  onSubmit: undefined,
  close: () => set({ onSubmit: undefined }),
}));

export default useConfirmDialogStore;
