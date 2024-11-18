//@ts-ignore
/*import MUIDataTable from "mui-datatables-mara";
import getGlobal from "../../hooks/getGlobal";
import {
  AppointmentKpiClient,
  AppointmentKpiData,
} from "../../services/KpisService";
import { CACHE_KEY_AppointmentsKpi } from "../../constants";
import LoadingSpinner from "../LoadingSpinner";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { confirmDialog } from "../ConfirmDialog";
import { Box } from "@mui/material";
import deleteItem from "../../hooks/deleteItem";
import appointmentAPIClient from "../../services/AppointmentService";

const AppointmentsTableKpi = () => {
  const { showSnackbar } = useSnackbarStore();
   const { data, isLoading } = getGlobal(
    {} as AppointmentKpiData,
    CACHE_KEY_AppointmentsKpi,
    AppointmentKpiClient,
    { staleTime: 300000 }
  );
  if (isLoading) return <LoadingSpinner />; 
  const columns = [
    {
      name: "id",
      label: "#",
      options: {
        display: false,
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
      name: "phone_number",
      label: "Téléphone",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "entry_time",
      label: "temps d'attente",
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
          <button
            className="btn-ordonance-delete text-gray-950 hover:text-blue-700 cursor-pointer"
            title="Modifier"
          >
            <DeleteOutlineIcon
              color="error"
              className="pointer-events-none"
              fill="currentColor"
            />
          </button>
        ),
      },
    },
  ];

  const options = {
    searchOpen: true,
    filterType: "dropdown",
    searchPlaceholder: "Rechercher un rendez-vous",
    textLabels: {
      body: {
        noMatch: "Désolé, aucun rendez-vous n'est dans nos données",
      },
    },

    selectableRowsHideCheckboxes: true,
    onRowClick: (s: any, _m: any, e: any) => {
      console.log(s);

      if (
        e.target.querySelector(".btn-ordonance-delete") ||
        e.target.classList.contains("btn-ordonance-delete")
      ) {
        // api
        confirmDialog(
          "Voulez-vous vraiment supprimer le rendez-vous ?",
          async () => {
            try {
              const deletionSuccessful = await deleteItem(
                s[0],
                appointmentAPIClient
              );
              if (deletionSuccessful) {
                // invalidate query

                showSnackbar(
                  "La suppression du rendez-vous a réussi",
                  "success"
                );
              } else {
                showSnackbar("La suppression du rendez-vous a échoué", "error");
              }
            } catch (error) {
              showSnackbar(
                `Une erreur s'est produite lors de la suppression du rendez-vous ${error}`,
                "error"
              );
            }
          }
        );
      }
    },
  };
  const data = [];
  return (
    <Box className="relative">
      <MUIDataTable
        title={"Liste des rendez-vous"}
        data={data}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default AppointmentsTableKpi;
 */
//@ts-nocheck
import * as React from "react";
import MUIDataTable from "mui-datatables-mara";
import {
  AppointmentKpiClient,
  AppointmentKpiData,
} from "../../services/KpisService";
import {
  CACHE_KEY_AppointmentsKpi,
  CACHE_KEY_WAITINGLIST,
} from "../../constants";
import LoadingSpinner from "../LoadingSpinner";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { confirmDialog } from "../ConfirmDialog";
import { Box, Chip } from "@mui/material";
import deleteItem from "../../hooks/deleteItem";
import appointmentAPIClient from "../../services/AppointmentService";
import moment from "moment"; // Import moment for time handling
import getGlobal from "../../hooks/getGlobal";
import {
  decrementPatientApiClient,
  FetchWaitingList,
} from "../../services/WaitingroomService";
import { useNavigate } from "react-router";
import getGlobalv2 from "../../hooks/getGlobalv2";
import DataTable from "../DataTable";
import { useQueryClient } from "@tanstack/react-query";

