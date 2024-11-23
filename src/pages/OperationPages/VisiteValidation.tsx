//@ts-nocheck
import {
  Paper,
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
import {
  CACHE_KEY_OperationPref,
  CACHE_KEY_ProductOperation,
  CACHE_KEY_Xray,
} from "../../constants";
import updateItem from "../../hooks/updateItem";
import addGlobal from "../../hooks/addGlobal";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import getGlobal from "../../hooks/getGlobal";
import { OperationPrefApiClient } from "../../services/SettingsService";
import { useQueryClient } from "@tanstack/react-query";
import useOperationStore from "../../zustand/usePatientOperation";
import { productOperationApiClient } from "../../services/StockService";
import { AxiosError } from "axios";
interface RowData {
  id?: string | number;
  xray_type: string;
  price: number;
}
interface Consomables {
  id?: string | number;
  consomable: string;
  qte: number;
}
const VisiteValidation = ({ onNext }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { clearPatientOperation } = useOperationStore();
  const queryClient = useQueryClient();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const operation_id = queryParams.get("operation_id");
  const patient_id = queryParams.get("id");
  const isdone = queryParams.get("isdone");
  const { data: ConsumablesPref, isLoading: isLoading3 } = getGlobal(
    {},
    CACHE_KEY_ProductOperation,
    productOperationApiClient,
    undefined
  );
  const {
    data: Operationprefs,
    refetch,
    isLoading: isloading2,
  } = getGlobal({}, CACHE_KEY_OperationPref, OperationPrefApiClient, undefined);
  const [consomableTotal, setConsomableTotal] = useState(0);
  const { data: xrayData, isLoading } = operation_id
    ? getGlobalById(
        {} as XrayData,
        ["CACHE_KEY_Xray", operation_id.toString()],
        PatientXrayApiClient,
        undefined,
        parseInt(operation_id)
      )
    : { data: [], isLoading: false };
  const { handleSubmit, control, setValue, getValues } = useForm<{
    rows: RowData[];
    consomables: Consomables[];
  }>();
  const Zok = [
    {
      id: 1,
      name: "tichkbila",
    },
    {
      id: 2,
      name: "zaba",
    },
    {
      id: 3,
      name: "zaka",
    },
  ];
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();

  const addmutation = addGlobal({} as RowData, insertOpwithoutxray);
  const [totalPrice, setTotalPrice] = useState(0);
  const updateMutation = updateItem({} as XrayData, xrayApiClient);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  const {
    fields: consomableFields,
    append: appendConsomable,
    remove: removeConsomable,
  } = useFieldArray({
    control,
    name: "consomables",
  });

  const rows = useWatch({ control, name: "rows" });
  const consomables = useWatch({ control, name: "consomables" });

  const handleAddRow = () => {
    append({ xray_type: "", price: 0 });
  };
  const handleAddConsomable = () => {
    appendConsomable({ consomable: "", qte: 0 });
  };

  const onSubmit = async (data: {
    rows: RowData[];
    consomables: RowData[];
  }) => {
    if (data.rows.length === 0) {
      showSnackbar(
        "Vous devez remplir au moins une opération avant de soumettre",
        "error"
      );
      return;
    }
    const validRows = data.rows.filter((row) => row.xray_type.trim() !== "");

    if (validRows.length === 0) {
      showSnackbar(
        "Veuillez remplir le nom de l'opération avant de soumettre",
        "error"
      );
      return;
    }

    try {
      // Check if operation_id exists
      if (operation_id) {
        const formData = {
          operation_id: operation_id,
          patient_id: patient_id,
          treatment_isdone: isdone ?? 1,
          ...data,
        };
        formData.rows = formData.rows.map((e) => {
          if (e.id)
            if (String(e.id).startsWith("pref-")) {
              delete e.id; // Remove the id property if it starts with "pref-"
            } else {
              e.id = String(e.id).replace(/^data-(\d+)$/, "$1"); // Keep only the number for "data-"
            }
          return e;
        });

        // If operation_id exists, update the operation
        await updateMutation.mutateAsync(
          {
            data: formData,
            id: Number(operation_id),
          },
          {
            onSuccess: (data) => {
              queryClient.invalidateQueries({
                queryKey: ["operation"],
                exact: false,
              });
              showSnackbar(
                "L'opération a été enregistrée avec succès",
                "success"
              );
              clearPatientOperation(patient_id);
              navigate("/Patients");
            },
            onError: (error) => {
              const message = error.response?.data?.error;

              showSnackbar(message, "error");
            },
          }
        );
      } else {
        const formData = { 
          patient_id: Number(patient_id),
          treatment_isdone: isdone ?? 1,
          ...data,
        };
        console.log(formData);

        await addmutation.mutateAsync(formData, {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: ["operation"],
              exact: false,
            });
            showSnackbar(
              "L'opération a été enregistrée avec succès",
              "success"
            );
            navigate("/Patients");
          },
          onError: (error) => {
            const message = error.response?.data?.error;

            showSnackbar(message, "error");
          },
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
  // Initialize rows with fetched data

  const combinedRows = useMemo(() => {
    return [
      ...(xrayData || []).map((item, index) => ({
        id: `data-${item.id || index}`, // Ensure unique id
        xray_type: item.xray_type || "", // Default to empty string
        price: item.price || 0, // Default to 0
      })),
      ...(Operationprefs || []).map((pref, index) => ({
        id: `pref-${pref.id || index}`, // Ensure unique id
        xray_type: pref.operation_type || "", // Default to empty string
        price: parseFloat(pref.price || "0"), // Default to 0
      })),
    ];
  }, [xrayData, Operationprefs]);
  useEffect(() => {
    if (!isInitialized && combinedRows.length > 0) {
      setValue("rows", combinedRows);
      setIsInitialized(true); // Mark as initialized
    }
  }, [combinedRows, setValue, isInitialized]);
  useEffect(() => {
    if (isInitialized && combinedRows.length > 0) {
      const currentRows = getValues("rows");
      const hasDifference =
        JSON.stringify(currentRows) !== JSON.stringify(combinedRows);

      if (hasDifference) {
        setValue("rows", combinedRows); // Update rows if there's a difference
      }
    }
  }, [combinedRows, setValue, getValues, isInitialized]);
  useEffect(() => {
    const total = rows?.reduce((sum, row) => sum + Number(row.price || 0), 0);
    setTotalPrice(total);
  }, [rows]);

  useEffect(() => {
    const total = consomables?.reduce(
      (sum, row) => sum + Number(row.qte || 0),
      0
    );
    setConsomableTotal(total);
  }, [consomables]);
  if (isLoading || isloading2 || isLoading3) return <LoadingSpinner />;
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
                        <IconButton
                          variant="contained"
                          color="error"
                          onClick={() => remove(index)}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
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
                    <TableCell>Consommable</TableCell>
                    <TableCell width="250px" align="left">
                      Quantité
                    </TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {consomableFields.map((carry, index) => (
                    <TableRow
                      key={"consomable." + index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="consomables">
                        <FormControl className="w-full md:flex-1">
                          <Controller
                            name={`consomables.${index}.consomable`}
                            control={control}
                            defaultValue={carry.consomable}
                            render={({ field }) => (
                              <Select
                                {...field}
                                labelId="demo-select-small-label"
                                id={`consomables.consomable_${index}`}
                                size="small"
                              >
                                {ConsumablesPref &&
                                ConsumablesPref.length > 0 ? (
                                  ConsumablesPref.map(
                                    (consumable: SupplierTinyData) => (
                                      <MenuItem
                                        key={consumable.id}
                                        value={consumable.id}
                                      >
                                        {consumable.product_name}
                                      </MenuItem>
                                    )
                                  )
                                ) : (
                                  <MenuItem value="none" disabled>
                                    <em>Aucun consommable trouvé</em>
                                  </MenuItem>
                                )}
                              </Select>
                            )}
                          />
                        </FormControl>
                      </TableCell>

                      <TableCell align="right">
                        <FormControl className="w-full md:flex-1">
                          <Controller
                            name={`consomables.${index}.qte`}
                            control={control}
                            defaultValue={carry.qte}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id={`consomables.qte_${index}`}
                                size="small"
                                type="number"
                              />
                            )}
                          />
                        </FormControl>
                      </TableCell>

                      <TableCell align="right">
                        <IconButton
                          variant="contained"
                          color="error"
                          onClick={() => removeConsomable(index)}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box className="flex justify-between items-center">
            <h2 className="font-semibold text-base text-start">
              Quantité Total
            </h2>
            <span className="font-semibold text-sm text-end">
              {consomableTotal} Pièces
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
