import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import addGlobal from "../../hooks/addGlobal";
import {
  SettingsApiClient,
  SettingsData,
} from "../../services/SettingsService";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { AxiosError } from "axios";

const KpiSettings = () => {
  const { showSnackbar } = useSnackbarStore();
  const addmutation = addGlobal(
    {} as SettingsData,
    SettingsApiClient,
    undefined
  );
  const [selected, setSelected] = useState("");
  const selectRef = useRef(null);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelected(event.target.value as string);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selected == "") {
      alert("veuillez sélectionner une option");
    }
    const formData = {
      period: selected,
    };
    await addmutation.mutateAsync(formData, {
      onSuccess: () => {
        showSnackbar("La préférence a été modifiée", "success");
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

  return (
    <Box
      className="flex flex-col w-full h-full p-4 gap-4"
      component="form"
      onSubmit={handleSubmit}
    >
      <p className="font-light text-gray-600 text-md md:text-xl text-center">
        Sélectionnez la durée des métriques
      </p>
      <FormControl variant="standard" className="w-full h-full">
        <InputLabel id="demo-simple-select-standard-label">Période</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Period"
          value={selected}
          onChange={handleChange}
          ref={selectRef}
        >
          <MenuItem value={"year"}>Année</MenuItem>
          <MenuItem value={"month"}>Mois</MenuItem>
          <MenuItem value={"week"}>Semaine</MenuItem>
          <MenuItem value={"day"}>Jour</MenuItem>
        </Select>
      </FormControl>
      <Box className="flex mt-4">
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

export default KpiSettings;
