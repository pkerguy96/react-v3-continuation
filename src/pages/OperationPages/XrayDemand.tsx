import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { BodySides, ViewTypes, XRayTypes } from "../../constants";
import { useLocation } from "react-router";

import addGlobal from "../../hooks/addGlobal";
import { XrayProps, xrayApiClient } from "../../services/XrayService";

const XrayDemand = ({ onNext }) => {
  const addMutation = addGlobal({} as XrayProps, xrayApiClient, undefined);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const patient_id = queryParams.get("id");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<XrayProps>();

  const onSubmit = async (data: XrayProps) => {
    const dataWithId = { ...data, patient_id };
    await addMutation.mutateAsync(dataWithId, {
      onSuccess: () => {
        console.log("sucess");
        onNext();
      },
    });
  };
  return (
    <Paper className="!p-6 w-full flex flex-col gap-4">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-4 flex-col"
      >
        <Box className="flex justify-between">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Radiographie demandée
          </Typography>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="note" className="w-full md:w-[160px]">
            Type de radiographie
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              name="xray_type"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  className="bg-white"
                  multiple
                  id="tags-filled"
                  options={XRayTypes.map((option) => option.title)}
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
                      placeholder="radiographie"
                      sx={autocompleteStyles}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="note" className="w-full md:w-[160px]">
            Type de vue
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              name="view_type"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  className="bg-white"
                  multiple
                  id="tags-filled"
                  options={ViewTypes.map((option) => option.title)}
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
                      placeholder="Vue"
                      sx={autocompleteStyles}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="note" className="w-full md:w-[160px]">
            Côté du corps
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
                  options={BodySides.map((option) => option.title)}
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
                      placeholder="Côté"
                      sx={autocompleteStyles}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="note" className="w-full md:w-[160px]">
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
    </Paper>
  );
};
//TODO make this global
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
export default XrayDemand;
