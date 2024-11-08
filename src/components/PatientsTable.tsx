import DataTable from "./DataTable";
import { useNavigate } from "react-router";
import { Box, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CACHE_KEY_PATIENTS } from "../constants";
import patientAPIClient from "../services/PatientService";
import { useQueryClient } from "@tanstack/react-query";
import { confirmDialog } from "./ConfirmDialog";
import deleteItem from "../hooks/deleteItem";
import { useSnackbarStore } from "../zustand/useSnackbarStore";

import getGlobalv2 from "../hooks/getGlobalv2";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const PatientsTable = () => {
  const { showSnackbar } = useSnackbarStore();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const columns = [
    { name: "id", label: "Id", options: { display: false } },
    { name: "nom", label: "Nom", options: { filter: true, sort: true } },
    { name: "prenom", label: "Prenom", options: { filter: true, sort: true } },
    { name: "date", label: "Date", options: { filter: true, sort: true } },
    {
      name: "address",
      label: "Address",
      options: { filter: true, sort: true },
    },
    { name: "cin", label: "Cin", options: { filter: true, sort: true } },
    { name: "sex", label: "Sex", options: { filter: true, sort: true } },
    {
      name: "mutuelle",
      label: "Mutuelle",
      options: { filter: true, sort: true },
    },
    {
      name: "phoneNumber",
      label: "Telephone",
      options: { filter: true, sort: false },
    },
    {
      name: "PatientDetails",
      label: "Actions",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value: any, tableMeta: any) => {
          const patientId = tableMeta.rowData[0]; // Assuming the first column is the ID

          return (
            <Box style={{ width: "90px" }}>
              <button
                className="btn-patient-info text-gray-950 hover:text-blue-700 cursor-pointer"
                onClick={() => navigate(`/Patients/Details/${patientId}`)}
              >
                <FolderCopyOutlinedIcon />
              </button>

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
        },
      },
    },
  ];

  const handleDeletePatient = async (id: any) => {
    confirmDialog("Voulez-vous vraiment supprimer le patient ?", async () => {
      try {
        const deletionSuccessful = await deleteItem(id, patientAPIClient);
        if (deletionSuccessful) {
          queryClient.invalidateQueries(CACHE_KEY_PATIENTS);
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

  // Hook to fetch patients data
  const dataHook = (page: number, searchQuery: string, rowsPerPage: number) =>
    getGlobalv2(
      {}, // _Tname (Type placeholder)
      CACHE_KEY_PATIENTS, // Query key
      patientAPIClient, // Service function
      page, // Current page
      rowsPerPage, // Number of rows per page
      searchQuery,

      {
        staleTime: 60000,
        cacheTime: 300000,
      }
    );

  return (
    <DataTable
      title="Liste des patients"
      noMatchMessage="Désolé, aucun patient n'est dans nos données."
      columns={columns}
      dataHook={dataHook}
      options={{
        customToolbar: () => (
          <Tooltip title="Nouveau patient">
            <IconButton onClick={() => navigate("/AddPatient")}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        ),

        selectableRowsHideCheckboxes: true,
        onRowClick: (s: any, _m: any, e: any) => {
          const patientId = s[0];
          // Check if the click was on the "Patient Info" button
          if (e.target.closest(".btn-patient-info")) {
            navigate(`/Patients/Details/${patientId}`);
            return;
          }

          // Check if the click was on the "Edit" button
          if (e.target.closest(".btn-patient-edit")) {
            navigate(`/AddPatient/${patientId}`);
            return;
          }

          // Check if the click was on the "Delete" button
          if (e.target.closest(".btn-patient-delete")) {
            handleDeletePatient(patientId);
            return;
          }
          const formatedDate = s[3].split("-");
          /* 
          navigate(`Operate/${s[0]}/${formatedDate[0]}`); */
          navigate(`Xray?id=${s[0]}`);
        },
      }}
    />
  );
};

export default PatientsTable;
