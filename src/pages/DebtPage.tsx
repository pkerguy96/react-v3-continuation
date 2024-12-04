import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Paper,
  TextField,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DebtTableComponant from "../components/Tables/DebtTableComponant";
import addGlobal from "../hooks/addGlobal";
import {
  OperationDataDebt,
  PatientsDebtKpiClient,
} from "../services/KpisService";
import { CACHE_KEY_Hospitals } from "../constants";
import getGlobal from "../hooks/getGlobal";
import { Hospital, hospitalApiClient } from "../services/HospitalService";
import LoadingSpinner from "../components/LoadingSpinner";
import useUserRoles from "../zustand/UseRoles";

interface SentDebtData {
  date: string;
  date2: string;
}

const DebtPage = () => {
  const { can } = useUserRoles();

  const [data, setData] = useState<OperationDataDebt[]>([]);
  const {
    data: hospitals,
    refetch,
    isLoading,
  } = getGlobal(
    {} as Hospital,
    CACHE_KEY_Hospitals,
    hospitalApiClient,
    undefined
  );
  const addMutation = addGlobal(
    {} as SentDebtData,
    PatientsDebtKpiClient,
    undefined
  );
  const hasAccess = can(["access_creance", "doctor"]);

  if (!hasAccess) {
    return (
      <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
        Vous n'avez pas la permission de consulter cette page.
      </div>
    );
  }
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();
  const todayDate = new Date().toISOString().split("T")[0];
  const onSubmit = async (formData: SentDebtData) => {
    setData([]);

    await addMutation.mutateAsync(formData, {
      onSuccess: (response: any) => {
        const transformedData = response?.data?.map((item: any) => ({
          name: item.name,
          date: item.date,
          operation_type: item.operation_type, // Already formatted as a string
          total_cost: `${item.total_cost.toFixed(2)} MAD`,
          total_amount_paid: `${item.total_amount_paid.toFixed(2)} MAD`,
          amount_due: `${item.amount_due.toFixed(2)} MAD`,
        }));
        setData(transformedData);
      },
    });
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <Paper className="p-4">
      <Box
        component="form"
        className="w-full flex flex-col gap-4"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box className="flex justify-center text-lg text-gray-400 uppercase">
          <span>Page des créances</span>
        </Box>
        <Divider
          orientation="horizontal"
          flexItem
          className="gap-2 mb-4"
          variant="middle"
        />

        <Box className="w-full flex flex-col md:flex-row gap-4 items-end flex-wrap">
          <Box className="flex items-start gap-1 flex-1 flex-col">
            <label htmlFor="date">Date de début:</label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="date"
                defaultValue={todayDate}
                control={control}
                render={({ field }) => (
                  <TextField required type="date" {...field} id="date" />
                )}
              />
            </FormControl>
          </Box>
          <Box className="flex  items-start gap-1 flex-1 flex-col">
            <label htmlFor="date2">Date de fin :</label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="date2"
                defaultValue=""
                control={control}
                rules={{
                  validate: (value) => {
                    const startDate = new Date(getValues("date"));
                    const currentDate = new Date(value);
                    return (
                      startDate <= currentDate ||
                      "La date de fin doit être après la date de début."
                    );
                  },
                }}
                render={({ field }) => (
                  <TextField
                    required
                    type="date"
                    {...field}
                    id="date2"
                    error={!!errors.date2}
                    helperText={
                      errors.date2
                        ? (errors.date2.message as React.ReactNode)
                        : ""
                    }
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="flex flex-row items-center flex-1 ">
            <FormControl className="w-full md:flex-1">
              <Controller
                name="hospitals"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    className="bg-white"
                    multiple
                    id="tags-filled"
                    options={[
                      { id: "tout", name: "tout" }, // Add "tout" as a static option
                      ...hospitals.map((option) => ({
                        id: option.id,
                        name: option.name,
                      })), // Use ID and name for hospitals
                    ]}
                    getOptionLabel={(option) => option.name} // Display the hospital name
                    defaultValue={[]}
                    value={
                      field.value === "tout"
                        ? [{ id: "tout", name: "tout" }]
                        : hospitals.filter((option) =>
                            Array.isArray(field.value)
                              ? field.value.includes(option.id)
                              : false
                          )
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    } // Match by ID
                    onChange={(event, newValue) => {
                      // Handle the "tout" logic
                      if (newValue.some((item) => item.id === "tout")) {
                        field.onChange("tout"); // Set value to "tout"
                      } else {
                        field.onChange(newValue.map((item) => item.id)); // Send IDs only
                      }
                    }}
                    freeSolo
                    renderTags={(value: readonly any[], getTagProps) =>
                      value.map((option: any, index: number) => {
                        const { key, ...tagProps } = getTagProps({ index });
                        return (
                          <Chip
                            variant="outlined"
                            label={option.name}
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
                        placeholder="Cliniques"
                        sx={autocompleteStyles}
                      />
                    )}
                  />
                )}
              />
            </FormControl>
          </Box>

          {/*  <FormControlLabel
            control={
              <Controller
                name="checkbox"
                control={control}
                render={({ field }) => <Checkbox {...field} />}
              />
            }
            label="Tout"
          /> */}

          <Box className="flex md:ml-auto">
            <Button
              size="small"
              type="submit"
              variant="outlined"
              startIcon={<SearchOutlinedIcon />}
              className="w-full md:w-max !px-10 !py-3 rounded-lg !ml-auto"
            >
              Recherche
            </Button>
          </Box>
        </Box>

        {/* Pass the fetched data to the DebtTableComponant */}
        <DebtTableComponant data={data} />
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
export default DebtPage;
