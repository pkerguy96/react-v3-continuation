import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import addGlobal from "../../hooks/addGlobal";
import { Supplier, SupplierApiClient } from "../../services/SupplierService";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { useLocation, useNavigate } from "react-router";
import getGlobalById from "../../hooks/getGlobalById";
import { CACHE_KEY_Suppliers } from "../../constants";
import updateItem from "../../hooks/updateItem";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
interface SupplierFormValues {
  address?: string;
  phone?: string;
  email?: string;
  contact_person?: string;
  company_name?: string;
  supply_type?: string;
  tax_id?: string;
  status?: "active" | "inactive";
  note?: string;
}

interface UpdateData {
  data: SupplierFormValues;
  supplierId: string | undefined;
}
const AddSupplier = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const supplierId = params.get("supplierId");
  const addMutation = addGlobal({} as SupplierFormValues, SupplierApiClient);
  const { showSnackbar } = useSnackbarStore();

  const updateMutation = updateItem({}, SupplierApiClient);

  let SupplierData: Supplier | undefined;
  if (supplierId) {
    const queryResult = getGlobalById(
      {} as Supplier,
      [CACHE_KEY_Suppliers[0], supplierId],
      SupplierApiClient,
      undefined,
      parseInt(supplierId)
    );

    SupplierData = queryResult.data;
  }
  const isAddMode = !SupplierData;
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<SupplierFormValues>({
    defaultValues: {
      address: "",
      phone: "",
      email: "",
      contact_person: "",
      company_name: "",
      supply_type: "",
      tax_id: "",
      status: "active",
      note: "",
    },
  });
  const onSubmit = async (data: SupplierFormValues) => {
    try {
      if (!supplierId) {
        await addMutation.mutateAsync(data, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: CACHE_KEY_Suppliers,
              exact: false,
            });
            navigate("/Supplier");
            showSnackbar("Fournisseur ajouté avec succès", "success");
          },
          onError: () => {
            showSnackbar("Le fournisseur n'a pas pu être créé", "error");
          },
        });
      } else {
        await updateUser({ data, supplierId });
      }
    } catch (error) {}
  };

  const updateUser = async (updateData: UpdateData) => {
    const { data, supplierId } = updateData;
    if (!supplierId) {
      showSnackbar("L'identifiant du fournisseur est manquant.", "error");
      return;
    }

    await updateMutation.mutateAsync(
      { data, id: parseInt(supplierId) }, // Ensure ID is included in the API call
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: CACHE_KEY_Suppliers,
            exact: false,
          });
          navigate("/Supplier");
          showSnackbar("Fournisseur modifié avec succès.", "success");
        },
        onError: (error: any) => {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message
              : error.message;
          showSnackbar(message, "warning");
        },
      }
    );
  };

  useEffect(() => {
    if (!isAddMode) {
      Object.keys(SupplierData ?? {}).forEach((key) =>
        setValue(key as keyof Supplier, SupplierData[key] ?? "")
      );
    }
  }, [supplierId, SupplierData]);
  return (
    <Paper className="p-4">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <Box className="flex justify-center  text-lg  text-gray-400 uppercase">
          <span>Ajouter un fournisseur</span>
        </Box>
        <Divider
          orientation="horizontal"
          flexItem
          className="gap-2 mb-4"
          variant="middle"
        />

        <Box className="w-full flex flex-col gap-4">
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Nom de l'entreprise
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="company_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="company_name"
                    label="Nom de l'entreprise"
                    error={!!errors.company_name}
                    helperText={errors.company_name?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Personne de contact
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="contact_person"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="contact_person"
                    label="Personne de contact"
                    error={!!errors.contact_person}
                    helperText={errors.contact_person?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Adresse
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="address"
                    label="Adresse"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Téléphone
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="tel"
                    {...field}
                    id="phone"
                    label="Téléphone"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              E-mail
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="email"
                    label="E-mail"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </FormControl>
          </Box>

          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Type de fourniture
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="supply_type"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="supply_type"
                    label="Type de fourniture"
                    error={!!errors.supply_type}
                    helperText={errors.supply_type?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Ice
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="tax_id"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="tax_id"
                    label="Ice"
                    error={!!errors.tax_id}
                    helperText={errors.tax_id?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="status" className="w-full md:w-[160px]">
              Statut
            </label>
            <FormControl className="w-full md:flex-1">
              <InputLabel id="status-label">Statut</InputLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="status"
                    labelId="status-label"
                    label="Statut"
                    error={!!errors.status}
                  >
                    <MenuItem value="active">Actif</MenuItem>
                    <MenuItem value="inactive">Inactif</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Note
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-required"
                    multiline
                    rows={3}
                    label="Note"
                    error={!!errors.note}
                    helperText={errors.note?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="flex mt-4">
            <Button
              type="submit"
              variant="contained"
              className="w-full md:w-max !px-10 !py-3 rounded-lg !ms-auto"
            >
              Enregistrer
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default AddSupplier;
