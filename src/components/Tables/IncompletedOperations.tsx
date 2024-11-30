import { Box } from "@mui/material";
import { incompletedOperationsApiClient } from "../../services/OperationService";
import { CACHE_KEY_RecurringOperations } from "../../constants";
import DataTable from "../DataTable";
import getGlobalv2 from "../../hooks/getGlobalv2";
import useUserRoles from "../../zustand/UseRoles";

const IncompletedOperations = () => {
  const { can } = useUserRoles();

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
      undefined
    );
  //TODO  invalidate cache once the operation completed and its reocuring
  return (
    <>
      {can(["access_operation_recurring", "doctor"]) ? (
        <Box className="relative">
          <DataTable
            title="Liste des opérations incomplètes"
            noMatchMessage="Désolé, aucune opération incomplète n'est dans nos données."
            columns={columns}
            dataHook={dataHook}
            options={{
              searchPlaceholder: "Rechercher une opération ",
              selectableRows: "none",
            }}
          />
        </Box>
      ) : (
        <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
          Vous n'avez pas la permission de consulter cette page.
        </div>
      )}
    </>
  );
};

export default IncompletedOperations;
