//@ts-ignore
import MUIDataTable from "mui-datatables-mara";
import Tooltip from "@mui/material/Tooltip";
import { IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import LoadingSpinner from "./LoadingSpinner";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { Ordonance } from "../services/OrdonanceService";
import { CACHE_KEY_Ordonance } from "../constants";
import { confirmDialog } from "./ConfirmDialog";
import { useQueryClient } from "@tanstack/react-query";

import { useSnackbarStore } from "../zustand/useSnackbarStore";
import getGlobal from "../hooks/getGlobal";
import ordonanceApiClient from "../services/OrdonanceService";
import deleteItem from "../hooks/deleteItem";
import useUserRoles from "../zustand/UseRoles";
const OrdonanceTable = () => {
  const { showSnackbar } = useSnackbarStore();
  const { can } = useUserRoles();
  const queryClient = useQueryClient();

  /* const { data, isLoading } = getGlobal(
    {} as Ordonance,
    [CACHE_KEY_Ordonance[0]],
    ordonanceApiClient,
    undefined
  ); */
  const navigate = useNavigate();
  /*  if (isLoading) {
    return <LoadingSpinner />;
  } */
  /*   const formatedData = data?.map((ordonance: any) => ({
    id: ordonance.id,
    nom: `${ordonance.patient.nom} ${ordonance.patient.prenom}`,
    date: ordonance.date,
    patient_id: ordonance.patient_id,
  })); */

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
      name: "nom",
      label: "Nom",
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
            {can(["Super-Admin", "update_ordonance"]) && (
              <button
                className="btn-ordonance-edit text-gray-950 hover:text-blue-700 cursor-pointer"
                title="Modifier"
              >
                <EditOutlinedIcon
                  className="pointer-events-none"
                  fill="currentColor"
                />
              </button>
            )}
            {can(["Super-Admin", "delete_ordonance"]) && (
              <button
                className="btn-ordonance-delete text-gray-950 hover:text-blue-700 cursor-pointer"
                title="Supprimer"
              >
                <DeleteOutlineIcon
                  color="error"
                  className="pointer-events-none"
                  fill="currentColor"
                />
              </button>
            )}
          </>
        ),
      },
    },
  ];

  const options = {
    searchOpen: true,
    filterType: "dropdown",
    searchPlaceholder: "Rechercher une ordonance",
    textLabels: {
      body: {
        noMatch: "Désolé, aucun ordonance n'est dans nos données",
      },
    },
    customToolbar: () =>
      can(["Super-Admin", "insert_ordonance"]) && (
        <Tooltip title="Nouveau ordonance">
          <IconButton
            onClick={() => {
              navigate(`/AddOrdonance`);
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      ),
    selectableRowsHideCheckboxes: true,
    onRowClick: (s: any, _m: any, e: any) => {
      if (
        e.target.querySelector(".btn-ordonance-edit") ||
        e.target.classList.contains("btn-ordonance-edit")
      ) {
        console.log(s);

        navigate(`/AddOrdonance?ordonanceID=${s[0]}&id=${s[1]}`);
      } else if (
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

                showSnackbar("La suppression du ordonance a réussi", "success");
              } else {
                showSnackbar("La suppression du ordonance a échoué", "error");
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
  };
  const dataPlaceHolder: [] = [];
  return (
    <Box className="relative">
      <MUIDataTable
        title={"Liste des ordonances"}
        data={dataPlaceHolder}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default OrdonanceTable;
