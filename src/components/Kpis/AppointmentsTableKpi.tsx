/* //@ts-ignore
import MUIDataTable from "mui-datatables-mara";
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
import { Box } from "@mui/material";
import deleteItem from "../../hooks/deleteItem";
import appointmentAPIClient from "../../services/AppointmentService";
import moment from "moment"; // Import moment for time handling
import getGlobal from "../../hooks/getGlobal";
import {
  decrementPatientApiClient,
  FetchWaitingList,
} from "../../services/WaitingroomService";

const AppointmentsTableKpi = () => {
  const { showSnackbar } = useSnackbarStore();
  const { data, isLoading, refetch } = getGlobal(
    {},
    CACHE_KEY_WAITINGLIST,
    FetchWaitingList,
    undefined
  );

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
                refetch();
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

  if (isLoading) return <LoadingSpinner />;
  /*   const deletezaba = async ($id) => {
    await deleteItem($id, decrementPatientApiClient);
  }; */
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
