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
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BodySides, ViewTypes, XRayTypes } from "../../constants";
import { useLocation, useNavigate } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import addGlobal from "../../hooks/addGlobal";
import { XrayProps, xrayApiClient } from "../../services/XrayService";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const XrayDemand = ({ onNext }) => {
  const addMutation = addGlobal({} as XrayProps, xrayApiClient, undefined);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const patient_id = queryParams.get("id");
  const [xrays, setXrays] = useState([]);
  if (!patient_id) {
    return (
      <Typography variant="h6" color="error" align="center">
        Quelque chose s'est mal passé, veuillez refaire les étapes, si cela ne
        fonctionne pas, signalez ce bug au développeur.
      </Typography>
    );
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<XrayProps>();

  const onSubmit = async (data: XrayProps) => {
    const dataWithId = { ...data, patient_id };
    console.log(xrays);

    /* await addMutation.mutateAsync(dataWithId, {
      onSuccess: (data: any) => {
        const operationId = data.data;
        navigate(`?id=${patient_id}&operation_id=${operationId}`, {
          replace: true,
        });

        onNext();
      },
    }); */
  };

  const addRow = () => {
    const { body_side, view_type, xray_type } = getValues();
    if (!body_side.length || !view_type.length || !xray_type.length) return;
    setXrays([...xrays, { body_side, view_type, xray_type, id: xrays.length }]);
    reset({ xray_type: [], view_type: [], body_side: [] });
  };
  const removeXRay = (id) => {
    setXrays((old) => old.filter((e) => e.id !== id));
  };
  return (
    <Paper className="!p-6 w-full flex flex-col gap-4">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Box className="lg:col-span-3 flex justify-between">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Radiographie demandée
          </Typography>
        </Box>
        <Box className="flex gap-4 flex-wrap flex-col lg:flex-row lg:items-center">
          <Box className="w-full lg:w-0 lg:flex-1 flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
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
                        label="Type de radiographie"
                        sx={autocompleteStyles}
                      />
                    )}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full lg:w-0 lg:flex-1 flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
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
                        label="Type de vue"
                        sx={autocompleteStyles}
                      />
                    )}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full lg:w-0 lg:flex-1 flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
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
                        label="Côté du corps"
                        sx={autocompleteStyles}
                      />
                    )}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Button
            sx={{ borderRadius: 16 }}
            variant="outlined"
            className="block !py-2"
            onClick={addRow}
          >
            <AddIcon />
          </Button>
        </Box>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Radiographie</TableCell>
                <TableCell>Vue</TableCell>
                <TableCell>Côté</TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {xrays.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.xray_type.join(", ")}
                  </TableCell>
                  <TableCell>{row.view_type.join(", ")}</TableCell>
                  <TableCell>{row.body_side.join(", ")}</TableCell>
                  <TableCell>
                    <Button onClick={() => removeXRay(row.id)}>
                      <DeleteOutlineIcon
                        color="error"
                        className="pointer-events-none"
                        fill="currentColor"
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
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
        <Box className="flex justify-between flex-row mt-5 content-center">
          <Button
            className="w-full md:w-max !px-10 !py-3 rounded-lg "
            variant="outlined"
            onClick={() => {
              onNext();
            }}
          >
            <p className="text-sm ">Passer</p>
          </Button>
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
