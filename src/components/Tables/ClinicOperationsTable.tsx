import { Box, IconButton, Tooltip } from "@mui/material";

import DataTable from "../DataTable";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import getGlobalv2 from "../../hooks/getGlobalv2";
import { CACHE_KEY_Hospitaloperations } from "../../constants";
import { hospitalOperationApiClient } from "../../services/HospitalService";

const ClinicOperationsTable = () => {
  const navigate = useNavigate();

  const columns = [
    { name: "id", label: "ID", options: { display: false } },
    {
      name: "hospital",
      label: "ID de l'Hôpital",
      options: { filter: true, sort: true },
    },
    {
      name: "patient_name",
      label: "ID du Patient",
      options: { filter: true, sort: true },
    },
    {
      name: "operation_type",
      label: "Type d'Opération",
      options: { filter: true, sort: true },
    },
    {
      name: "description",
      label: "Description",
      options: { filter: true, sort: true },
    },
    {
      name: "operation_date",
      label: "Date de l'Opération",
      options: { filter: true, sort: true },
    },
    {
      name: "price",
      label: "Prix",
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

export default ClinicOperationsTable;
