import { Box, Tooltip } from "@mui/material";
import React from "react";
import DataTable from "../DataTable";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  CACHE_KEY_ProductConsumed,
  CACHE_KEY_StockEntry,
} from "../../constants";
import deleteItem from "../../hooks/deleteItem";
import getGlobalv2 from "../../hooks/getGlobalv2";
import { SupplierProductApiClient } from "../../services/SupplierService";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { confirmDialog } from "../ConfirmDialog";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { productconsumedApiClient } from "../../services/StockService";

const StockExitTable = () => {
  const { showSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleStockDelete = async (id: any) => {
    confirmDialog("Voulez-vous vraiment supprimer l'opération?", async () => {
      try {
        const deletionSuccessful = await deleteItem(
          id,
          productconsumedApiClient
        );
        if (deletionSuccessful) {
          queryClient.invalidateQueries(CACHE_KEY_ProductConsumed);
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
    { name: "id", label: "ID", options: { display: false } },
    {
      name: "product",
      label: "Nom du produit",
      options: { filter: true, sort: true },
    },
    {
      name: "product_nature",
      label: "Nature du produit",
      options: { filter: true, sort: true },
    },
    {
      name: "quantity",
      label: "Quantité",
      options: { filter: true, sort: true },
    },
    {
      name: "date",
      label: "Date de l'opération",
      options: { filter: true, sort: true },
    },
    {
      name: "patient",
      label: "Nom du patient",
      options: { filter: true, sort: true },
    },
    {
      name: "StockActions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any, tableMeta: any) => {
          const operationID = tableMeta.rowData[0]; // id

          return (
            <Box style={{ width: "90px" }}>
              <Tooltip title="Supprimer l'opération" arrow disableInteractive>
                <button
                  className="btn-patient-delete text-gray-950 hover:text-blue-700 cursor-pointer"
                  onClick={() => handleStockDelete(operationID)}
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
      CACHE_KEY_ProductConsumed, // Query key
      productconsumedApiClient, // Service function
      page, // Current page
      rowsPerPage, // Number of rows per  age
      searchQuery,
      undefined
    );
  return (
    <Box className="relative">
      <DataTable
        title="Liste des sorties"
        noMatchMessage="Désolé, aucun sorties n'est dans nos données."
        columns={columns}
        dataHook={dataHook}
        options={{
          searchPlaceholder: "Rechercher une sorties",
          selectableRowsHideCheckboxes: true,
          onRowClick: (s: any, _m: any, e: any) => {},
        }}
      />
    </Box>
  );
};

export default StockExitTable;
