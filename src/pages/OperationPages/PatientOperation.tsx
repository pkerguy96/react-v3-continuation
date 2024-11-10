//@ts-nocheck
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState, useMemo, Suspense, lazy } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import "../../styles.css";
import { Patient } from "../AddPatientForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Controller, useForm } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AxiosError } from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Bones, Younger, listOperationsArray } from "../../constants";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import getGlobal from "../../hooks/getGlobal";
import { CACHE_KEY_PATIENTS } from "../../constants";
import patientAPIClient, {
  OnlyPatientData,
} from "../../services/PatientService";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import addGlobal from "../../hooks/addGlobal";
import operationApiClient, { Operation } from "../../services/OperationService";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import useGlobalStore from "../../zustand/useGlobalStore";
import { useGlobalOperationPreference } from "../../hooks/getOperationPrefs";
import v6 from "../../assets/v6.svg";
const getColor = (colors) => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  if (colors.includes(randomColor)) return getColor(colors);
  return "#" + randomColor;
};

const PatientOperation = ({ onNext }) => {
  const [table, setTable] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const patient_id = queryParams.get("id");
  const { showSnackbar } = useSnackbarStore();
  const setIds = useGlobalStore((state) => state.setIds);
  const resetIds = useGlobalStore((state) => state.resetIds);
  const addMutation = addGlobal({} as Operation, operationApiClient);

  const validatePrix = useMemo(() => {
    return (value: number) => {
      const totalPrice = table.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price;
      }, 0);
      if (totalPrice <= 0) {
        return showSnackbar("le prix doit etre un nombre positive.", "error");
      }
      if (totalPrice < value) {
        return "le montant payé ne doit pas dépasser le prix";
      }

      return true;
    };
  }, [table]);

  /*   const { data, isLoading } = getGlobal(
    {} as OnlyPatientData,
    [CACHE_KEY_PATIENTS[0]],
    patientAPIClient,
    undefined
  ); */
  const isLoading = false;

  /*   var { data: OperationList, isLoading: isloading2 } =
    useGlobalOperationPreference(); */
  var isloading2 = false;
  var OperationList = [
    {
      name: "operation 1",
      price: 100,
      code: 1,
    },
    {
      name: "operation 2",
      price: 100,
      code: 2,
    },
    {
      name: "operation 3",
      price: 100,
      code: 3,
    },
  ];

  const colors = [];
  const [bones, setBones] = useState([]);
  const [color, setColor] = useState(getColor(colors));
  const { handleSubmit, getValues, setValue, control, watch } = useForm({});
  const isFullyPaid = watch("fullyPaid");

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const onSubmit = async (data: any) => {
    const cleanedData = {
      patient_id: patient_id,
      is_paid: data?.fullyPaid,
      note: data?.note,
      amount_paid: data?.paidAmount,
      operations: table,
    };

    const validatedData = [...table, cleanedData];

    try {
      await addMutation.mutateAsync(cleanedData, {
        onSuccess: () => {
          console.log("ddaaaaaaaazt");
          onNext();
        },
      });
    } catch (error) {
      console.log("madaztch");
    }
  };

  function toggleStrokeColor(code) {
    var _bones = [];
    if (bones.includes(code)) _bones = bones.filter((e) => e !== code);
    else _bones = [...bones, code];
    setBones(_bones);
  }

  return (
    <Paper>
      <FormControl
        component="form"
        className="!p-6 w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/**top bar */}
        <Box className="flex flex-col justify-center gap-4">
          <Box className="flex flex-col md:flex-row md:items-center md:justify-between ">
            <Typography
              className="px-2 flex justify-center text-xl font-bold  text-gray-400"
              variant="h6"
            >
              Veuillez sélectionner les os que vous souhaitez opérer
            </Typography>
            <Button
              component={Link}
              /* to={`/Patients/Details/${id}`} */
              variant="contained"
              color="primary"
              size="small"
            >
              Historique des opérations
            </Button>
          </Box>
        </Box>
        {/**Middle */}
        <Box className="w-full grid grid-cols-1 grid-rows-1 gap-4 lg:grid-cols-12 lg:my-4 items-start">
          <Box className="mx-auto my-auto relative lg:col-span-5">
            <img
              src={v6}
              alt="patient"
              className="block select-none mx-auto"
              style={{
                height: "auto", // Set height to auto to maintain aspect ratio
                width: "100%", // Set the desired width
              }}
            />

            <svg
              className="absolute left-1/2 -translate-x-1/2 inset-0"
              width="100%"
              height="100%"
              viewBox="0 0 483 1913"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {Bones.map((b, i) => (
                <polygon
                  key={i}
                  className="cursor-pointer"
                  strokeWidth={6}
                  fill="transparent"
                  points={b.points}
                  transform={b.transform}
                  {...(!table.find((e) => e.bones.includes(b.code))
                    ? {
                        onClick: () => toggleStrokeColor(b.code),
                        stroke: bones.includes(b.code) ? color : "",
                      }
                    : {
                        stroke:
                          table.find((e) => e.bones.includes(b.code)).color ||
                          "",
                      })}
                />
              ))}
            </svg>
          </Box>
          <Box className="w-full flex flex-col gap-4 lg:col-span-7 sticky top-16">
            <Typography
              className="text-2xl font-bold text-center text-[#1976d2] "
              variant="h5"
            >
              Formulaire d'opération.
            </Typography>
            <FormControl>
              <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-end md:items-center">
                <Box className="w-full md:flex-1 md:w-0">
                  <InputLabel id="select-type-label-o">Type</InputLabel>
                  <Controller
                    name="operation"
                    defaultValue=""
                    control={control}
                    render={({ field, fieldState }) => (
                      <Box className="flex flex-col">
                        <Select
                          {...field}
                          labelId="select-type-label-o"
                          id="select-type-helper"
                          label="Type"
                        >
                          {!isloading2 &&
                            OperationList.map((item) => (
                              <MenuItem key={item.code} value={item.code}>
                                {item.name}
                              </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText error={!!fieldState.error}>
                          {fieldState.error?.message}
                        </FormHelperText>
                      </Box>
                    )}
                  />
                </Box>
                <Button
                  className="w-max"
                  sx={{ borderRadius: 16 }}
                  variant="outlined"
                  endIcon={<AddIcon />}
                  onClick={(e) => {
                    const selectedOperation = getValues("operation");
                    const valid = !table.find(
                      (e) => e.code === selectedOperation
                    );

                    if (valid && selectedOperation && bones.length) {
                      const op = OperationList.find(
                        (e) => e.code === selectedOperation
                      );
                      setTable([
                        ...table,
                        {
                          ...op,
                          bones: bones,
                          color: color,
                        },
                      ]);
                      setValue("operation", "");
                      setBones([]);
                      colors.push(color);
                      setColor(getColor(colors));
                    } else {
                      showSnackbar(
                        "Veuillez sélectionner des dents avant d'ajouter une opération",
                        "error"
                      );
                    }
                  }}
                >
                  Ajouter
                </Button>
              </Box>
            </FormControl>
            <TableContainer className="w-full max-h-[400px] flex-wrap overflow-auto border border-gray-300">
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow className="bg-gray-300 !rounded-2xl	sticky top-0 z-10">
                    <TableCell>
                      <strong>Operation name</strong>
                    </TableCell>
                    <TableCell className="w-64">
                      <strong>Price</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {table.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center flex-wrap gap-2">
                          <span
                            className="block w-2 h-2 rounded-full"
                            style={{ background: item.color }}
                          ></span>
                          <span className="block text-base font-semibold">
                            {item.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="w-64">
                        <Box className="w-full flex flex-wrap items-center gap-2">
                          <Controller
                            name={`operations[${index}]`}
                            control={control}
                            defaultValue={""}
                            render={({ field, fieldState }) => (
                              <TextField
                                {...field}
                                value={item.price || ""}
                                className="w-0 flex-1"
                                label="Montant payé"
                                variant="outlined"
                                helperText={
                                  fieldState.error ? (
                                    <span style={{ color: "red" }}>
                                      {fieldState.error.message}
                                    </span>
                                  ) : (
                                    ""
                                  )
                                }
                                type="number"
                                onChange={(e) => {
                                  setTable(
                                    table.map((o) => {
                                      if (o.code === item.code) {
                                        o.price = +e.target.value;
                                        field.onChange(e);
                                      }
                                      return o;
                                    })
                                  );
                                }}
                              />
                            )}
                          />
                          <Button
                            className="w-max"
                            variant="outlined"
                            color="error"
                            onClick={() => {
                              setTable(
                                table.filter((o) => o.code !== item.code)
                              );
                            }}
                          >
                            <DeleteOutlineIcon />
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box className="w-full flex flex-wrap items-center -mt-4 font-black text-sm">
              <span className="block flex-1 p-4">Total Price:</span>
              <span className="block w-64 p-4 ps-8">
                {table.reduce((a, e) => a + e.price, 0)} MAD
              </span>
            </Box>

            <Box className="flex flex-col justify-center gap-4">
              <Box className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
                <Controller
                  name="paidAmount"
                  control={control}
                  rules={{
                    validate: validatePrix,
                  }}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <Box className="flex-1">
                      <TextField
                        {...field}
                        disabled={isFullyPaid}
                        id="paidAmount"
                        label="Montant payé"
                        variant="outlined"
                        type="number"
                        fullWidth
                      />
                      <FormHelperText error={!!fieldState.error}>
                        {fieldState.error?.message}
                      </FormHelperText>
                    </Box>
                  )}
                />
                <Controller
                  name="fullyPaid"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <FormControlLabel
                      className="w-max block"
                      control={<Checkbox {...field} />}
                      label={
                        <Typography variant="body2">
                          Entièrement payé
                        </Typography>
                      }
                    />
                  )}
                />
              </Box>
              <Controller
                name="note"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="large-text"
                    label="Note"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
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
        </Box>
      </FormControl>
    </Paper>
  );
};

export default PatientOperation;
