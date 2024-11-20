import { create } from "zustand";
export const useOperationStore = create((set) => ({
  operations: [], // Array of objects { operationId, patientId }

  // Add or update a patient's operation
  addOrUpdateOperation: (operationId, patientId) => {
    const operations = JSON.parse(localStorage.getItem("operations")) || [];

    // Check if the patient already has an operation
    const existingIndex = operations.findIndex(
      (op) => op.patientId === patientId
    );

    if (existingIndex >= 0) {
      // Update the existing operation
      operations[existingIndex].operationId = operationId;
    } else {
      // Add a new operation
      operations.push({ operationId, patientId });
    }

    localStorage.setItem("operations", JSON.stringify(operations));
    set({ operations });
  },

  // Check for existing operations
  checkExistingOperations: () => {
    const operations = JSON.parse(localStorage.getItem("operations")) || [];
    set({ operations });
    return operations;
  },

  // Find a patient by ID
  findPatientById: (patientId) => {
    const operations = JSON.parse(localStorage.getItem("operations")) || [];
    const patient = operations.find((op) => op.patientId === patientId) || null;
    return patient;
  },

  // Clear a specific patient's operation
  clearPatientOperation: (patientId) => {
    const operations = JSON.parse(localStorage.getItem("operations")) || [];
    const updatedOperations = operations.filter(
      (op) => op.patientId !== patientId
    );

    localStorage.setItem("operations", JSON.stringify(updatedOperations));
    set({ operations: updatedOperations });
  },

  // Clear all operations
  clearAllOperations: () => {
    localStorage.removeItem("operations");
    set({ operations: [] });
  },
}));

export default useOperationStore;
