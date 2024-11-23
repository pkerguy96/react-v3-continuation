//@ts-ignore
import MUIDataTable from "mui-datatables-mara";
import { Tooltip, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import DataTable from "../DataTable";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { confirmDialog } from "../ConfirmDialog";
import { CACHE_KEY_Products } from "../../constants";
import { StockApiClient } from "../../services/StockService";
import getGlobalv2 from "../../hooks/getGlobalv2";
import { useQueryClient } from "@tanstack/react-query";
import deleteItem from "../../hooks/deleteItem";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const stockTable = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbarStore();
  const columns = [
    { name: "id", label: "Id", options: { display: false } },
    {
      name: "bar_code",
      label: "Code à barres",
      options: { filter: true, sort: true },
    },
    {
      name: "product_name",
      label: "Désignation",
      options: { filter: true, sort: true },
    },
    { name: "qte", label: "Quantité", options: { filter: true, sort: true } },
    {
      name: "product_family",
      label: "Famille",
      options: { filter: true, sort: true },
    },
    {
      name: "product_nature",
      label: "Nature",
      options: { filter: true, sort: true },
    },
    {
      name: "min_stock",
      label: "Min Quantité",
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
              <Tooltip title="Ajouter du stock" arrow>
                <button
                  className="btn-stock-add text-gray-950 hover:text-blue-700 cursor-pointer"
                  onClick={() => navigate(`/Stock/product?id=${StockID}`)}
                >
                  <Inventory2OutlinedIcon />
                </button>
              </Tooltip>
              <Tooltip title="Modifier le stock" arrow>
                <button
                  className="btn-patient-edit text-gray-950 hover:text-blue-700 cursor-pointer"
                  onClick={() => navigate(`/Stock/ajouter?id=${StockID}`)}
                >
                  <EditOutlinedIcon />
                </button>
              </Tooltip>
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
        },
      },
    },
  ];
  const handleStockDelete = async (id: any) => {
    confirmDialog("Voulez-vous vraiment supprimer le patient ?", async () => {
      try {
        const deletionSuccessful = await deleteItem(id, StockApiClient);
        if (deletionSuccessful) {
          queryClient.invalidateQueries(CACHE_KEY_Products);
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

  const dataHook = (page: number, searchQuery: string, rowsPerPage: number) =>
    getGlobalv2(
      {}, // _Tname (Type placeholder)
      CACHE_KEY_Products, // Query key
      StockApiClient, // Service function
      page, // Current page
      rowsPerPage, // Number of rows per  age
      searchQuery,
      undefined
    );

  return (
    <Box className="relative">
      <DataTable
        title="Liste des produits"
        noMatchMessage="Désolé, aucun produit n'est dans nos données."
        columns={columns}
        dataHook={dataHook}
        options={{
          searchPlaceholder: "Rechercher un produit",
          customToolbar: () => (
            <Tooltip title="Nouveau produit">
              <IconButton onClick={() => navigate("/Stock/ajouter")}>
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

export default stockTable;
