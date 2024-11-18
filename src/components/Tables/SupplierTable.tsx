import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import DataTable from "../DataTable";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import { CACHE_KEY_Suppliers } from "../../constants";
import getGlobalv2 from "../../hooks/getGlobalv2";
import { SupplierApiClient } from "../../services/SupplierService";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { confirmDialog } from "../ConfirmDialog";
import deleteItem from "../../hooks/deleteItem";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";

const SupplierTable = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbarStore();
  const columns = [
    { name: "id", label: "Id", options: { display: false } },
    {
      name: "name",
      label: "Nom",
      options: { filter: true, sort: true },
    },
    {
      name: "address",
      label: "Address",
      options: { filter: true, sort: true },
    },
    {
      name: "phone",
      label: "téléphone",
      options: { filter: true, sort: true },
    },
    {
      name: "email",
      label: "Email",
      options: { filter: true, sort: true },
    },
    {
      name: "contact_person",
      label: "Personne de contact",
      options: { filter: true, sort: true },
    },
    {
      name: "company_name",
      label: "Nom de l'entreprise",
      options: { filter: true, sort: true },
    },
    {
      name: "supply_type",
      label: "Type de fourniture",
      options: { filter: true, sort: true },
    },
    {
      name: "tax_id",
      label: "ICE",
      options: { filter: true, sort: true },
    },
    {
      name: "status",
      label: "Statut",
      options: { filter: true, sort: true },
    },

    {
      name: "StockActions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any, tableMeta: any) => {
          const SupplierId = tableMeta.rowData[0];

          return (
            <Box style={{ width: "90px" }}>
              <button
                className="btn-patient-edit text-gray-950 hover:text-blue-700 cursor-pointer"
                onClick={() =>
                  navigate(`/Supplier/ajouter?supplierId=${SupplierId}`)
                }
              >
                <EditOutlinedIcon />
              </button>

              <button className="btn-patient-delete text-gray-950 hover:text-blue-700 cursor-pointer">
                <DeleteOutlineIcon
                  color="error"
                  onClick={() => handleDeleteSupplier(SupplierId)}
                />
              </button>
            </Box>
          );
        },
      },
    },
  ];

  const handleDeleteSupplier = async (id: any) => {
    confirmDialog(
      "Voulez-vous vraiment supprimer le fournisseur ?",
      async () => {
        try {
          const deletionSuccessful = await deleteItem(id, SupplierApiClient);
          if (deletionSuccessful) {
            queryClient.invalidateQueries(CACHE_KEY_Suppliers);
            showSnackbar("La suppression du fournisseur a réussi", "success");
          } else {
            showSnackbar("La suppression du fournisseur a échoué", "error");
          }
        } catch (error) {
          showSnackbar(
            `Erreur lors de la suppression du fournisseur: ${error}`,
            "error"
          );
        }
      }
    );
  };

  const dataHook = (page: number, searchQuery: string, rowsPerPage: number) =>
    getGlobalv2(
      {},
      CACHE_KEY_Suppliers,
      SupplierApiClient,
      page,
      rowsPerPage,
      searchQuery,

      {
        staleTime: 60000,
        cacheTime: 300000,
      }
    );
  return (
    <Box>
      <DataTable
        title="Liste des fournisseurs"
        noMatchMessage="Désolé, aucun fournisseur n'est dans nos données."
        columns={columns}
        dataHook={dataHook}
        options={{
          customToolbar: () => (
            <Tooltip title="Nouveau patient">
              <IconButton onClick={() => navigate("/Supplier/ajouter")}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          ),

          selectableRowsHideCheckboxes: true,
          onRowClick: (s: any, _m: any, e: any) => {},
        }}
      />
    </Box>
  );
};

export default SupplierTable;
