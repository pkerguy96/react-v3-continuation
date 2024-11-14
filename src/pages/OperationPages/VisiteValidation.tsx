//@ts-nocheck

import {
  Paper,
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useFieldArray, useWatch } from "react-hook-form";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import getGlobalById from "../../hooks/getGlobalById";
import {
  insertOpwithoutxray,
  PatientXrayApiClient,
  xrayApiClient,
  XrayData,
} from "../../services/XrayService";
import { useLocation, useNavigate } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner";
import { CACHE_KEY_Xray } from "../../constants";
import updateItem from "../../hooks/updateItem";
import addGlobal from "../../hooks/addGlobal";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
interface RowData {
  id?: string | number;
  xray_type: string;
  price: number;
}
const VisiteValidation = ({ onNext }) => {
  const { handleSubmit, control, setValue } = useForm<{ rows: RowData[] }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const operation_id = queryParams.get("operation_id");
  const patient_id = queryParams.get("id");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();
  const { data, isLoading } = operation_id
    ? getGlobalById(
        {} as XrayData,
        ["CACHE_KEY_Xray", operation_id.toString()],
        PatientXrayApiClient,
        undefined,
        parseInt(operation_id)
      )
    : { data: null, isLoading: false };
  const addmutation = addGlobal({} as RowData, insertOpwithoutxray);
  const [totalPrice, setTotalPrice] = useState(0);
  const updateMutation = updateItem({} as XrayData, xrayApiClient);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  // Initialize rows with fetched data
  useEffect(() => {
    if (data) {
      setValue(
        "rows",
        data.map((item) => ({
          id: item.id,
          xray_type: item.xray_type,
          price: item.price,
        }))
      );
    }
  }, [data]);

  const rows = useWatch({ control, name: "rows" });

  // Calculate total price whenever rows change
  useEffect(() => {
    const total = rows?.reduce((sum, row) => sum + Number(row.price || 0), 0);
    setTotalPrice(total);
  }, [rows]);

  const handleAddRow = () => {
    append({ xray_type: "", price: 0 });
  };

  if (isLoading) return <LoadingSpinner />;
  const onSubmit = async (data: {
    rows: RowData[];
    consomables: RowData[];
  }) => {
    try {
      // Check if operation_id exists
      if (operation_id) {
        const formData = {
          operation_id: operation_id,
          patient_id: patient_id,
          ...data,
        };
        // If operation_id exists, update the operation
        await updateMutation.mutateAsync(
          {
            data: formData,
            id: Number(operation_id),
          },
          {
            onSuccess: (data) => {
              showSnackbar(
                "L'opération a été enregistrée avec succès",
                "success"
              );
              navigate("/Patients");
            },
            onError: (error) => {
              console.error("Error updating operation:", error);
            },
          }
        );
      } else {
        const formData = {
          patient_id: Number(patient_id),
          ...data,
        };
        console.log(formData);

        await addmutation.mutateAsync(formData, {
          onSuccess: (data) => {
            showSnackbar(
              "L'opération a été enregistrée avec succès",
              "success"
            );
            navigate("/Patients");
          },
          onError: (error) => {
            console.error("Error creating operation:", error);
          },
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const {
    fields: consomableFields,
    append: appendConsomable,
    remove: removeConsomable,
  } = useFieldArray({
    control,
    name: "consomables",
  });

  const consomables = useWatch({ control, name: "consomables" });

  const handleAddConsomable = () => {
    appendConsomable({ consomable: "", price: 0 });
  };

  const [consomableTotal, setConsomableTotal] = useState(0);
  useEffect(() => {
    const total = consomables?.reduce(
      (sum, row) => sum + Number(row.price || 0),
      0
    );
    setConsomableTotal(total);
  }, [consomables]);
  return (
    <Paper className="!p-6 w-full flex flex-col gap-4">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="flex gap-8 flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box className="flex gap-4 flex-col">
          <Box className="flex justify-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Validation payment
            </Typography>
            <Button
              sx={{ borderRadius: 16 }}
              variant="outlined"
              onClick={handleAddRow}
            >
              <AddIcon />
            </Button>
          </Box>

          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Operation name</TableCell>
                    <TableCell width="250px" align="left">
                      Price
                    </TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow
                      key={field.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <FormControl className="w-full md:flex-1">
                          <Controller
                            name={`rows.${index}.xray_type`}
                            control={control}
                            defaultValue={field.xray_type}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id={`xray_type_${field.id}`}
                                size="small"
                                type="text"
                              />
                            )}
                          />
                        </FormControl>
                      </TableCell>

                      <TableCell align="right">
                        <FormControl className="w-full md:flex-1">
                          <Controller
                            name={`rows.${index}.price`}
                            control={control}
                            defaultValue={field.price}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id={`price_${field.id}`}
                                size="small"
                                type="number"
                              />
                            )}
                          />
                        </FormControl>
                      </TableCell>

                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => remove(index)}
                        >
                          retirer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box className="flex justify-between items-center">
            <h2 className="font-semibold text-base text-start">
              Montant Total
            </h2>
            <span className="font-semibold text-sm text-end">
              {totalPrice} MAD
            </span>
          </Box>
        </Box>
        <Box className="flex gap-4 flex-col">
          <Box className="flex justify-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Validation payment
            </Typography>
            <Button
              sx={{ borderRadius: 16 }}
              variant="outlined"
              onClick={handleAddConsomable}
            >
              <AddIcon />
            </Button>
          </Box>

          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Operation name</TableCell>
                    <TableCell width="250px" align="left">
                      Price
                    </TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {consomableFields.map((carry, index) => (
                    <TableRow
                      key={"consomable." + carry.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="consomables">
                        <FormControl className="w-full md:flex-1">
                          <Controller
                            name={`consomables.${index}.consomable`}
                            control={control}
                            defaultValue={carry.consomable}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id={`consomables.consomable_${index}`}
                                size="small"
                                type="text"
                              />
                            )}
                          />
                        </FormControl>
                      </TableCell>

                      <TableCell align="right">
                        <FormControl className="w-full md:flex-1">
                          <Controller
                            name={`consomables.${index}.price`}
                            control={control}
                            defaultValue={carry.price}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id={`consomables.price_${index}`}
                                size="small"
                                type="number"
                              />
                            )}
                          />
                        </FormControl>
                      </TableCell>

                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => removeConsomable(index)}
                        >
                          retirer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box className="flex justify-between items-center">
            <h2 className="font-semibold text-base text-start">
              Montant Total
            </h2>
            <span className="font-semibold text-sm text-end">
              {consomableTotal} MAD
            </span>
          </Box>
        </Box>
        <Box className="flex">
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

export default VisiteValidation;
