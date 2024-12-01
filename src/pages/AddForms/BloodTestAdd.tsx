import {
  Paper,
  Box,
  Divider,
  FormControl,
  TextField,
  Button,
  Autocomplete,
  Chip,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import LoadingSpinner from "../../components/LoadingSpinner";
import useDebounce from "../../hooks/useDebounce";
import addGlobal from "../../hooks/addGlobal";
import {
  FetchPatientsWaitingRoom,
  PatientNameWaitingRoom,
} from "../../services/WaitingroomService";
import { Analyses, BoneDoctorBloodTests } from "../../constants";
import { bloodTestApiClient, BloodTestProps } from "../../services/BloodTest";
import { Navigate, useNavigate } from "react-router";
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
const BloodTestAdd = () => {
  const navigate = useNavigate();

  const [options, setOptions] = useState([]);
  const [isLoadingPatient, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [row, setRow] = useState<any>();
  const [call, setCall] = useState<any>(false);
  const [analyse, setAnalyse] = useState([]);

  const addMutation = addGlobal({} as BloodTestProps, bloodTestApiClient);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const searchMutation = addGlobal(
    {} as PatientNameWaitingRoom,
    FetchPatientsWaitingRoom
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const rows = watch("blood_test") || [];

  const handleSearch = useCallback((query: string) => {
    setSearchQuery((prevQuery) => (prevQuery !== query ? query : prevQuery));
  }, []);

  const onSubmit = (data: any) => {
    const formdata = {
      patient_id: data.patient.id,
      blood_test: [...analyse].map((carry) => carry.analyse),
    };

    try {
      addMutation.mutateAsync(formdata, {
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
  const FormattedDate = new Date().toISOString().split("T")[0].split("-");

  useEffect(() => {
    const fetchPatients = async () => {
      if (!debouncedSearchQuery) {
        setOptions([]);
        return;
      }
      if (debouncedSearchQuery) {
        setLoading(true);
        try {
          const response = (await searchMutation.mutateAsync({
            searchQuery: debouncedSearchQuery,
          })) as { data: { id: number; name: string }[] };
          const patients = response?.data ?? [];
          setOptions(patients);
          const h =
            patients.length === 0 ? "auto" : 200 + 30 * patients.length + "px";
        } catch (error) {
        } finally {
          setLoading(false);
        }
      } else {
        setOptions([]);
      }
    };

    fetchPatients();
  }, [debouncedSearchQuery]);
  useEffect(() => {
    if (!row || !call) return;
    Print("#page", () => navigate("/bloodtest"));
  }, [row, call]);
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
          <span>Ajouter un bilan sanguin</span>
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
              Personne de contact
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="patient"
                control={control}
                rules={{ required: "Patient selection is required" }}
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    value={field.value || null}
                    disablePortal
                    options={options}
                    getOptionLabel={(option) => option.name || ""}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    noOptionsText="Aucune option disponible"
                    sx={{ width: "100%" }}
                    loading={isLoadingPatient}
                    loadingText={<LoadingSpinner size="2rem" />}
                    onInputChange={(event, newInputValue) => {
                      handleSearch(newInputValue);
                    }}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search Patients"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Analyses
            </label>
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

            {/*    <FormControl className="w-full md:flex-1">
              <InputLabel id="demo-simple-analyse-helper-label">
                Analyses
              </InputLabel>
              <Select
                className="w-full"
                multiple
                id="tags-filled"
                label="Analyses"
                labelId="demo-simple-analyse-helper-label"
                value={analyse}
                onChange={(event) => {
                  const value = event.target.value;
                  setAnalyse(value);
                }}
                renderValue={(selected) => {
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.analyse} label={value.analyse} />
                      ))}
                    </Box>
                  );
                }}
              >
                {Object.keys(Analyses).reduce((acc, header) => {
                  acc.push(
                    <ListSubheader key={`header_${header}`}>
                      {header}
                    </ListSubheader>
                  );
                  acc.push(
                    ...Analyses[header].map((print, index) => {
                      return (
                        <MenuItem
                          key={`print_${header}_${index}`}
                          value={print}
                        >
                          {print.analyse}
                        </MenuItem>
                      );
                    })
                  );
                  return acc;
                }, [])}
              </Select>
            </FormControl> */}
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
export default BloodTestAdd;
