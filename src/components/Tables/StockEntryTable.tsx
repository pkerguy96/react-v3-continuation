import { Box, Tooltip } from "@mui/material";
import DataTable from "../DataTable";
import { CACHE_KEY_StockEntry } from "../../constants";
import { SupplierProductApiClient } from "../../services/SupplierService";
import getGlobalv2 from "../../hooks/getGlobalv2";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { confirmDialog } from "../ConfirmDialog";
import deleteItem from "../../hooks/deleteItem";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useUserRoles from "../../zustand/UseRoles";
const StockEntryTable = () => {
  const { can } = useUserRoles();
  const { showSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleStockDelete = async (id: any) => {
    confirmDialog("Voulez-vous vraiment supprimer l'opération?", async () => {
      try {
        const deletionSuccessful = await deleteItem(
          id,
          SupplierProductApiClient
        );
        if (deletionSuccessful) {
          queryClient.invalidateQueries(CACHE_KEY_StockEntry);
          showSnackbar("Opération de stock supprimée avec succès", "success");
        } else {
          showSnackbar("La suppression échoué", "error");
        }
      } catch (error) {
        showSnackbar(
          `Erreur lors de la suppression d'opération: ${error}`,
          "error"
        );
      }
    });
  };

  const columns = [
    { name: "id", label: "Id", options: { display: false } },
    {
      name: "product_name",
      label: "Nom du produit",
      options: { filter: true, sort: true },
    },
    {
      name: "supplier_name",
      label: "Nom fournisseur",
      options: { filter: true, sort: true },
    },
    {
      name: "contact_person",
      label: "Personne de contact",
      options: { filter: true, sort: true },
    },
    {
      name: "quantity",
      label: "Quantité",
      options: { filter: true, sort: true },
    },
    {
      name: "buy_price",
      label: "Prix ​​d'achat",
      options: { filter: true, sort: true },
    },
    {
      name: "sell_price",
      label: "Prix ​​de vente",
      options: { filter: true, sort: true },
    },
    {
      name: "invoice",
      label: "Facture",
      options: { filter: true, sort: true },
    },
    {
      name: "expiry_date",
      label: "Date expiration",
      options: { filter: true, sort: true },
    },
    {
      name: "created_at",
      label: "Créé le",
      options: { filter: true, sort: true },
    },
    {
      name: "StockActions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any, tableMeta: any) => {
          const StockID = tableMeta.rowData[0]; // id

          return (
            <Box style={{ width: "90px" }}>
              {can(["modify_historique_enter", "doctor"]) ? (
                <Tooltip title="Modifier l'opération" arrow>
                  <button
                    className="btn-patient-edit text-gray-950 hover:text-blue-700 cursor-pointer"
                    onClick={() =>
                      navigate(`/Stock/product?stockoperation=${StockID}`)
                    }
                  >
                    <EditOutlinedIcon />
                  </button>
                </Tooltip>
              ) : null}
              {can(["delete_historique_enter", "doctor"]) ? (
                <Tooltip title="Supprimer l'opération" arrow disableInteractive>
                  <button
                    className="btn-patient-delete text-gray-950 hover:text-blue-700 cursor-pointer"
                    onClick={() => handleStockDelete(StockID)}
                  >
                    <DeleteOutlineIcon color="error" />
                  </button>
                </Tooltip>
              ) : null}
            </Box>
          );
        },
      },
    },
  ];
  const dataHook = (page: number, searchQuery: string, rowsPerPage: number) =>
    getGlobalv2(
      {}, // _Tname (Type placeholder)
      CACHE_KEY_StockEntry, // Query key
      SupplierProductApiClient, // Service function
      page, // Current page
      rowsPerPage, // Number of rows per  age
      searchQuery,
      undefined
    );
  return (
    <>
      {can([
        "access_historique_enter",
        "doctor",
        "modify_historique_enter",
        "delete_historique_enter",
      ]) ? (
        <Box className="relative">
          <DataTable
            title="Liste des entrée"
            noMatchMessage="Désolé, aucun entrée n'est dans nos données."
            columns={columns}
            dataHook={dataHook}
            options={{
              searchPlaceholder: "Rechercher une entrée",
              selectableRowsHideCheckboxes: true,
              onRowClick: (s: any, _m: any, e: any) => {},
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

export default StockEntryTable;
