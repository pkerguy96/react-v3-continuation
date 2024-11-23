import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddPatientMutation } from "../hooks/addPatient";
import { calculateAge } from "../utils/dateUtils";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import updatePatient from "../hooks/updatePatient";
import {
  Allergies,
  CACHE_KEY_PATIENTS,
  Maladies,
  referral,
} from "../constants";
import patientAPIClient, { OnlyPatientData } from "../services/PatientService";
import { AxiosError } from "axios";
import getGlobalById from "../hooks/getGlobalById";
import { useQueryClient } from "@tanstack/react-query";

export interface Patient {
  id?: number;
  nom: string;
  prenom: string;
  cin?: string;
  date: string;
  sex: string;
  address: string;
  phoneNumber?: string;
  mutuelle: string;
  note?: string;
  appointments?: {
    title: string;
    date: string;
    note?: string;
  };
  agecalc?: string;
  allergy?: string[];
  disease?: string[];
  referral?: string[];
}
const AddPatient = () => {
  const queryClient = useQueryClient();
  const [age, setAge] = useState(0);
  const { id } = useParams();
  const { showSnackbar } = useSnackbarStore();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm<OnlyPatientData>({
    defaultValues: {
      nom: "",
      prenom: "",
      cin: "",
      date: "",
      sex: "",
      address: "",
      phoneNumber: "",
      mutuelle: "",
      agecalc: "",
      note: "",
      allergy: [],
      disease: [],
      referral: [],
    },
  });
  let PatientData: OnlyPatientData | undefined;

  if (id) {
    const queryResult = getGlobalById(
      {} as OnlyPatientData,
      [CACHE_KEY_PATIENTS[0], id],
      patientAPIClient,
      undefined,
      parseInt(id)
    );

    PatientData = queryResult.data;
  }
  const isAddMode = !id;

  useEffect(() => {
    if (!isAddMode) {
      Object.keys(PatientData ?? {}).forEach((key) =>
        setValue(key as keyof OnlyPatientData, PatientData[key] ?? "")
      );
      if (PatientData?.date) {
        setAge(calculateAge(PatientData.date));
      }
    }
  }, [PatientData, id]);

  // Specify Patient as the generic type for useForm
  const addPatientMutation = useAddPatientMutation(() => {});
  const updatePatientMutation = updatePatient(() => {});
  const onSubmit: SubmitHandler<OnlyPatientData> = async (data) => {
    try {
      try {
        if (isAddMode) {
          await createUser(data);
        } else {
          await updateUser(data);
        }
        queryClient.invalidateQueries(CACHE_KEY_PATIENTS, { exact: false });
        navigate("/Patients");
      } catch (error: any) {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message
            : error.message;
        showSnackbar(message, "error");
      }
    } catch (error: any) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;
      showSnackbar(message, "error");
    }
  };
  const updateUser = async (data: Patient) => {
    await updatePatientMutation.mutateAsync(
      { data, id },
      {
        onSuccess: () => {
          showSnackbar("Patient modifié avec succès.", "success");
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
  const createUser = async (formData: Patient) => {
    await addPatientMutation.mutateAsync(formData, {
      onSuccess: () => {
        showSnackbar("Patient ajouté avec succès.", "success");
      },
      onError: (error: any) => {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message
            : error.message;
        showSnackbar(message, "warning");
      },
    });
  };
  // Watch the 'date' field and calculate age whenever it changes
  register("date", {
    onChange: (e) => {
      setAge(calculateAge(e.target.value));
    },
  });

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
          <span>Ajouter un patient</span>
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
                rules={{ required: "Le champ Nom est requis." }}
                defaultValue={PatientData ? PatientData.nom : ""}
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
                rules={{ required: "Le champ Prenom est requis." }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-required"
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
              <label htmlFor="date" className="w-full md:w-[160px]">
                Date de naissance:
              </label>
              <FormControl className="w-full md:flex-1">
                <Controller
                  name="date"
                  control={control}
                  rules={{
                    required: "Le champ Date est requis.",
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
                      id="outlined-required"
                      error={!!errors.date}
                      helperText={errors.date?.message}
                    />
                  )}
                />
              </FormControl>
            </Box>
            <Box className="w-full md:w-[300px] flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
              <label htmlFor="agecalc" className="w-full md:w-[160px]">
                age calcule:
              </label>
              <FormControl className="w-full md:flex-1">
                <Controller
                  name="agecalc"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-required"
                      disabled
                      value={age}
                    />
                  )}
                />
              </FormControl>
            </Box>
          </Box>

          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="cin" className="w-full md:w-[160px]">
              Cin:
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="cin"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-required"
                    label="Cin"
                    error={!!errors.cin}
                    helperText={errors.cin?.message}
                  />
                )}
              />
            </FormControl>
          </Box>

          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="sex" className="w-full md:w-[160px]">
              Sex:
            </label>
            <FormControl className="w-full md:flex-1">
              <InputLabel id="demo-select-small-label">Sex</InputLabel>
              <Controller
                name="sex"
                control={control}
                rules={{ required: "Le champ Sex est requis." }} // Add any validation rules as needed
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
            <label htmlFor="address" className="w-full md:w-[160px]">
              Adresse:
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="address"
                control={control}
                rules={{ required: "Le champ Address est requis." }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-required"
                    label="Adresse"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="phoneNumber" className="w-full md:w-[160px]">
              Telephone:
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="phoneNumber"
                control={control}
                rules={{ required: "Le champ Telephone est requis." }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-required"
                    label="Phone Number"
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="mutuelle" className="w-full md:w-[160px]">
              Mutuelle:
            </label>
            <FormControl className="w-full md:flex-1">
              <InputLabel id="demo-select-small-label">Mutuelle</InputLabel>
              <Controller
                name="mutuelle"
                control={control}
                rules={{ required: "Le champ Mutuelle est requis." }} // Add any validation rules as needed
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="mutuelle"
                    error={!!errors.mutuelle}
                  >
                    <MenuItem value="none">
                      <em>Aucune</em>
                    </MenuItem>
                    <MenuItem value="Mamdat">Mamdat</MenuItem>
                    <MenuItem value="CNIA SAADA">CNIA SAADA</MenuItem>
                    <MenuItem value="CNOPS">CNOPS</MenuItem>
                    <MenuItem value="GENERAL">GENERAL</MenuItem>
                    <MenuItem value="CNSS">CNSS</MenuItem>
                    <MenuItem value="MFAR">MFAR</MenuItem>
                    <MenuItem value="WATANIA">WATANIA</MenuItem>
                    <MenuItem value="ZURICH">ZURICH</MenuItem>
                    <MenuItem value="ATLANTA">ATLANTA</MenuItem>
                    <MenuItem value="AXA">AXA</MenuItem>
                    <MenuItem value="WAFA ASURANCE">WAFA ASURANCE</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Box>

          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="note" className="w-full md:w-[160px]">
              allergies:
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="allergy"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    className="bg-white"
                    multiple
                    id="tags-filled"
                    options={Allergies.map((option) => option.title)}
                    defaultValue={[]}
                    value={field.value || []}
                    onChange={(event, newValue) => field.onChange(newValue)}
                    freeSolo
                    renderTags={(value: readonly string[], getTagProps) =>
                      value.map((option: string, index: number) => {
                        const { key, ...tagProps } = getTagProps({ index });
                        return (
                          <Chip
                            variant="outlined"
                            label={option}
                            key={key}
                            {...tagProps}
                          />
                        );
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="allergies"
                        sx={autocompleteStyles}
                      />
                    )}
                  />
                )}
              />
            </FormControl>{" "}
          </Box>
          <Box>
            <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
              <label htmlFor="note" className="w-full md:w-[160px]">
                Maladies:
              </label>
              <FormControl className="w-full md:flex-1">
                <Controller
                  name="disease"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      className="bg-white"
                      multiple
                      id="tags-filled"
                      options={Maladies.map((option) => option.title)}
                      defaultValue={[]}
                      value={field.value || []}
                      onChange={(event, newValue) => field.onChange(newValue)}
                      freeSolo
                      renderTags={(value: readonly string[], getTagProps) =>
                        value.map((option: string, index: number) => {
                          const { key, ...tagProps } = getTagProps({ index });
                          return (
                            <Chip
                              variant="outlined"
                              label={option}
                              key={key}
                              {...tagProps}
                            />
                          );
                        })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="maladies"
                          sx={autocompleteStyles}
                        />
                      )}
                    />
                  )}
                />
              </FormControl>
            </Box>
          </Box>
          <Box>
            <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
              <label htmlFor="note" className="w-full md:w-[160px]">
                Source de provenance:
              </label>
              <FormControl className="w-full md:flex-1">
                <Controller
                  name="referral"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      className="bg-white"
                      multiple
                      id="tags-filled"
                      options={referral.map((option) => option.title)}
                      defaultValue={[]}
                      value={field.value || []}
                      onChange={(event, newValue) => field.onChange(newValue)}
                      freeSolo
                      renderTags={(value: readonly string[], getTagProps) =>
                        value.map((option: string, index: number) => {
                          const { key, ...tagProps } = getTagProps({ index });
                          return (
                            <Chip
                              variant="outlined"
                              label={option}
                              key={key}
                              {...tagProps}
                            />
                          );
                        })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Provenance"
                          sx={autocompleteStyles}
                        />
                      )}
                    />
                  )}
                />
              </FormControl>
            </Box>
          </Box>

          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="note" className="w-full md:w-[160px]">
              Note:
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

const autocompleteStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.23)",
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.23)", // Ensures the border is visible when not focused
    },
    "&:hover fieldset": {
      borderColor: "dark", // Darker border on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "primary.main", // Border color on focus
    },
  },
};
export default AddPatient;
