import useUserRoles from "../../zustand/UseRoles";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router";
import { CACHE_KEY_Bloodtest } from "../../constants";
import deleteItem from "../../hooks/deleteItem";

import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { confirmDialog } from "../ConfirmDialog";
import DataTable from "../DataTable";
import AddIcon from "@mui/icons-material/Add";
import getGlobalv2 from "../../hooks/getGlobalv2";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { bloodTestApiClient } from "../../services/BloodTest";
const BloodtestTable = () => {
  const { can } = useUserRoles();
  const { showSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const columns = [
    {
      name: "id",
      label: "#",
      options: { display: false },
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
      name: "blood_test",
      label: "Test sanguin",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "created_at",
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
        filter: false,
        sort: false,
        customBodyRender: () => {
          return (
            <>
              {can(["delete_blood", "doctor"]) && (
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
              )}
            </>
          );
        },
      },
    },
  ];

  const dataHook = (page: number, searchQuery: string, rowsPerPage: number) =>
    getGlobalv2(
      {},
      CACHE_KEY_Bloodtest,
      bloodTestApiClient,
      page,
      rowsPerPage,
      searchQuery,

      undefined
    );

  return (
    <>
      {can(["access_blood", "doctor", "insert_blood", "delete_blood"]) ? (
        <Box className="relative">
          <DataTable
            title="Liste des tests sanguins"
            noMatchMessage="Désolé, aucun test sanguin n'est dans nos données"
            columns={columns}
            dataHook={dataHook}
            options={{
              searchPlaceholder: "Rechercher un test sanguin",
              customToolbar: () => {
                return can(["insert_blood", "doctor"]) ? (
                  <Tooltip title="Nouveau ordonance">
                    <IconButton onClick={() => navigate(`/bloodtest/add`)}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                ) : null;
              },

              selectableRowsHideCheckboxes: true,
              onRowClick: (s: any, _m: any, e: any) => {
                if (
                  e.target.querySelector(".btn-ordonance-delete") ||
                  e.target.classList.contains("btn-ordonance-delete")
                ) {
                  // api
                  confirmDialog(
                    "Voulez-vous vraiment supprimer le test sanguin?",
                    async () => {
                      try {
                        const deletionSuccessful = await deleteItem(
                          s[0],
                          bloodTestApiClient
                        );
                        if (deletionSuccessful) {
                          queryClient.invalidateQueries(CACHE_KEY_Bloodtest);

                          showSnackbar(
                            "La suppression du test sanguin a réussi",
                            "success"
                          );
                        } else {
                          showSnackbar(
                            "La suppression du test sanguin a échoué",
                            "error"
                          );
                        }
                      } catch (error) {
                        showSnackbar(
                          `Une erreur s'est produite lors de la suppression du test sanguin:${error}`,
                          "error"
                        );
                      }
                    }
                  );
                } else {
                  navigate(`/bloodtestdetails/${s[0]}`);
                }
              },
            }}
          />
        </Box>
      ) : (
        <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
          Vous n'avez pas la permission de consulter cette page.
        </div>
      )}
    </>
  );
};

export default BloodtestTable;
