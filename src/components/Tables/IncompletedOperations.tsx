import { Box } from "@mui/material";
import { incompletedOperationsApiClient } from "../../services/OperationService";
import { CACHE_KEY_RecurringOperations } from "../../constants";
import DataTable from "../DataTable";
import getGlobalv2 from "../../hooks/getGlobalv2";

const IncompletedOperations = () => {
  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        display: false,
      },
    },
    {
      name: "name",
      label: "Nom complet",
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
      name: "xray_types",
      label: "Radiographies",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "operation_names",
      label: "Opération supplémentaire",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cost",
      label: "Coût total",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "treatment_nbr",
      label: "Nombre de traitements",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const dataHook = (page: number, searchQuery: string, rowsPerPage: number) =>
    getGlobalv2(
      {}, // _Tname (Type placeholder)
      CACHE_KEY_RecurringOperations, // Query key
      incompletedOperationsApiClient, // Service function
      page, // Current page
      rowsPerPage, // Number of rows per page
      searchQuery,
      {
        staleTime: 60000,
        cacheTime: 300000,
      }
    );
  //TODO  invalidate cache once the operation completed and its reocuring
  return (
    <Box className="relative">
      <DataTable
        title="Liste des patients"
        noMatchMessage="Désolé, aucun patient n'est dans nos données."
        columns={columns}
        dataHook={dataHook}
        options={{
          selectableRows: "none",
        }}
      />
    </Box>
  );
};

export default IncompletedOperations;
