import {
  Box,
  FormControl,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {
  OperationPrefApiClient,
  OperationPreference,
} from "../../services/SettingsService";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CACHE_KEY_Hospitals, CACHE_KEY_OperationPref } from "../../constants";
import getGlobal from "../../hooks/getGlobal";
import { Hospital, hospitalApiClient } from "../../services/HospitalService";
import LoadingSpinner from "../LoadingSpinner";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import deleteItem from "../../hooks/deleteItem";
import addGlobal from "../../hooks/addGlobal";
import { AxiosError } from "axios";

const HospitalsSettings = () => {
  const { showSnackbar } = useSnackbarStore();
  const addMutation = addGlobal({} as Hospital, hospitalApiClient);
  const { data, refetch, isLoading } = getGlobal(
    {} as Hospital,
    CACHE_KEY_Hospitals,
    hospitalApiClient,
    undefined
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Hospital>({
    defaultValues: {
      name: "",
      address: "",
      contact_info: "",
    },
  });

  const onSubmit = async (data: Hospital) => {
    await addMutation.mutateAsync(data, {
      onSuccess: () => {
        showSnackbar("Clinique a été créé", "success");
        refetch();
      },
      onError: (error: any) => {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message
            : error.message;
        showSnackbar(message, "error");
      },
    });
  };
  const onDelete = async (key: number) => {
    const response = await deleteItem(key, hospitalApiClient);
    if (response) {
      refetch();
      showSnackbar("La suppression de clinique a réussi", "success");
    } else {
      showSnackbar("La suppression de clinique a échoué", "error");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box
      className="flex flex-col w-full h-full p-4 gap-4"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="font-light text-gray-600 text-md md:text-xl text-center">
        Ajouter une clinique
      </p>
      <p className=" text-start font-thin  text-sm md:text-lg">
        Entrez les détails de clinique.
      </p>
      <Box className=" flex flex-col md:flex-row gap-4 flex-wrap ">
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center ">
          <label htmlFor="name" className="w-full md:w-[160px]">
            Nom de clinique:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              defaultValue=""
              name="name"
              control={control}
              render={({ field }) => (
                <TextField {...field} id="name" label="hôpital" />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="address" className="w-full md:w-[160px]">
            Adresse:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="address"
                  type="text"
                  label="Adresse"
                />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Telephone:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              name="contact_info"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField {...field} id="contact_info" label="Telephone" />
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
                <strong>Nom de clinique</strong>
              </TableCell>
              <TableCell>
                <strong>Adresse</strong>
              </TableCell>
              <TableCell>
                <strong>Telephone</strong>
              </TableCell>
              <TableCell className="w-20" />
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((clinic: Hospital, index: number) => (
              <TableRow key={index}>
                <TableCell>{clinic.name}</TableCell>
                <TableCell>{clinic.address}</TableCell>
                <TableCell>{clinic.contact_info}</TableCell>
                <TableCell className="w-20">
                  <Button
                    onClick={() => onDelete(clinic.id!)}
                    className="w-max mx-auto"
                    variant="outlined"
                    color="error"
                    disabled={clinic.id === undefined}
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

export default HospitalsSettings;
