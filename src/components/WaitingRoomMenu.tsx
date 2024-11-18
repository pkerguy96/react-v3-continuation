import * as React from "react";
import Menu from "@mui/material/Menu";
import AlarmIcon from "@mui/icons-material/Alarm";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  FetchPatientsWaitingRoom,
  PatientNameWaitingRoom,
  WaitingroomCounter,
  clearPatientCounterApiClient,
  incrementPatientApiClient,
  incrementbyone,
  waitingRoomApiClient,
} from "../services/WaitingroomService";
import {
  CACHE_KEY_PatientsWaitingRoom,
  CACHE_KEY_WAITINGLIST,
  CACHE_KEY_WaitingRoom,
} from "../constants";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import addGlobal from "../hooks/addGlobal";
import useDebounce from "../hooks/useDebounce";
import getGlobal from "../hooks/getGlobal";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import { AxiosError } from "axios";

function WaitingRoomMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const waiting = getGlobal(
    {} as WaitingroomCounter,
    CACHE_KEY_PatientsWaitingRoom,
    waitingRoomApiClient,
    {
      refetchInterval: 10000,
    }
  );

  const searchMutation = addGlobal(
    {} as PatientNameWaitingRoom,
    FetchPatientsWaitingRoom
  );
  const AddPatient = addGlobal({} as incrementbyone, incrementPatientApiClient);
  const [isLoadingPatient, setLoading] = useState(false);
  const [options, setOptions] = useState([]); // Store autocomplete options
  const [height, setHeight] = useState("auto");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { showSnackbar } = useSnackbarStore();
  const handleSearch = useCallback((query: string) => {
    setSearchQuery((prevQuery) => (prevQuery !== query ? query : prevQuery));
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!debouncedSearchQuery) {
        setOptions([]);
        setHeight("auto");
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
          setHeight(h);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      } else {
        setOptions([]);
        setHeight("auto");
      }
    };

    fetchPatients();
  }, [debouncedSearchQuery]);

  const handlePatientSelect = useCallback((event: any, newValue: any) => {
    setSelectedPatient(newValue);
  }, []);

  const resetPatientCounter = useCallback(async () => {
    try {
      const response = await clearPatientCounterApiClient.getone();
      if (response.status >= 200 && response.status < 300) {
        queryClient.invalidateQueries(CACHE_KEY_PatientsWaitingRoom);
        queryClient.invalidateQueries(CACHE_KEY_WAITINGLIST);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const addPatientToWaitingList = async () => {
    await AddPatient.mutateAsync(
      { patient_id: selectedPatient?.id },
      {
        onSuccess(data: any) {
          waiting.refetch();
          console.log(data?.message);

          showSnackbar(data?.message, "success");
          queryClient.invalidateQueries(CACHE_KEY_WAITINGLIST);
        },
        onError(error: any) {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message
              : error.message;
          showSnackbar(message, "error");
        },
      }
    );
  };

  return (
    <div>
      <IconButton
        color="inherit"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AlarmIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          style: {
            width: "400px",
            height: height,
            maxHeight: 470,
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            gap: "1rem",
          },
          "aria-labelledby": "basic-button",
        }}
      >
        {waiting.isLoading ? (
          <LoadingSpinner />
        ) : (
          <Box className="flex flex-col gap-4">
            <Box tabIndex={-1} className="flex items-center justify-between">
              <span className="font-medium text-md">Nombre patients</span>
              <Box className="flex flex-row gap-2">
                <span className="flex justify-center items-center text-xl text-[#4B918C]">
                  {waiting.data}
                </span>
                {/* <IconButton onClick={handleClose} color="inherit" size="small">
              <CloseOutlinedIcon />
            </IconButton> */}
              </Box>
            </Box>
            <Box className="flex justify-center items-center w-full gap-8">
              <Autocomplete
                disablePortal
                options={options}
                getOptionLabel={(option) => option.name}
                sx={{ width: "100%" }}
                loading={isLoadingPatient}
                loadingText={<LoadingSpinner size="2rem" />}
                onInputChange={(event, newInputValue) => {
                  handleSearch(newInputValue);
                }}
                onChange={handlePatientSelect}
                renderInput={(params) => (
                  <TextField {...params} label="Search Patients" />
                )}
              />
            </Box>
            <Box className="flex flex-wrap items-center justify-end gap-4">
              <Button
                type="submit"
                variant="contained"
                size="small"
                className="rounded-lg !ms-auto"
                onClick={addPatientToWaitingList}
              >
                Ajouter
              </Button>
              <Button
                className="ml-auto mb-2"
                variant="outlined"
                size="small"
                color="error"
                endIcon={<DeleteIcon />}
                onClick={resetPatientCounter}
              >
                Clear
              </Button>
            </Box>
          </Box>
        )}
      </Menu>
    </div>
  );
}
export default React.memo(WaitingRoomMenu);
