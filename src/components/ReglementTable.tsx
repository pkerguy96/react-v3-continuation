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
      },
    },
    {
      name: "totalPaid", // Matches the "totalPaid" key in data
      label: "Montant Payé",
      options: {
        filter: true,
        sort: true,
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
        customBodyRender: (value: any, tableMeta: any) => (
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
        ),
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

      {
        staleTime: 60000,
        cacheTime: 300000,
      }
    );
  return (
    <>
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
              console.log(s);

              if (
                e.target.querySelector(".btn-ordonance-delete") ||
                e.target.classList.contains("btn-ordonance-delete")
              ) {
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

      {openModal && (
        <PaymentModal
          open={openModal}
          onClose={handleCloseModal}
          operationID={modalOperationId}
        />
      )}
    </>
  );
};

export default ReglementTable;
