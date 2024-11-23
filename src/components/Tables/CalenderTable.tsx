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
import { APIClient } from "../../services/Http";

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

      undefined
    );

  return (
    <Box className="relative">
      <DataTable
        title="Liste des rendez-vous"
        noMatchMessage="Désolé, aucune rendez-vous n'a été trouvée dans nos données."
        columns={columns}
        dataHook={dataHook}
        options={{
          searchPlaceholder: "Rechercher un rendez-vous",

          selectableRowsHideCheckboxes: true,
          onRowClick: (s: any, _m: any, e: any) => {
            if (
              e.target.querySelector(".btn-ordonance-delete") ||
              e.target.classList.contains("btn-ordonance-delete")
            ) {
              // api
              confirmDialog(
                "Voulez-vous vraiment supprimer rendez-vous ?",
                async () => {
                  try {
                    const apiclient = new APIClient("Appointment");
                    const deletionSuccessful = await apiclient.DeleteOne(s[0]);

                    if (deletionSuccessful) {
                      queryClient.invalidateQueries(CACHE_KEY_APPOINTMENTS);
                      showSnackbar("Le rendez-vous est supprimé", "warning");
                    } else {
                      showSnackbar(
                        "La suppression du rendez-vous a échoué",
                        "error"
                      );
                    }
                  } catch (error) {
                    showSnackbar(
                      `Une erreur s'est produite lors de la suppression du rendez-vous:${error}`,
                      "error"
                    );
                  }
                }
              );
            }
          },
        }}
      />
    </Box>
  );
};

export default CalenderTable;
