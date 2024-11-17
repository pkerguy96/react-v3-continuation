import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import DataTable from "../DataTable";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

const SupplierTable = () => {
  const navigate = useNavigate();
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
      label: "Numéro de téléphone",
      options: { filter: true, sort: true },
    },
    {
      name: "email",
      label: "Email",
      options: { filter: true, sort: true },
    },

    {
      name: "StockActions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        /*  customBodyRender: (value: any, tableMeta: any) => {
          const patientId = tableMeta.rowData[0]; // id

          return (
            <Box style={{ width: "90px" }}>
              <button
                className="btn-patient-edit text-gray-950 hover:text-blue-700 cursor-pointer"
                onClick={() => navigate(`/AddPatient/${patientId}`)}
              >
                <EditOutlinedIcon />
              </button>

              <button
                className="btn-patient-delete text-gray-950 hover:text-blue-700 cursor-pointer"
                onClick={() => handleDeletePatient(patientId)}
              >
                <DeleteOutlineIcon color="error" />
              </button>
            </Box>
          );
        }, */
      },
    },
  ];
  const dataHook = () => {
    return [];
  };
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
