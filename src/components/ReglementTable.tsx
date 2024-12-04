//@ts-ignore
import MUIDataTable from "mui-datatables-mara";
import { Box, Chip } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PaymentModal from "./PaymentModal";
import { useState } from "react";
import { confirmDialog } from "./ConfirmDialog";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import { useQueryClient } from "@tanstack/react-query";
import getGlobal from "../hooks/getGlobal";
import operationApiClient from "../services/OperationService";
import { CACHE_KEY_Operation } from "../constants";
import deleteItem from "../hooks/deleteItem";
import DataTable from "./DataTable";
import getGlobalv2 from "../hooks/getGlobalv2";
import useUserRoles from "../zustand/UseRoles";

interface CustomPaymentInfo {
  id: number;
  date: string;
  full_name: string;
  patient_id: number;
  totalPaid: number;
  total_cost: number;
  isPaid: boolean;
}

interface Payment {
  id: number;
  amount_paid: string;
  is_paid: number;
  total_cost: string;
}
const ReglementTable = () => {
  const { can } = useUserRoles();

  const [openModal, setOpenModal] = useState(false);
  const [modalOperationId, setModalOperationId] = useState<number | null>(null);
  const { showSnackbar } = useSnackbarStore();

  const queryClient = useQueryClient();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const columns = [
    {
      name: "id", // Matches the "id" key in data
      label: "#",
      options: {
        display: false,
      },
    },
    {
      name: "full_name", // Matches the "full_name" key in data
      label: "Nom complet",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "date", // Matches the "date" key in data
      label: "Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "total_cost", // Matches the "total_cost" key in data
      label: "Prix Total",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => `${value} MAD`,
      },
    },
    {
      name: "totalPaid", // Matches the "totalPaid" key in data
      label: "Montant Payé",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => `${value} MAD`,
      },
    },
    {
      name: "isPaid", // Matches the "isPaid" key in data
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: boolean) => {
          const color = value ? "success" : "error";
          return (
            <Chip
              label={value ? "Entièrement payé" : "Non payé"}
              color={color}
              variant="outlined"
            />
          );
        },
      },
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any, tableMeta: any) => {
          if (can(["delete_debt", "doctor"])) {
            // Check permissions before rendering the delete button
            return (
              <button
                className="btn-ordonance-delete text-gray-950 hover:text-blue-700 cursor-pointer"
                title="Supprimer"
                onClick={() => {
                  const id = tableMeta.rowData[0]; // "id" is the first column
                  confirmDialog(
                    "Voulez-vous vraiment supprimer le paiement ?",
                    async () => {
                      try {
                        const deletionSuccessful = await deleteItem(
                          id,
                          operationApiClient
                        );
                        if (deletionSuccessful) {
                          queryClient.invalidateQueries({
                            queryKey: ["operation"],
                          });
                          showSnackbar(
                            "La suppression du paiement a réussi",
                            "success"
                          );
                        } else {
                          showSnackbar(
                            "La suppression du paiement a échoué",
                            "error"
                          );
                        }
                      } catch (error) {
                        showSnackbar(
                          `Une erreur s'est produite lors de la suppression du paiement: ${error}`,
                          "error"
                        );
                      }
                    }
                  );
                }}
              >
                <DeleteOutlineIcon
                  color="error"
                  className="pointer-events-none"
                  fill="currentColor"
                />
              </button>
            );
          } else {
            return null; // Do not render the button if the user lacks permissions
          }
        },
      },
    },
  ];
  //TODO REMOVE THE CACHE WHEN OPERATION IS ADDED
  const dataHook = (page: number, searchQuery: string, rowsPerPage: number) =>
    getGlobalv2(
      {},
      CACHE_KEY_Operation,
      operationApiClient,
      page,
      rowsPerPage,
      searchQuery,

      undefined
    );
  return (
    <>
      {can(["access_debt", "doctor", "delete_debt", "insert_debt"]) ? ( // Check permissions for DataTable
        <Box className="relative">
          <DataTable
            title="Liste des paiements des opérations"
            noMatchMessage="Désolé, aucune opération n'est présente dans nos données"
            columns={columns}
            dataHook={dataHook}
            options={{
              searchPlaceholder: "Rechercher une opération",
              selectableRowsHideCheckboxes: true,
              onRowClick: (s: any, _m: any, e: any) => {
                if (
                  e.target.querySelector(".btn-ordonance-delete") ||
                  e.target.classList.contains("btn-ordonance-delete")
                ) {
                  if (!can(["delete_debt", "doctor"])) {
                    showSnackbar(
                      "Vous n'avez pas la permission de supprimer.",
                      "error"
                    );
                    return;
                  }

                  confirmDialog(
                    "Voulez-vous vraiment supprimer le paiement ?",
                    async () => {
                      try {
                        const deletionSuccessful = await deleteItem(
                          s[0],
                          operationApiClient
                        );

                        if (deletionSuccessful) {
                          queryClient.invalidateQueries({
                            queryKey: ["operation"],
                          });
                          showSnackbar(
                            "La suppression du paiement a réussi",
                            "success"
                          );
                        } else {
                          showSnackbar(
                            "La suppression du paiement a échoué",
                            "error"
                          );
                        }
                      } catch (error) {
                        showSnackbar(
                          `Une erreur s'est produite lors de la suppression du paiement :${error}`,
                          "error"
                        );
                      }
                    }
                  );
                } else {
                  setModalOperationId(s[0]);
                  setOpenModal(true);
                }
              },
            }}
          />
        </Box>
      ) : (
        <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
          Vous n'avez pas la permission de consulter cette page.
        </div>
      )}

      {openModal && can(["insert_debt", "doctor"]) ? ( // Check permissions for PaymentModal
        <PaymentModal
          open={openModal}
          onClose={handleCloseModal}
          operationID={modalOperationId}
        />
      ) : openModal ? (
        <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
          Vous n'avez pas la permission d'insérer un paiement.
        </div>
      ) : null}
    </>
  );
};

export default ReglementTable;
