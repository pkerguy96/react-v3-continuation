import {
  Paper,
  Box,
  Typography,
  FormControl,
  Autocomplete,
  Chip,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { BodySides, BoneDoctorBloodTests } from "../../constants";

const BloodTest = ({ onNext }) => {
  const { handleSubmit, control } = useForm();
  return (
    <Paper className="!p-6 w-full flex flex-col gap-4">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        /*  onSubmit={handleSubmit(onSubmit)} */
        className="flex gap-4 flex-col"
      >
        <Box className="flex justify-between">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sélection d'Analyses de Sang
          </Typography>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="note" className="w-full md:w-[160px]">
            Analyses
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              name="body_side"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  className="bg-white"
                  multiple
                  id="tags-filled"
                  options={BoneDoctorBloodTests.map((option) => option.title)}
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
                      placeholder="Analyses "
                      sx={autocompleteStyles}
                    />
                  )}
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
    </Paper>
  );
};
const autocompleteStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.23)",
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.23)",
    },
    "&:hover fieldset": {
      borderColor: "dark",
    },
    "&.Mui-focused fieldset": {
      borderColor: "primary.main",
    },
  },
};
export default BloodTest;
