//@ts-nocheck

import {
  Box,
  Button,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AddoperationPreference } from "../../hooks/AddoperationPreference";
import {
  DeleteOperationsPrefApiClient,
  OperationPreference,
} from "../../services/SettingsService";

import deleteItem from "../../hooks/deleteItem";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { useGlobalOperationPreference } from "../../hooks/getOperationPrefs";
import LoadingSpinner from "../LoadingSpinner";
import { AxiosError } from "axios";
const OperationsListSettings = () => {
  const { showSnackbar } = useSnackbarStore();
  /*  const { data, refetch, isLoading } = useGlobalOperationPreference(); */
  const { control, handleSubmit, reset } = useForm<OperationPreference>();
  const addOperationMutation = AddoperationPreference(() => {
    reset({
      name: "",
      price: 0.0,
      code: "",
    });
  });
  const onSubmit = async (data: OperationPreference) => {
    await addOperationMutation.mutateAsync(
      {
        name: data.name,
        price: data.price,
        operation_type: data.code,
      },
      {
        onSuccess: () => {
          showSnackbar("L'Opération a été créé", "success");
        },
        onError: (error: any) => {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message
              : error.message;
          showSnackbar(message, "error");
        },
      }
    );
  };
  const onDelete = async (key: number) => {
    const response = await deleteItem(key, DeleteOperationsPrefApiClient);
    if (response) {
      refetch();
      showSnackbar("La suppression d'Opération a réussi", "success");
    } else {
      showSnackbar("La suppression d'Opération a échoué", "error");
    }
  };
  /*   if (isLoading) return <LoadingSpinner />; */
  const data = [];
  return (
    <Box
      className="flex flex-col w-full h-full p-4 gap-4"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="font-light text-gray-600 text-md md:text-xl text-center">
        Ajouter une opération
      </p>
      <p className=" text-start font-thin  text-sm md:text-lg">
        Entrez les détails de l'opération.
      </p>
      <Box className=" flex flex-col md:flex-row gap-4 flex-wrap ">
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center ">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Opération:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              defaultValue=""
              name="name"
              control={control}
              render={({ field }) => (
                <TextField {...field} id="name" label="Opération" />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Prix:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              //@ts-ignore
              defaultValue={0.0}
              name="price"
              control={control}
              render={({ field }) => (
                <TextField {...field} id="price" type="number" label="Prix" />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Code:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              name="code"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField {...field} id="code" label="Code" />
              )}
            />
          </FormControl>
        </Box>
        <Box className="flex ml-auto mt-4">
          <Button
            type="submit"
            variant="contained"
            className="w-full md:w-max !px-8 !py-2 rounded-lg "
          >
            Ajouter
          </Button>
        </Box>
      </Box>
      <TableContainer className="w-full max-h-[400px] flex-wrap overflow-auto border border-gray-300">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="bg-gray-300 !rounded-2xl	sticky top-0 z-10">
              <TableCell>
                <strong>Nom de l'opération</strong>
              </TableCell>
              <TableCell>
                <strong>Code</strong>
              </TableCell>
              <TableCell>
                <strong>Prix</strong>
              </TableCell>
              <TableCell className="w-20" />
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((operation: OperationPreference, index: number) => (
              <TableRow key={index}>
                <TableCell>{operation.name}</TableCell>
                <TableCell>{operation.operation_type}</TableCell>
                <TableCell>{operation.price}</TableCell>
                <TableCell className="w-20">
                  <Button
                    onClick={() => onDelete(operation.id!)}
                    className="w-max mx-auto"
                    variant="outlined"
                    color="error"
                    disabled={operation.id === undefined}
                  >
                    <DeleteOutlineIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OperationsListSettings;
