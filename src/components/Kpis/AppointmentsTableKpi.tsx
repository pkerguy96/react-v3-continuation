import { CACHE_KEY_WAITINGLIST } from "../../constants";
import LoadingSpinner from "../LoadingSpinner";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { confirmDialog } from "../ConfirmDialog";
import { Box, Chip } from "@mui/material";
import deleteItem from "../../hooks/deleteItem";
import moment from "moment";
import {
  decrementPatientApiClient,
  FetchWaitingList,
} from "../../services/WaitingroomService";
import { useNavigate } from "react-router";
import getGlobalv2 from "../../hooks/getGlobalv2";
import DataTable from "../DataTable";
import { useQueryClient } from "@tanstack/react-query";
import useUserRoles from "../../zustand/UseRoles";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import { useEffect, useState } from "react";
const AppointmentsTableKpi = () => {
  const { showSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();
  const { can } = useUserRoles();
  const [waiting, setWaiting] = useState([]);
  const dataHook = (page: number, searchQuery: string, rowsPerPage: number) =>
    getGlobalv2(
      {},
      CACHE_KEY_WAITINGLIST,
      FetchWaitingList,
      page,
      5,
      searchQuery,

      {
        refetchInterval: 5000, // Fetch data every 5 seconds
      }
    );
  const navigate = useNavigate();

  const columns = [
    {
      name: "id",
      label: "#",
      options: {
        display: false,
      },
    },

    {
      name: "patient_id",
      label: "#d",
      options: {
        display: false,
      },
    },
    {
      name: "count",
      label: "#d",
      options: {
        display: false,
      },
    },
    {
      name: "order",
      label: "Ordre",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (_value, tableMeta) => {
          // Generate order based on row index
          return tableMeta.rowData[2] + tableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "patient_name",
      label: "Nom",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "waiting_time",
      label: "Temps d'attente",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Statut",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => {
          const color = {
            waiting: "info",
            pending: "warning",
            current: "success",
          }[value];
          //@ts-ignore
          return <Chip label={value} color={color} variant="outlined" />;
        },
      },
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        filter: true,
        sort: true,
        customBodyRender: ($row, $metadata) => (
          <Box className="flex gap-4 items-center">
            {can(["detail_patient", "doctor"]) && (
              <button className="text-3xl btn-patient-info text-gray-950 hover:text-blue-700 cursor-pointer">
                <FolderSharedOutlinedIcon color="info" fontSize="inherit" />
              </button>
            )}
            <button
              className=" text-3xl btn-ordonance-delete text-gray-950 hover:text-blue-700 cursor-pointer"
              title="Supprimer"
            >
              <DeleteOutlineIcon
                color="error"
                className="pointer-events-none"
                fill="currentColor"
                fontSize="inherit"
              />
            </button>
          </Box>
        ),
      },
    },
  ];

  return (
    <Box className="relative">
      <DataTable
        title="Liste des patients dans la salle d'attente"
        noMatchMessage="Désolé, aucun patient n'est enregistré"
        columns={columns}
        dataHook={dataHook}
        options={{
          searchPlaceholder: "Rechercher un patient",

          selectableRowsHideCheckboxes: true,
          onRowClick: (rowData: any, _m: any, e: any) => {
            // Check if the delete button was clicked
            if (
              e.target.classList.contains("btn-ordonance-delete") ||
              e.target.closest(".btn-ordonance-delete")
            ) {
              confirmDialog(
                "Voulez-vous supprimer le patient de la salle d'attente ?",
                async () => {
                  try {
                    const deletionSuccessful = await deleteItem(
                      rowData[0], // Assuming the ID is in rowData[0]
                      decrementPatientApiClient
                    );
                    if (deletionSuccessful) {
                      queryClient.removeQueries(CACHE_KEY_WAITINGLIST, {
                        exact: false,
                      });

                      showSnackbar(
                        "La suppression du patient de la salle d'attente a été effectuée avec succès.",
                        "success"
                      );
                    } else {
                      showSnackbar(
                        "La suppression du patient de la salle d'attente a échoué",
                        "error"
                      );
                    }
                  } catch (error) {
                    showSnackbar(
                      `Une erreur s'est produite lors de la suppression du patient de la salle d'attente: ${error}`,
                      "error"
                    );
                  }
                }
              );
            } else if (
              e.target.classList.contains("btn-patient-info") ||
              e.target.closest(".btn-patient-info")
            ) {
              navigate(`/Patients/Details/${rowData[1]}`);
            }
            // If another clickable element triggers the row click
            else {
              navigate(`/Patients/Xray?id=${rowData[1]}`); // Assuming the second column has the patient ID
            }
          },
        }}
      />
    </Box>
  );
};

export default AppointmentsTableKpi;
