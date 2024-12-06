import { Box, Chip, IconButton, Tooltip } from "@mui/material";
import DataTable from "../DataTable";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import getGlobalv2 from "../../hooks/getGlobalv2";
import { CACHE_KEY_Hospitaloperations } from "../../constants";
import { hospitalOperationApiClient } from "../../services/HospitalService";
import { confirmDialog } from "../ConfirmDialog";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import deleteItem from "../../hooks/deleteItem";
import PaymentModal from "../PaymentModal";
import { useState } from "react";
import useUserRoles from "../../zustand/UseRoles";

const ClinicOperationsTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const { can } = useUserRoles();

  const [modalOperationId, setModalOperationId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbarStore();
  const navigate = useNavigate();
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleStockDelete = async (id: any) => {
    confirmDialog("Voulez-vous vraiment supprimer le patient ?", async () => {
      try {
        const deletionSuccessful = await deleteItem(
          id,
          hospitalOperationApiClient
        );
        if (deletionSuccessful) {
          queryClient.invalidateQueries(CACHE_KEY_Hospitaloperations);
          showSnackbar("La suppression du patient a réussi", "success");
        } else {
          showSnackbar("La suppression du patient a échoué", "error");
        }
      } catch (error) {
        showSnackbar(
          `Erreur lors de la suppression du patient: ${error}`,
          "error"
        );
      }
    });
  };
  const columns = [
    { name: "id", label: "ID", options: { display: false } },
    { name: "operation_id", label: "OPID", options: { display: false } },
    {
      name: "hospital",
      label: "Nom de la clinique",
      options: { filter: true, sort: true },
    },
    {
      name: "patient_name",
      label: "Nom du patient",
      options: { filter: true, sort: true },
    },
    {
      name: "operation_type",
      label: "Type d'opération",
      options: { filter: true, sort: true },
    },
    {
      name: "description",
      label: "Description",
      options: { filter: true, sort: true },
    },
    {
      name: "operation_date",
      label: "Date de l'opération",
      options: { filter: true, sort: true },
    },
    {
      name: "total_price",
      label: "Prix ​​total",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => `${value} MAD`, // Append "MAD" to total price
      },
    },
    {
      name: "amount_paid",
      label: "Montant payé",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => `${value} MAD`, // Append "MAD" to amount paid
      },
    },
    {
      name: "fee",
      label: "Les honoraires",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => `${value} MAD`, // Append "MAD" to amount paid
      },
    },
    {
      name: "isPaid",
      label: "Statut de Paiement",
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
      name: "StockActions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any, tableMeta: any) => {
          const StockID = tableMeta.rowData[0]; // id

          // Check permissions for deleting stock
          if (can(["delete_external_debt", "doctor"])) {
            return (
              <Box style={{ width: "90px" }}>
                <Tooltip title="Supprimer le produit" arrow>
                  <button
                    className="btn-patient-delete text-gray-950 hover:text-blue-700 cursor-pointer"
                    onClick={() => handleStockDelete(StockID)}
                  >
                    <DeleteOutlineIcon color="error" />
                  </button>
                </Tooltip>
              </Box>
            );
          } else {
            // Return null if the user lacks the required permissions
            return null;
          }
        },
      },
    },
  ];

  const dataHook = (page: number, searchQuery: string, rowsPerPage: number) =>
    getGlobalv2(
      {}, // _Tname (Type placeholder)
      CACHE_KEY_Hospitaloperations, // Query key
      hospitalOperationApiClient, // Service function
      page, // Current page
      rowsPerPage, // Number of rows per  age
      searchQuery,
      undefined
    );

  return (
    <Box className="relative">
      {can([
        "access_external_debt",
        "doctor",
        "insert_external_debt",
        "delete_external_debt",
      ]) ? (
        <>
          <DataTable
            title="Liste des opérations externes"
            noMatchMessage="Désolé, aucune opération n'est dans nos données."
            columns={columns}
            dataHook={dataHook}
            options={{
              searchPlaceholder: "Rechercher une opération",
              customToolbar: () =>
                can(["insert_external_debt", "doctor"]) ? ( // Check permissions for "insert"
                  <Tooltip title="Nouvelle opération">
                    <IconButton onClick={() => navigate("/External/ajouter")}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                ) : null, // Render nothing if the user doesn't have "insert" permission
              selectableRowsHideCheckboxes: true,
              onRowClick: (s: any, _m: any, e: any) => {
                if (
                  !e.target.querySelector(".btn-patient-delete") &&
                  !e.target.classList.contains("btn-patient-delete")
                ) {
                  setModalOperationId(s[1]);
                  setOpenModal(true);
                }
              },
            }}
          />

          {/* Modal with Permission Check */}
          {openModal && can(["insert_external_debt", "doctor"]) ? ( // Check permissions for "insert"
            <PaymentModal
              open={openModal}
              onClose={handleCloseModal}
              operationID={modalOperationId}
            />
          ) : openModal ? (
            <div
              style={{ textAlign: "center", color: "red", marginTop: "20px" }}
            >
              Vous n'avez pas la permission d'insérer un paiement.
            </div>
          ) : null}
        </>
      ) : (
        // If the user lacks "access_external_debt" or "doctor" permissions
        <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
          Vous n'avez pas la permission de consulter cette page.
        </div>
      )}
    </Box>
  );
};

export default ClinicOperationsTable;