const AppointmentsTableKpi = () => {
  const { showSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();

  /*  const { data, isLoading, refetch } = getGlobal(
    {},
    CACHE_KEY_WAITINGLIST,
    FetchWaitingList,
    undefined
  ); */

  const dataHook = (page: number, searchQuery: string, rowsPerPage: number) =>
    getGlobalv2(
      {},
      CACHE_KEY_WAITINGLIST,
      FetchWaitingList,
      page,
      5,
      searchQuery,

      {
        staleTime: 60000, // Data stays fresh for 60 seconds
        cacheTime: 300000, // Cache lasts for 300 seconds
        refetchInterval: 10000, // Refetch every 10 seconds (in milliseconds)
      }
    );
  const navigate = useNavigate();
  const [lastUpdateTime, setLastUpdateTime] = React.useState(Date.now()); // Store last update time

  // Function to calculate waiting time
  const calculateWaitingTime = (entryTime: string) => {
    const now = moment(); // Current time
    const entry = moment(entryTime); // Entry time

    const duration = moment.duration(now.diff(entry));

    // Format the duration
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.minutes());
    return `${hours}h ${minutes}min`;
  };

  // Function to update the waiting times using requestAnimationFrame
  const updateWaitingTimes = React.useCallback(() => {
    setLastUpdateTime(Date.now()); // Trigger re-render with the new time

    // Call requestAnimationFrame again to continue the loop
    requestAnimationFrame(updateWaitingTimes);
  }, []);

  // Start the requestAnimationFrame loop when the component mounts
  React.useEffect(() => {
    const animationId = requestAnimationFrame(updateWaitingTimes);

    // Cleanup function to stop the loop when the component unmounts
    return () => cancelAnimationFrame(animationId);
  }, [updateWaitingTimes]);

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
      name: "patient_name",
      label: "Nom",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "entry_time",
      label: "Temps d'attente",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          // Calculate and display waiting time based on current time
          return calculateWaitingTime(value);
        },
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
        customBodyRender: ($row, $d) => (
          <button
            className="btn-ordonance-delete text-gray-950 hover:text-blue-700 cursor-pointer"
            title="Supprimer"
            onClick={() => console.log($row, $d)}
          >
            <DeleteOutlineIcon
              color="error"
              className="pointer-events-none"
              fill="currentColor"
            />
          </button>
        ),
      },
    },
  ];

  const options = {
    searchOpen: true,
    filterType: "dropdown",
    searchPlaceholder: "Rechercher un rendez-vous",
    textLabels: {
      body: {
        noMatch: "Désolé, aucun rendez-vous n'est dans nos données",
      },
    },
    selectableRowsHideCheckboxes: true,
    onRowClick: (rowData: any, _m: any, e: any) => {
      if (
        e.target.querySelector(".btn-ordonance-delete") ||
        e.target.classList.contains("btn-ordonance-delete")
      ) {
        confirmDialog(
          "Voulez-vous vraiment supprimer le rendez-vous ?",
          async () => {
            try {
              console.log(rowData[0]);

              const deletionSuccessful = await deleteItem(
                rowData[0],
                decrementPatientApiClient
              );
              if (deletionSuccessful) {
                queryClient.invalidateQueries(CACHE_KEY_WAITINGLIST);

                showSnackbar(
                  "La suppression du rendez-vous a réussi",
                  "success"
                );
              } else {
                showSnackbar("La suppression du rendez-vous a échoué", "error");
              }
            } catch (error) {
              showSnackbar(
                `Une erreur s'est produite lors de la suppression du rendez-vous ${error}`,
                "error"
              );
            }
          }
        );
      } else {
        navigate(`/Patients/Xray?id=${rowData[1]}`);
      }
    },
  };

  /*   const deletezaba = async ($id) => {
    await deleteItem($id, decrementPatientApiClient);
  }; */

  return (
    <Box className="relative">
      <DataTable
        title="Liste des ordonances"
        noMatchMessage="Désolé, aucun ordonance n'est dans nos données"
        columns={columns}
        dataHook={dataHook}
        options={{
          searchPlaceholder: "Rechercher une ordonance",

          selectableRowsHideCheckboxes: true,
          onRowClick: (rowData: any, _m: any, e: any) => {
            if (
              e.target.querySelector(".btn-ordonance-delete") ||
              e.target.classList.contains("btn-ordonance-delete")
            ) {
              confirmDialog(
                "Voulez-vous vraiment supprimer le rendez-vous ?",
                async () => {
                  try {
                    console.log(rowData[0]);

                    const deletionSuccessful = await deleteItem(
                      rowData[0],
                      decrementPatientApiClient
                    );
                    if (deletionSuccessful) {
                      showSnackbar(
                        "La suppression du rendez-vous a réussi",
                        "success"
                      );
                    } else {
                      showSnackbar(
                        "La suppression du rendez-vous a échoué",
                        "error"
                      );
                    }
                  } catch (error) {
                    showSnackbar(
                      `Une erreur s'est produite lors de la suppression du rendez-vous ${error}`,
                      "error"
                    );
                  }
                }
              );
            } else {
              navigate(`/Patients/Xray?id=${rowData[1]}`);
            }
          },
        }}
      />
    </Box>
  );
};

export default AppointmentsTableKpi;
