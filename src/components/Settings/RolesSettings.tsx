//@ts-nocheck
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useCallback, useRef } from "react";
import addGlobal from "../../hooks/addGlobal";
import {
  CreateRole,
  CreateRoleApiClient,
  DeleteRoleApiClient,
  UserRoleData,
  getUsersWithRolesClient,
} from "../../services/RolesService";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { AxiosError } from "axios";
import getGlobal from "../../hooks/getGlobal";
import { CACHE_KEY_UsersRolePermission } from "../../constants";
import LoadingSpinner from "../LoadingSpinner";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import deleteItem from "../../hooks/deleteItem";
const RolesSettings = () => {
  const useref = useRef<HTMLInputElement>(null);
  const Addmutation = addGlobal({} as CreateRole, CreateRoleApiClient);
  const { data, isLoading, refetch } = getGlobal(
    {} as UserRoleData,
    CACHE_KEY_UsersRolePermission,
    getUsersWithRolesClient,
    undefined
  );
  const { showSnackbar } = useSnackbarStore();

  const onSubmit = async () => {
    const value = useref?.current?.value;

    if (value) {
      await Addmutation.mutateAsync(
        { rolename: value },
        {
          onSuccess(data: any) {
            showSnackbar(data?.message, "success");
            refetch();
          },
          onError(error: any) {
            const message =
              error instanceof AxiosError
                ? error.response?.data?.message
                : error.message;
            showSnackbar(message, "error");
          },
        }
      );
    } else {
      showSnackbar("fill the form first", "error");
    }
  };
  const deleteRole = useCallback(async ($id: number) => {
    const roledelte = await deleteItem($id, DeleteRoleApiClient);
    if (roledelte) {
      showSnackbar("Le rôle a été supprimé.", "info");
      refetch();
    } else {
      showSnackbar(
        "Oups, quelque chose s'est mal passé.",

        "error"
      );
    }
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box className="flex flex-col w-full h-full p-4 gap-4" component="form">
      <p className="font-light text-gray-600 text-md md:text-xl text-center">
        Gestion des Rôles
      </p>

      <Box className=" flex flex-col md:flex-row gap-4 flex-wrap ">
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center ">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Rôle:
          </label>
          <Box className="w-full md:flex-1">
            <TextField
              inputRef={useref}
              name="rolename"
              fullWidth
              id="outlined-basic"
              label="Role"
              variant="outlined"
            />
          </Box>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => onSubmit()}
          >
            <AddCircleOutlinedIcon
              fontSize="inherit"
              className="text-blue-500"
            />
          </IconButton>
        </Box>
      </Box>
      <TableContainer className="w-full max-h-[400px] flex-wrap overflow-auto border border-gray-300">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="bg-gray-300 !rounded-2xl	sticky top-0 z-10">
              <TableCell>
                <strong>Nom du rôle</strong>
              </TableCell>
              <TableCell>
                <strong>infirmière ayant ce rôle</strong>
              </TableCell>
              <TableCell>
                <strong>Date de création</strong>
              </TableCell>
              <TableCell className="w-20" />
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((role: UserRoleData, index: number) => (
              <TableRow key={index}>
                <TableCell>{role.rolename}</TableCell>
                <TableCell>
                  {role.patients.map((patient, patientIndex) => (
                    <span key={patientIndex}>
                      {patient.nom}
                      {patientIndex !== role.patients.length - 1 && ", "}
                    </span>
                  ))}
                </TableCell>
                <TableCell>{role.created_at}</TableCell>
                <TableCell className="w-20">
                  <Button
                    onClick={() => deleteRole(role.id!)}
                    className="w-max mx-auto"
                    variant="outlined"
                    color="error"
                    disabled={role.id === undefined}
                  >
                    <DeleteOutlinedIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className=" mt-4 hidden">
        <Button
          size="small"
          type="submit"
          variant="contained"
          className="w-full md:w-max !px-10 !py-3 rounded-lg !ms-auto"
        >
          Enregistrer
        </Button>
      </Box>
    </Box>
  );
};

export default RolesSettings;
