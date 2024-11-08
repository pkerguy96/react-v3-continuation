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
import operationApiClient, { Operation } from "../services/OperationService";
import { CACHE_KEY_Operation } from "../constants";
import deleteItem from "../hooks/deleteItem";
import useUserRoles from "../zustand/UseRoles";

interface CustomPaymentInfo {
  id: number;
  date: string;
  nom: string;
  operation_type: null | string;
  patient_id: number;
  payments: Payment[];
  prenom: string;
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
  const { can } = useUserRoles();
  /*   const { data, isLoading } = getGlobal(
    {} as Operation,
    [CACHE_KEY_Operation[0]],
    operationApiClient,
    undefined
  ); */

  const queryClient = useQueryClient();
  /*  if (isLoading) return <LoadingSpinner />;
  const handleCloseModal = () => {
    setOpenModal(false);
  }; */

  /*   const formattedData = data?.map((Paymentinfo: CustomPaymentInfo) => {
    return {
      id: Paymentinfo.id,
      nom: `${Paymentinfo.nom} ${Paymentinfo.prenom}`,
      date: Paymentinfo.date,
      prix: `${Paymentinfo.total_cost} MAD`,
      amount_paid: `${Paymentinfo.totalPaid.toFixed(2)} MAD`,
      ispaid: Boolean(Paymentinfo.isPaid) ? "true" : "false",
    };
  }); */

  const columns = [
    {
      name: "id",
      label: "#",
      options: {
        display: "none",
      },
    },
    {
      name: "ispaid",
      label: "ispaid",
      options: {
        display: "excluded",
      },
    },
    {
      name: "nom",
      label: "Nom",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "prix",
      label: "Prix Total",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "amount_paid",
      label: "Montant Payé",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (
          _value: any,
          tableMeta: { rowData: string[]; currentTableData: string[] },
          _updateValue: any
        ) => {
          console.log(typeof tableMeta.rowData);

          const color = tableMeta.rowData[1] === "true" ? "success" : "error";

          return (
            <Chip
              label={color === "success" ? "Entièrement payé" : "Non payé"}
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
        filter: true,
        sort: true,
        customBodyRender: () =>
          can(["Super-Admin", "delete_debt"]) && (
            <button
              className="btn-ordonance-delete text-gray-950 hover:text-blue-700 cursor-pointer"
              title="Supprimer"
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

  const options = {
    searchOpen: true,
    filterType: "dropdown",
    searchPlaceholder: "Rechercher une paiement",
    textLabels: {
      body: {
        noMatch: "Désolé, aucun paiement n'est dans nos données",
      },
    },

    selectableRowsHideCheckboxes: true,
    onRowClick: (s: [number, number], _m: any, e: any) => {
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
                queryClient.invalidateQueries({ queryKey: ["operation"] });
                showSnackbar("La suppression du paiement a réussi", "success");
              } else {
                showSnackbar("La suppression du paiement a échoué", "error");
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
  };

  const formatedLoL: [] = [];
  return (
    <>
      <Box className="relative">
        <MUIDataTable
          title={"Liste des Règlement"}
          data={formatedLoL}
          columns={columns}
          options={options}
        />
      </Box>

      {/*  {can(["Super-Admin", "insert_debt"]) && openModal && (
          <PaymentModal
            open={openModal}
            onClose={handleCloseModal}
            operationID={modalOperationId}
          />
        )} */}
    </>
  );
};

export default ReglementTable;
