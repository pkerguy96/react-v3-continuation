//@ts-ignore
import MUIDataTable from "mui-datatables-mara";
import { Tooltip, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import getGlobal from "../hooks/getGlobal";
import { CACHE_KEY_UploadInfo } from "../constants";
import {
  ClusterData,
  DeleteUploadServiceClient,
} from "../services/UploadsService";
import LoadingSpinner from "./LoadingSpinner";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import ShowUploadsServiceApiClient from "../services/UploadsService";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import deleteItem from "../hooks/deleteItem";
import { confirmDialog } from "./ConfirmDialog";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import { useQueryClient } from "@tanstack/react-query";
import useUserRoles from "../zustand/UseRoles";

const Uploadstable = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbarStore();
  const { can } = useUserRoles();
  const navigate = useNavigate();
  const { data, isLoading } = getGlobal(
    {} as ClusterData,
    [CACHE_KEY_UploadInfo[0]],
    ShowUploadsServiceApiClient,
    undefined
  );

  if (isLoading) return <LoadingSpinner />;
  const download = (links: string) => {
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", "");
    document.body.appendChild(downloadLink);

    downloadLink.href = links;
    downloadLink.click();

    document.body.removeChild(downloadLink);
  };
  const transformedData = Object.entries(data).map(
    ([cluster, clusterData]: any) => ({
      id: cluster,
      nom: clusterData.patientName[0].nom,
      type: clusterData.type,
      date: clusterData.dates[0],
      size: `${clusterData.totalSize.toFixed(2)} Mb`,
      action: { mime: clusterData.mimeType[0], urls: clusterData.links },
    })
  );

  const columns = [
    {
      name: "id",
      label: "#",
      options: {
        filter: false,
        sort: false,
        display: "excluded",
      },
    },

    {
      name: "nom",
      label: "Nom du patient",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "type",
      label: "Type",
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
      name: "size",
      label: "Taille des fichiers",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "action",
      label: "Action",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (data: any) => {
          return (
            <>
              {data.mime === "application/dicom" ? (
                <button
                  className="btn-ordonance-see text-gray-950 hover:text-blue-700 cursor-pointer"
                  title="Voir"
                >
                  <VisibilityOutlinedIcon
                    className="pointer-events-none"
                    fill="currentColor"
                  />
                </button>
              ) : null}

              <button
                onClick={() => download(data.urls)}
                className="btn-ordonance-download text-gray-950 hover:text-blue-700 cursor-pointer"
                title="Télécharger"
              >
                <DownloadForOfflineOutlinedIcon
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
                />
              </button>
            </>
          );
        },
      },
    },
  ];
  const options = {
    filterType: "dropdown",
    selectableRowsHideCheckboxes: true,
    searchPlaceholder: "Rechercher un fichier",
    textLabels: {
      body: {
        noMatch: "Désolé, aucun fichier n'est dans nos données",
      },
    },
    customToolbar: () => (
      <Tooltip title="Nouveau fichier">
        <IconButton
          onClick={() => {
            navigate(`/Addfile`);
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    ),
    onRowClick: async (s: any, _m: any, e: any) => {
      if (
        e.target.querySelector(".btn-ordonance-see") ||
        e.target.classList.contains("btn-ordonance-see")
      ) {
        if (s[1] === "application/dicom") {
        }
        navigate(`/Dicom/${s[0]}`);
      } else if (
        e.target.querySelector(".btn-ordonance-delete") ||
        e.target.classList.contains("btn-ordonance-delete")
      ) {
        confirmDialog(
          "Voulez-vous vraiment supprimer ce fichier?",
          async () => {
            const response = await deleteItem(s[0], DeleteUploadServiceClient);
            if (response) {
              queryClient.invalidateQueries(CACHE_KEY_UploadInfo);
              showSnackbar("le fichier a été supprimé avec succès", "success");
            } else {
              showSnackbar("La suppression du fichier a échoué", "error");
            }
          }
        );
      } else if (
        e.target.querySelector(".btn-ordonance-download") ||
        e.target.classList.contains("btn-ordonance-download")
      ) {
        try {
        } catch (error) {
          console.log(error);
        }
      }
    },
  };

  return (
    <Box className="relative">
      <MUIDataTable
        title={"Gestion de fichiers"}
        data={transformedData}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default Uploadstable;
