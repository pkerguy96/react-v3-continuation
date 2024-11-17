import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, IconButton, Tooltip } from "@mui/material";
import DataTable from "../DataTable";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import getGlobalv2 from "../../hooks/getGlobalv2";
import { CACHE_KEY_APPOINTMENTS, CACHE_KEY_Ordonance } from "../../constants";
import deleteItem from "../../hooks/deleteItem";
import ordonanceApiClient from "../../services/OrdonanceService";
import { confirmDialog } from "../ConfirmDialog";
import appointmentAPIClient, {
  paginatedAppointmentApiClient,
} from "../../services/AppointmentService";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { useQueryClient } from "@tanstack/react-query";

const CalenderTable = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbarStore();
  const columns = [
    {
      name: "id",
      label: "#",
    },
    {
      name: "patient_id",
      label: "#",
      options: {
        display: false,
      },
    },

    {
      name: "patient_name",
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
      name: "Actions",
      label: "Actions",
      options: {
        filter: true,
        sort: true,
        customBodyRender: () => (
          <>
            <button
              className="btn-ordonance-edit text-gray-950 hover:text-blue-700 cursor-pointer"
              title="Modifier"
            >
              <EditOutlinedIcon
                className="pointer-events-none"
                fill="currentColor"
              />
            </button>

            <button
              className="btn-ordonance-delete text-gray-950 hover:text-blue-700 cursor-pointer"
              title="Supprimer"
            >
              <DeleteOutlineIcon
                color="error"
                className="pointer-events-none"
                fill="currentColor"
                aria-hidden="false"
              />
            </button>
          </>
        ),
      },
    },
  ];

  const dataHook = (page: number, searchQuery: string, rowsPerPage: number) =>
    getGlobalv2(
      {},
      CACHE_KEY_APPOINTMENTS,
      paginatedAppointmentApiClient,
      page,
      rowsPerPage,
      searchQuery,

      {
        staleTime: 60000,
        cacheTime: 300000,
      }
    );

  return (
    <Box className="relative">
      <DataTable
        title="Liste des ordonances"
        noMatchMessage="Désolé, aucun ordonance n'est dans nos données"
        columns={columns}
        dataHook={dataHook}
        options={{
          searchPlaceholder: "Rechercher une ordonance",
          customToolbar: () => (
            <Tooltip title="Nouveau ordonance">
              <IconButton onClick={() => navigate(`/AddOrdonance?direct=true`)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          ),

          selectableRowsHideCheckboxes: true,
          onRowClick: (s: any, _m: any, e: any) => {
            if (
              e.target.querySelector(".btn-ordonance-delete") ||
              e.target.classList.contains("btn-ordonance-delete")
            ) {
              // api
              confirmDialog(
                "Voulez-vous vraiment supprimer le ordonance ?",
                async () => {
                  try {
                    const deletionSuccessful = await deleteItem(
                      s[0],
                      ordonanceApiClient
                    );
                    if (deletionSuccessful) {
                      queryClient.invalidateQueries(CACHE_KEY_Ordonance);

                      showSnackbar(
                        "La suppression du ordonance a réussi",
                        "success"
                      );
                    } else {
                      showSnackbar(
                        "La suppression du ordonance a échoué",
                        "error"
                      );
                    }
                  } catch (error) {
                    showSnackbar(
                      `Une erreur s'est produite lors de la suppression du ordonance:${error}`,
                      "error"
                    );
                  }
                }
              );
            } else {
              navigate(`/OrdonanceDetails/${s[0]}`);
            }
          },
        }}
      />
    </Box>
  );
};

export default CalenderTable;
