import {
  Paper,
  Box,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAddNurseMutation } from "../hooks/addNurse";

import { calculateAge } from "../utils/dateUtils";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import { AxiosError } from "axios";
export interface Nurse {
  nom: string;
  recruitment_date: string;
  termination_date: string;
  prenom: string;
  cin?: string;
  date: string;
  sex: string;
  address: string;
  phone_number?: string;
  email: string;
  password: string;
  agecalc?: string;
  checkbox: boolean;
}
const AddNurseForm = () => {
  const { showSnackbar } = useSnackbarStore();

  const [age, setAge] = useState(0);
  const navigate = useNavigate();
  const customErrorMessages = {
    nom: {
      required: "Le champ Nom est requis.", // Customize the required error message for "nom" field
    },
    prenom: {
      required: "Le champ Prenom est requis.", // Customize the required error message for "nom" field
    },
    cin: {
      required: "Le champ Cin est requis.", // Customize the required error message for "nom" field
    },
    date: {
      required: "Le champ Date est requis.", // Customize the required error message for "nom" field
    },
    recruitment_date: {
      required: "Le champ Date est requis.", // Customize the required error message for "nom" field
    },
    termination_date: {
      required: "Le champ Date est requis.", // Customize the required error message for "nom" field
    },
    sex: {
      required: "Le champ Sex est requis.", // Customize the required error message for "nom" field
    },
    address: {
      required: "Le champ Address est requis.", // Customize the required error message for "nom" field
    },
    phone_number: {
      required: "Le champ Telephone est requis.", // Customize the required error message for "nom" field
    },
    email: {
      required: "Le champ Email est requis.", // Customize the required error message for "nom" field
    },
    password: {
      required: "Le champ Mot de pass est requis.", // Customize the required error message for "nom" field
    },
  };
  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<Nurse>({
    defaultValues: {
      nom: "",
      prenom: "",
      cin: "",
      date: "",
      sex: "",
      address: "",
      phone_number: "",
      email: "",
      password: "",
      agecalc: "",
      checkbox: false,
      recruitment_date: "",
      termination_date: "",
    },
  });
  const addPatientMutation = useAddNurseMutation(() => {
    reset({
      nom: "",
      prenom: "",
      cin: "",
      date: "",
      sex: "",
      address: "",
      phone_number: "",
      email: "",
      password: "",
      agecalc: "",
    });
  });
  const onSubmit: SubmitHandler<Nurse> = async (data) => {
    if (!data.checkbox && data.termination_date < data.recruitment_date) {
      showSnackbar("Date de résiliation est avant la date d'embauche", "error");
    }
    const { agecalc, ...newData } = data;
    try {
      await addPatientMutation.mutateAsync(newData, {
        onSuccess: () => {
          showSnackbar("Infirmière ajoutée avec succès.", "success");
          navigate("/Nurses");
        },
        onError: (Error: any) => {
          console.log(Error);

          showSnackbar("Something went wrong.", "error");
        },
      });
    } catch (error: any) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;
      showSnackbar(message, "error");
    }
  };

  // Watch the 'date' field and calculate age whenever it changes
  register("date", {
    onChange: (e) => {
      const age = calculateAge(e.target.value);
      setAge(age); // Set the 'age' field in the form with the calculated age
    },
  });
  //TODO: WIERD BUG HERE GET AN ALERT FOR
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
          <span>Ajouter une infirmière</span>
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
              Nom:
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="nom"
                control={control}
                rules={{ required: customErrorMessages.nom.required }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="nom"
                    label="Nom"
                    error={!!errors.nom} // Add error prop based on whether the field has an error
                    helperText={errors.nom?.message} // Display the error message for the field
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Prenom:
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="prenom"
                control={control}
                rules={{ required: customErrorMessages.prenom.required }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="prenom"
                    label="Prenom"
                    error={!!errors.prenom}
                    helperText={errors.prenom?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <Box className="w-full md:flex-1 flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
              <label htmlFor="nom" className="w-full md:w-[160px]">
                Date de naissance:
              </label>
              <FormControl className="w-full md:flex-1">
                <Controller
                  name="date"
                  control={control}
                  rules={{
                    required: customErrorMessages.date.required,
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const currentDate = new Date();
                      return (
                        selectedDate <= currentDate ||
                        "La date ne peut pas être dans le futur."
                      );
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      type="date"
                      {...field}
                      id="date"
                      error={!!errors.date}
                      helperText={errors.date?.message}
                    />
                  )}
                />
              </FormControl>
            </Box>
            <Box className="w-full md:w-[300px] flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
              <label htmlFor="nom" className="w-full md:w-[160px]">
                age calcule:
              </label>
              <FormControl className="w-full md:flex-1">
                <Controller
                  name="agecalc"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} id="agecalc" disabled value={age} />
                  )}
                />
              </FormControl>
            </Box>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Cin:
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="cin"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="cin"
                    label="Cin"
                    error={!!errors.cin}
                    helperText={errors.cin?.message}
                  />
                )}
              />
            </FormControl>
          </Box>

          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Sex:
            </label>
            <FormControl className="w-full md:flex-1" size="small">
              <InputLabel id="demo-select-small-label">Sex</InputLabel>
              <Controller
                name="sex"
                control={control}
                rules={{ required: customErrorMessages.sex.required }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="sex"
                    error={!!errors.sex}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Adresse:
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="address"
                control={control}
                rules={{ required: customErrorMessages.address.required }}
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
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="phone_number" className="w-full md:w-[160px]">
              Telephone:
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="phone_number"
                control={control}
                rules={{ required: customErrorMessages.phone_number.required }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="phone_number"
                    label="Phone Number"
                    error={!!errors.phone_number}
                    helperText={errors.phone_number?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full md:flex-1 flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="recruitment_date" className="w-full md:w-[160px]">
              Date d'embauche:
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="recruitment_date"
                control={control}
                rules={{
                  required: customErrorMessages.recruitment_date.required,
                }}
                render={({ field }) => (
                  <TextField
                    type="date"
                    {...field}
                    id="recruitment_date"
                    error={!!errors.recruitment_date}
                    helperText={errors.recruitment_date?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <Box className="w-full md:flex-1 flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
              <label htmlFor="termination_date" className="w-full md:w-[160px]">
                Date de résiliation:
              </label>
              <FormControl className="w-full md:flex-1">
                <Controller
                  name="termination_date"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="date"
                      {...field}
                      id="termination_date"
                      disabled={watch("checkbox")}
                      error={!!errors.termination_date}
                      helperText={errors.termination_date?.message}
                    />
                  )}
                />
              </FormControl>
            </Box>
            <Box className="w-full md:w-[300px] flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
              <FormControlLabel
                control={
                  <Controller
                    name="checkbox"
                    control={control}
                    render={({ field }) => <Checkbox {...field} />}
                  />
                }
                label="Non spécifié"
              />
            </Box>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="Email" className="w-full md:w-[160px]">
              Email:
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="email"
                control={control}
                rules={{ required: customErrorMessages.email.required }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="email"
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="password" className="w-full md:w-[160px]">
              Mot de pass:
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="password"
                control={control}
                rules={{ required: customErrorMessages.password.required }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    id="password"
                    label=" Mot de pass"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </FormControl>
          </Box>

          <Box className="flex mt-4">
            <Button
              type="submit"
              variant="contained"
              className="w-full md:w-max !px-10 !py-3 rounded-lg !mx-auto"
            >
              Enregistrer
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default AddNurseForm;
