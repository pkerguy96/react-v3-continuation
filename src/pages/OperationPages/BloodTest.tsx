import {
  Paper,
  Box,
  Typography,
  FormControl,
  Autocomplete,
  Chip,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Analyses, BodySides, BoneDoctorBloodTests } from "../../constants";
import addGlobal from "../../hooks/addGlobal";
import { bloodTestApiClient, BloodTestProps } from "../../services/BloodTest";
import { useLocation } from "react-router";
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
    callback();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };
}
interface Props {
  blood_test: string[];
}
const BloodTest = ({ onNext }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const patient_id = queryParams.get("id");
  const operationId = queryParams.get("operation_id");
  const [row, setRow] = useState<any>();
  const [call, setCall] = useState<any>(false);
  const { handleSubmit, control, watch } = useForm<Props>();
  const addMutation = addGlobal({} as BloodTestProps, bloodTestApiClient);
  const [analyse, setAnalyse] = useState([]);

  if (!patient_id) {
    return (
      <Typography variant="h6" color="error" align="center">
        Quelque chose s'est mal passé, veuillez refaire les étapes, si cela ne
        fonctionne pas, signalez ce bug au développeur.
      </Typography>
    );
  }
  const onSubmit = async (data) => {
    const formatedData: any = {
      patient_id: patient_id,
      operation_id: operationId ? parseInt(operationId) : null,
      blood_test: [...analyse].map((carry) => carry.analyse),
    };

    try {
      addMutation.mutateAsync(formatedData, {
        onSuccess: (data: any) => {
          setRow(data.data);
          setCall(true);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } catch (error) {}
  };
  const rows = watch("blood_test") || [];
  const FormattedDate = new Date().toISOString().split("T")[0].split("-");
  useEffect(() => {
    if (!row || !call) return;
    Print("#page", () => {
      onNext();
    });
  }, [row, call]);
  return (
    <Paper className="!p-6 w-full flex flex-col gap-4">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-6 flex-col"
      >
        <Box className="flex justify-between">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sélection d'Analyses
          </Typography>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="note" className="w-full md:w-[160px]">
            Analyses
          </label>
          {/*   <FormControl className="w-full md:flex-1">
            <Controller
              name="blood_test"
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
          </FormControl> */}
          <FormControl className="w-full md:flex-1">
            <Controller
              name="blood_test"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  className="bg-white"
                  multiple
                  id="tags-filled"
                  options={Object.keys(Analyses)
                    .flatMap(
                      (category) => Analyses[category].map((option) => option) // Map to all options in all categories
                    )
                    .filter(
                      (value, index, self) =>
                        index ===
                        self.findIndex(
                          (t) => t.analyse === value.analyse // Assuming 'id' is the unique property
                        )
                    )}
                  defaultValue={[]}
                  value={field.value || []}
                  onChange={(event, newValue) => {
                    const vals = newValue.map((ana) => {
                      return typeof ana === "string"
                        ? {
                            analyse: ana,
                            price: "",
                          }
                        : ana;
                    });
                    field.onChange(vals);
                    setAnalyse(vals);
                  }} // Handle the change correctly
                  freeSolo
                  getOptionLabel={(option) => option.analyse} // Show the 'analyse' field as the label
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      return (
                        <Chip
                          variant="outlined"
                          label={option.analyse}
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
                      placeholder="Select Analyses"
                      sx={autocompleteStyles}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2">
          <TableContainer
            component={Paper}
            elevation={0}
            className="border border-gray-300"
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="bg-gray-200">
                <TableRow>
                  <TableCell className="min-w-[400px]">Analyse</TableCell>
                  <TableCell width="160px">Prix</TableCell>
                  {/* <TableCell align="center" width="120px">
                      Action
                    </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {analyse.map((carry, index) => (
                  <TableRow key={index} className="border-t border-gray-300">
                    <TableCell className="min-w-[400px]">
                      <FormControl className="w-full" size="medium">
                        {carry.analyse}
                      </FormControl>
                    </TableCell>
                    <TableCell width="160px">
                      <FormControl className="w-full md:flex-1" size="medium">
                        {carry.prix} {carry.prix ? "MAD" : ""}
                      </FormControl>
                    </TableCell>
                    {/* <TableCell align="center" width="120px">
                        <IconButton
                          variant="contained"
                          color="error"
                          onClick={() => handleRemoveRow(index)}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box className="flex justify-between flex-row mt-8 content-center">
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
              Nom & Prenom: {row?.nom} {row?.prenom}
            </p>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              {analyse.map((carry: any, index: number) => (
                <div key={index}>
                  <h3 className="font-bold">
                    {index + 1}- {carry.analyse}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
