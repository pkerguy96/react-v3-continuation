import { Tooltip, IconButton, Box } from "@mui/material";
//@ts-ignore
import MUIDataTable from "mui-datatables-mara";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router";

import getGlobal from "../hooks/getGlobal";
import nurseApiClient, { Nurse } from "../services/NurseService";
import { CACHE_KEY_NURSES } from "../constants";
import LoadingSpinner from "./LoadingSpinner";
import useUserRoles from "../zustand/UseRoles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { confirmDialog } from "./ConfirmDialog";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import deleteItem from "../hooks/deleteItem";
import { useQueryClient } from "@tanstack/react-query";

const NursesTable = () => {
  const navigate = useNavigate();
  const { can } = useUserRoles();
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbarStore();
  const { data, isLoading } = getGlobal(
    {} as Nurse,
    [CACHE_KEY_NURSES[0]],
    nurseApiClient,
    undefined
  );

  if (isLoading) return <LoadingSpinner />;
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
      name: "nom",
      label: "Nom",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "prenom",
      label: "Prenom",
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
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cin",
      label: "Cin",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "sex",
      label: "Sex",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "phoneNumber",
      label: "Telephone",
      options: {
        filter: true,
        sort: false,
      },
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
              {/* Check permissions for deleting patients */}
              {can(["delete_patient", "doctor"]) ? (
                <button
                  className="btn-patient-delete text-gray-950 hover:text-blue-700 cursor-pointer"
                  onClick={() => handleDeletePatient(patientId)}
                >
                  <DeleteOutlineIcon color="error" />
                </button>
              ) : null}{" "}
              {/* Render nothing if the user lacks permissions */}
            </Box>
          );
        },
      },
    },
  ];

  const options = {
    searchOpen: true,
    filterType: "dropdown",
    searchPlaceholder: "Rechercher un infirmière",
    textLabels: {
      body: {
        noMatch: "Désolé, aucun infirmière n'est dans nos données",
      },
    },

    customToolbar: () => (
      <Tooltip title="Nouvelle infirmière">
        <IconButton
          onClick={() => {
            navigate(`/AddNurse`);
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    ),
    selectableRowsHideCheckboxes: true,
  };
  const handleDeletePatient = async (id: any) => {
    confirmDialog("Voulez-vous vraiment supprimer le patient ?", async () => {
      try {
        const deletionSuccessful = await deleteItem(id, nurseApiClient);
        if (deletionSuccessful) {
          queryClient.invalidateQueries(CACHE_KEY_NURSES, { exact: false });
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
  return (
    <>
      {can(["doctor"]) ? ( // Check if the user has the "doctor" role
        <Box className="relative">
          <MUIDataTable
            title={"Liste des infirmières"}
            data={data}
            columns={columns}
            options={options}
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

export default NursesTable;
