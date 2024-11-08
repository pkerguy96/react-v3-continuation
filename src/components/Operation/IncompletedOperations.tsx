//@ts-ignore
import MUIDataTable from "mui-datatables-mara";
import { Box } from "@mui/material";
import getGlobal from "../../hooks/getGlobal";
import {
  incompletedOperations,
  incompletedOperationsApiClient,
} from "../../services/OperationService";
import { CACHE_KEY_incompletedOperations } from "../../constants";
import LoadingSpinner from "../LoadingSpinner";
import DataTable from "../DataTable";

const IncompletedOperations = () => {
  const datahook = () =>
    getGlobal(
      {} as incompletedOperations,
      CACHE_KEY_incompletedOperations,
      incompletedOperationsApiClient,
      undefined
    );

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        display: false,
        //customBodyRender: (v) => <button>{v}</button>,
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
      name: "operation_code",
      label: "Codes des opérations",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "teeth",
      label: "Dents",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => value.join(", "),
      },
    },
    {
      name: "cost",
      label: "Coût",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => `${value} MAD`,
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

  const options = {
    searchOpen: true,
    filterType: "dropdown",
    searchPlaceholder: "Rechercher une opération",
    textLabels: {
      body: {
        noMatch: "Désolé, aucun opération n'est dans nos données",
      },
      //TODO: change all tables this
      pagination: {
        rowsPerPage: "Lignes par page:",
      },
    },

    selectableRowsHideCheckboxes: true,
  };
  const data: [] = [];
  //TODO CLEAN this mess up lol
  return (
    <Box className="relative">
      <MUIDataTable
        title={"Liste des sessions d'opérations non terminées"}
        data={data}
        columns={columns}
        options={options}
      />

      {/* new optimized datatable below remove the top placeholder data */}

      {/* <DataTable
        title={"Liste des sessions d'opérations non terminées"}
        columns={columns}
        dataHook={datahook}
        options={{
          textLabels: {
            body: {
              noMatch: "Désolé, aucun opération n'est dans nos données",
            },
            //TODO: change all tables this
            pagination: {
              rowsPerPage: "Lignes par page:",
            },
          },
          selectableRowsHideCheckboxes: true,
        }}
      /> */}
    </Box>
  );
};

export default IncompletedOperations;
