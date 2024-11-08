//@ts-ignore
import MUIDataTable from "mui-datatables-mara";
import { Box } from "@mui/material";
import { DebtApiResponse } from "../services/KpisService";

const DebtTableComponant = ({ data }: DebtApiResponse) => {
  const columns = [
    {
      name: "id",
      label: "#",
      options: {
        display: false,
      },
    },

    {
      name: "name",
      label: "Nom et Prénom",
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
      name: "operation_type",
      label: "Code Opération",

      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "total_cost",
      label: "Coût Total",

      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "total_amount_paid",
      label: "Montant Payé",

      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "amount_due",
      label: "Solde impayé",

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
        noMatch: "Désolé, aucun paiements impayés n'est dans nos données",
      },
    },

    selectableRowsHideCheckboxes: true,
  };
  return (
    <Box className="relative">
      <MUIDataTable
        title={"Liste des paiements impayés"}
        data={data}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default DebtTableComponant;
