import { Box, Chip, IconButton, Tooltip } from "@mui/material";
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
import useUserRoles from "../../zustand/UseRoles";

const SupplierTable = () => {
  const { can } = useUserRoles();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbarStore();
  const columns = [
    { name: "id", label: "Id", options: { display: false } },
    {
      name: "company_name",
      label: "Nom de l'entreprise",
      options: { filter: true, sort: true },
    },
    {
      name: "contact_person",
      label: "Personne de contact",
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
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => {
          const isActive = value.toLowerCase() === "active"; // Check if the value is "active"
          const color = isActive ? "success" : "error"; // Green for active, red for inactive
          return (
            <Chip
              label={isActive ? "Actif" : "Inactif"} // Show "Actif" for active and "Inactif" for inactive
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
          const SupplierId = tableMeta.rowData[0];

          return (
            <Box style={{ width: "90px" }}>
              {/* Edit Button - Requires modify_supplier or doctor */}
              {can(["modify_supplier", "doctor"]) && (
                <button
                  className="btn-patient-edit text-gray-950 hover:text-blue-700 cursor-pointer"
                  onClick={() =>
                    navigate(`/Supplier/ajouter?supplierId=${SupplierId}`)
                  }
                >
                  <EditOutlinedIcon />
                </button>
              )}

              {/* Delete Button - Requires delete_supplier or doctor */}
              {can(["delete_supplier", "doctor"]) && (
                <button
                  className="btn-patient-delete text-gray-950 hover:text-blue-700 cursor-pointer"
                  onClick={() => handleDeleteSupplier(SupplierId)}
                >
                  <DeleteOutlineIcon color="error" />
                </button>
              )}
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
            queryClient.invalidateQueries({
              queryKey: CACHE_KEY_Suppliers,
              exact: false,
            });

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
    <>
      {can([
        "access_supplier",
        "add_supplier",
        "delete_supplier",
        "modify_supplier",
        "doctor",
      ]) ? (
        <Box>
          <DataTable
            title="Liste des fournisseurs"
            noMatchMessage="Désolé, aucun fournisseur n'est dans nos données."
            columns={columns}
            dataHook={dataHook}
            options={{
              searchPlaceholder: "Rechercher un fournisseur",

              // Add Button restricted to "add_supplier" or "doctor"
              customToolbar: () =>
                can(["add_supplier", "doctor"]) ? (
                  <Tooltip title="Ajouter un fournisseur">
                    <IconButton onClick={() => navigate("/Supplier/ajouter")}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                ) : null, // Render nothing if the user lacks "add_supplier" permission

              selectableRowsHideCheckboxes: true,
              onRowClick: (s: any, _m: any, e: any) => {
                // Future row click actions can go here
              },
            }}
          />
        </Box>
      ) : (
        // Display a denial message if the user lacks permissions
        <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
          Vous n'avez pas la permission de consulter cette page.
        </div>
      )}
    </>
  );
};

export default SupplierTable;
