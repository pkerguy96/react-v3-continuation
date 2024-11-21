//@ts-nocheck
import {
  Paper,
  Box,
  Divider,
  TextField,
  Autocomplete,
  Button,
  Typography,
  FormControl,
} from "@mui/material";
import { items } from "../services/Medicines.json";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect, lazy, Suspense } from "react";
import { Controller, useForm } from "react-hook-form";
import LoadingSpinner from "../components/LoadingSpinner";
import { Patient } from "./AddPatientForm";
import { redirect, useLocation, useNavigate, useParams } from "react-router";
import { AxiosError } from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import { useQueryClient } from "@tanstack/react-query";
import getGlobal from "../hooks/getGlobal";
import { CACHE_KEY_Operation, CACHE_KEY_PATIENTS } from "../constants";
import patientAPIClient, { OnlyPatientData } from "../services/PatientService";
import updateItem from "../hooks/updateItem";
import ordonanceApiClient, { Ordonance } from "../services/OrdonanceService";
import addGlobal from "../hooks/addGlobal";
import CreateAppointmentModal from "../components/CreateAppointmentModal";
import useGlobalStore from "../zustand/useGlobalStore";
import { PayementVerificationApiClient } from "../services/OperationService";
import getGlobalById from "../hooks/getGlobalById";
function $tempkate(opts: any) {
  const { lang, dir, size, margin, css, page } = opts;
  return `<!DOCTYPE html><html lang="${lang}"dir="${dir}"><head><meta charset="UTF-8"/><meta http-equiv="X-UA-Compatible"content="IE=edge"/><meta name="viewport"content="width=device-width, initial-scale=1.0"/><style>@page{size:${size.page};margin:${margin}}#page{width:100%}#head{height:${size.head}}#foot{height:${size.foot}}</style>${css}</head><body><table id="page"><thead><tr><td><div id="head"></div></td></tr></thead><tbody><tr><td><main id="main">${page}</main></td></tr></tbody><tfoot><tr><td><div id=foot></div></td></tr></tfoot></table></body></html>`;
}
function Print(target: any, callback: Function = () => {}) {
  const page = document.querySelector(target);

  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);
  var iframeDoc = iframe.contentDocument || iframe?.contentWindow?.document;
  iframeDoc?.open();
  iframeDoc?.write(
    $tempkate({
      size: {
        page: "A5",
        head: "100px",
        foot: "80px",
      },
      page: page.innerHTML,
      margin: "10mm 10mm 10mm 10mm",
      css: [
        '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">',
      ],
    })
  );
  iframeDoc?.close();
  iframe.onload = function () {
    iframe?.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
      callback();
    }, 1000);
  };
}
const AddOrdonanceUpdated = ({ onNext }: any) => {
  const [drugs, setDrugs] = useState([]);
  const [drug, setDrug] = useState({});
  const [name, setName] = useState("");
  const [fromOperation, setFromOperation] = useState(false);
  const [optionsArray, setOptionsArray] = useState(null);
  const [iserror, setIsError] = useState(false);
  const queryClient = useQueryClient();

  const { showSnackbar } = useSnackbarStore();
  const Addmutation = addGlobal({} as Ordonance, ordonanceApiClient);
  const useUpdateOrdonance = updateItem<Ordonance>(
    {} as Ordonance,
    ordonanceApiClient
  );
  const { data: patientsData, isLoading } = getGlobal(
    {} as OnlyPatientData, // Tname (you can use a placeholder object here)
    [CACHE_KEY_PATIENTS[0]], // query
    patientAPIClient, // service
    undefined // opts
  );

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  // Accessing query parameters
  const id = queryParams.get("id");
  const ordonanceID = queryParams.get("ordonanceID");
  const operation_id = queryParams.get("operation_id");
  const direct = queryParams.get("direct");
  const navigate = useNavigate();

  const isAddMode = !id;

  let dataArray: Patient[] = [];
  let specifiedPatient;

  if (
    patientsData &&
    typeof patientsData === "object" &&
    Object.keys(patientsData).length > 0
  ) {
    dataArray = Object.values(patientsData);
  }
  useEffect(() => {
    if (!isAddMode) {
      specifiedPatient = id
        ? patientsData?.find((patient) => patient.id === parseInt(id))
        : patientsData?.find((patient) => patient.id === parseInt(zuId));

      if (specifiedPatient && id && !ordonanceID) {
        setValue("patient", specifiedPatient);
        setFromOperation(true);
      } else if (specifiedPatient) {
        setOptionsArray(specifiedPatient);
        setValue("patient", specifiedPatient);

        const SpecifiedOrdonance = specifiedPatient.ordonances.find(
          (ordonance) => ordonance.id === parseInt(ordonanceID)
        );

        if (SpecifiedOrdonance) {
          setValue("date", SpecifiedOrdonance.date);
          const DrugsDetails = SpecifiedOrdonance.ordonance_details;
          const extractedDetails = DrugsDetails.map((item) => {
            return {
              id: item.id,
              medicine_name: item.medicine_name,
              note: item.note,
            };
          });
          setDrugs(extractedDetails);
        }
      }
    }
  }, [patientsData, id]);

  const { handleSubmit, setValue, getValues, control } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const onSubmit = async (data: any) => {
    data.drugs = drugs;

    if (data.drugs && data.drugs.length === 0) {
      setIsError(true);
    } else {
      const formData = {
        patient_id: data?.patient.id,
        medicine: data.drugs,
        date: data.date,
      };

      let response;
      try {
        if (isAddMode || fromOperation) {
          response = await createUser(formData);
        } else {
          await editUser(formData, parseInt(ordonanceID));
        }
        queryClient.invalidateQueries({ queryKey: ["ordonance"] });
      } catch (error) {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message
            : error.message;
        showSnackbar(message, "error");
      }
    }
  };

  const createUser = async (formData: Ordonance) => {
    return await Addmutation.mutateAsync(formData, {
      onSuccess: () => {
        Print("#page", () => {
          if (direct) {
            showSnackbar("Ordonnance ajoutée avec succès.", "success");
            navigate("/Ordonnance");
          } else if (onNext) {
            onNext();
          }
        });
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
  const editUser = async (formData: Ordonance, ordonanceID: number) => {
    await useUpdateOrdonance.mutateAsync(
      { data: formData, id: ordonanceID },
      {
        onSuccess: () => {
          showSnackbar("Ordonnance Modifiée avec succès.", "success");
          navigate("/Ordonnance");
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

  const handleNoteChange = (id, value) => {
    setDrugs((prevDrugs) =>
      prevDrugs.map((drug) =>
        drug.id === id ? { ...drug, note: value } : drug
      )
    );
  };

  const FormattedDate = new Date().toISOString().split("T")[0].split("-");
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
          <span>Ajouter une ordonance </span>
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
              Patient:
            </label>
            <Box className={`w-full md:flex-1 `}>
              <Controller
                rules={{ required: "Veuillez sélectionner un patient" }} // Add required rule
                control={control}
                name="patient"
                render={({ field, fieldState }) => (
                  <Autocomplete
                    {...field}
                    id="combo-box-demo"
                    value={optionsArray || field.value || null}
                    options={dataArray}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) =>
                      `${option.nom} ${option.prenom}`
                    }
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          label="Patient"
                          error={Boolean(fieldState?.error?.message)}
                          helperText={fieldState?.error?.message || ""}
                        />
                      );
                    }}
                    onChange={(e, data) => {
                      optionsArray && setOptionsArray(data);
                      setValue("patient", data);
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Date:
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="date"
                control={control}
                rules={{
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
                    size="large"
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-end md:items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Médicament:
            </label>
            <Box className="w-full md:flex-1">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Medicament"
                variant="outlined"
                value={name}
                inputProps={{ list: "browsers" }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <datalist id="browsers">
                {items.map((e, i) => (
                  <option key={i} value={e.name} />
                ))}
              </datalist>
            </Box>
            <Button
              sx={{ borderRadius: 16 }}
              variant="outlined"
              endIcon={<AddIcon />}
              onClick={() => {
                const valid =
                  name.trim() !== "" &&
                  !drugs.some(
                    (e) => e.medicine_name.toUpperCase() === name.toUpperCase()
                  );
                if (valid) {
                  const found = items.find((e) => e.name === name);
                  setDrugs([
                    ...drugs,
                    {
                      medicine_name: found.name,
                      type: found.type,
                      price: found.price,
                      note: "",
                      id: drugs.length,
                    },
                  ]);
                }
                setName("");
              }}
            >
              Ajouter
            </Button>
          </Box>
          {iserror && (
            <Typography color="error" className="flex justify-center">
              S'il vous plaît, sélectionnez au moins un médicament.
            </Typography>
          )}
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Sélectionné:
            </label>

            <TableContainer className="w-full md:flex-1 flex-wrap">
              <Table sx={{ minWidth: 480 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nom du médicament</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Prix</TableCell>
                    <TableCell>Note</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {drugs.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.medicine_name}
                      </TableCell>
                      <TableCell component="th">{row.type}</TableCell>
                      <TableCell component="th">{row.price} MAD</TableCell>
                      <TableCell style={{ minWidth: 200 }}>
                        <TextField
                          fullWidth
                          value={row.note || ""}
                          onChange={(e) =>
                            handleNoteChange(row.id, e.target.value)
                          }
                          label="Note"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box className="flex justify-between flex-row mt-5 content-center">
            {!direct && !ordonanceID && (
              <Button
                className="w-full md:w-max !px-10 !py-3 rounded-lg "
                variant="outlined"
                onClick={() => {
                  onNext();
                }}
              >
                <p className="text-sm ">Passer</p>
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              className="w-full md:w-max !px-10 !py-3 rounded-lg !ms-auto"
            >
              {useUpdateOrdonance.isLoading ? "mise à jour..." : "Enregistrer"}
            </Button>
          </Box>
        </Box>
      </Box>
      <div
        id="page"
        className="hidden w-full flex-col gap-4 bg-white rounded-sm"
      >
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex gap-4 items-center flex-col">
            <p className="font-semibold">
              Fait a beni mellal Le {FormattedDate[0]}/{FormattedDate[1]}/
              {FormattedDate[2]}
            </p>
            <p className="font-semibold">
              Nom & Prenom: {getValues("patient")?.nom}
              {getValues("patient")?.prenom}
            </p>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              {drugs.map((details: any, index: number) => (
                <div key={index}>
                  <h3 className="font-bold">
                    {index + 1}- {details.medicine_name}
                  </h3>
                  <p className="ms-4">{details.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default AddOrdonanceUpdated;
