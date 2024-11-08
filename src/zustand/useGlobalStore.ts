import { create } from "zustand";

interface GlobalState {
  id: string;
  ordonanceId: string;
  operationId: string;
  setIds: (id: string, ordonanceId: string, operationId: string) => void;
  resetIds: () => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  id: "",
  ordonanceId: "",
  operationId: "",
  setIds: (id, ordonanceId, operationId) =>
    set((state) => ({ ...state, id, ordonanceId, operationId })),
  resetIds: () =>
    set((state) => ({
      ...state,
      id: "",
      ordonanceId: "",
      operationId: "",
    })),
}));

export default useGlobalStore;
