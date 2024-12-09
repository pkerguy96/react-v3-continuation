import React, { useState } from "react";
import {
  Paper,
  Box,
  Divider,
  FormControl,
  TextField,
  Button,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {
  AddOutsourceOperationForm,
  useSearchHospitals,
  useSearchPatients,
} from "../../services/OutsourceOperationService";
import addGlobal from "../../hooks/addGlobal";
import { hospitalOperationApiClient } from "../../services/HospitalService";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

interface TransformedOutsourceOperation {
  operation_id: any; // Nullable
  hospital_id?: number;
  patient_id?: number;
  operation_type: string;
  description: string;
  operation_date: string;
  total_price: number;
  amount_paid: number;
  fee: number;
  patient?: { id: number; name: string } | null; // Selected patient
  hospital?: { id: number; name: string } | null;
}
const AddOutsourceOperation = () => {
  const [patientSearch, setPatientSearch] = useState("");
  const [hospitalSearch, setHospitalSearch] = useState("");
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbarStore();
  const navigate = useNavigate();

  const defaultValues: AddOutsourceOperationForm = {
    patient: null,
    hospital: null,
    operation_type: "",
    description: "",
    operation_date: new Date().toISOString().split("T")[0], // Default to today
    total_price: 0,
    amount_paid: 0,
    fee: 0,
  };
  const addmutation = addGlobal(
    {} as AddOutsourceOperationForm,
    hospitalOperationApiClient
  );
  const {
    control,
    handleSubmit,
    setValue,
    reset, // Allows resetting the form with new default values
    formState: { errors },
  } = useForm<AddOutsourceOperationForm>({
    defaultValues, // Set default values here
  });

  const {
    data: patientData,
    fetchNextPage: fetchNextPatients,
    hasNextPage: hasNextPatientPage,
    isFetchingNextPage: isFetchingNextPatientPage,
  } = useSearchPatients(patientSearch);
  const {
    data: hospitalData,
    fetchNextPage: fetchNextHospitals,
    hasNextPage: hasNextHospitalPage,
    isFetchingNextPage: isFetchingNextHospitalPage,
  } = useSearchHospitals(hospitalSearch);

  const patients = patientData?.pages.flatMap((page) => page.data) || [];
  const hospitals = hospitalData?.pages.flatMap((page) => page.data) || [];

  const onSubmit = async (data: AddOutsourceOperationForm) => {
    const transformedData: TransformedOutsourceOperation = {
      operation_id: null, // Default value for operation_id
      hospital_id: data.hospital?.id || 0, // Extract the hospital ID or use a fallback
      patient_id: data.patient?.id || 0, // Extract the patient ID or use a fallback
      operation_type: data.operation_type,
      description: data.description,
      operation_date: data.operation_date,
      total_price: Number(data.total_price),
      amount_paid: Number(data.amount_paid),
      fee: Number(data.fee),
    };

    try {
      await addmutation.mutateAsync(transformedData, {
        onSuccess: () => {
          showSnackbar("Opération créée avec succès", "success");
          queryClient.invalidateQueries(["CACHE_KEY_Hospitaloperations"]);
          navigate("/External");
        },
        onError: (Error: any) => {
          console.log(Error.response.data.message);

          showSnackbar(Error.response.data.message, "error");
        },
      });
    } catch (error) {}
  };

  return (
    <Paper className="p-4">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <Box className="flex justify-center text-lg text-gray-400 uppercase">
          <span>Ajouter une opération</span>
        </Box>
        <Divider
          orientation="horizontal"
          flexItem
          className="gap-2 mb-4"
          variant="middle"
        />

        <Box className="w-full flex flex-col gap-4">
          {/* Patient Search */}
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="patient" className="w-full md:w-[160px]">
              Patient
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="patient"
                control={control}
                rules={{ required: "Veuillez sélectionner un patient." }}
                render={({ field }) => (
                  <Autocomplete
                    options={patients}
                    getOptionLabel={(option) => option.name || ""}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    loading={isFetchingNextPatientPage}
                    onInputChange={(e, value) => setPatientSearch(value)}
                    onChange={(e, value) => field.onChange(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Rechercher un patient"
                        error={!!errors.patient}
                        helperText={errors.patient?.message}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {isFetchingNextPatientPage ? (
                                <CircularProgress size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                )}
              />
            </FormControl>
          </Box>

          {/* Hospital Search */}
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="hospital" className="w-full md:w-[160px]">
              Clinique
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="hospital"
                control={control}
                rules={{ required: "Veuillez sélectionner un clinique." }}
                render={({ field }) => (
                  <Autocomplete
                    options={hospitals}
                    getOptionLabel={(option) => option.name || ""}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    loading={isFetchingNextHospitalPage}
                    onInputChange={(e, value) => setHospitalSearch(value)}
                    onChange={(e, value) => field.onChange(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Rechercher un clinique"
                        error={!!errors.hospital}
                        helperText={errors.hospital?.message}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {isFetchingNextHospitalPage ? (
                                <CircularProgress size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                )}
              />
            </FormControl>
          </Box>

          {/* Operation Type */}
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="operation_type" className="w-full md:w-[160px]">
              Type d'opération
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="operation_type"
                control={control}
                rules={{ required: "Veuillez entrer le type d'opération." }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="operation_type"
                    label="Type d'opération"
                    error={!!errors.operation_type}
                    helperText={errors.operation_type?.message}
                  />
                )}
              />
            </FormControl>
          </Box>

          {/* Description */}
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="description" className="w-full md:w-[160px]">
              Description
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="description"
                control={control}
                rules={{ required: "Veuillez entrer une description." }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="description"
                    label="Description"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </FormControl>
          </Box>

          {/* Date */}
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="date" className="w-full md:w-[160px]">
              Date
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="operation_date"
                control={control}
                rules={{ required: "Veuillez sélectionner une date." }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="operation_date"
                    type="date"
                    error={!!errors.operation_date}
                    helperText={errors.operation_date?.message}
                  />
                )}
              />
            </FormControl>
          </Box>

          {/* total_price */}
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="total_price" className="w-full md:w-[160px]">
              Prix ​​total
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="total_price"
                control={control}
                rules={{ required: "Veuillez entrer le prix." }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="total_price"
                    label="Prix"
                    type="number"
                    error={!!errors.total_price}
                    helperText={errors.total_price?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="total_price" className="w-full md:w-[160px]">
              Les honoraires
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="fee"
                control={control}
                rules={{ required: "Veuillez entrer le prix." }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="fee"
                    label="honoraires"
                    type="number"
                    error={!!errors.fee}
                    helperText={errors.fee?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="amount_paid" className="w-full md:w-[160px]">
              Montant payé
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="amount_paid"
                control={control}
                rules={{ required: "Veuillez entrer le prix." }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="amount_paid"
                    label="Prix"
                    type="number"
                    error={!!errors.amount_paid}
                    helperText={errors.amount_paid?.message}
                  />
                )}
              />
            </FormControl>
          </Box>

          {/* Submit Button */}
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

export default AddOutsourceOperation;
