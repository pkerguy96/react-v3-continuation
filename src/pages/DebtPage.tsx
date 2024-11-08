import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Paper,
  TextField,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DebtTableComponant from "../components/DebtTableComponant";
import addGlobal from "../hooks/addGlobal";
import {
  OperationDataDebt,
  PatientsDebtKpiClient,
} from "../services/KpisService";
import useUserRoles from "../zustand/UseRoles";
interface SentDebtData {
  date: string;
  date2: string;
}
const DebtPage = () => {
  const [data, setData] = useState<OperationDataDebt[]>([]);
  const { can } = useUserRoles();
  /*   const addMutation = addGlobal(
    {} as SentDebtData,
    PatientsDebtKpiClient,
    undefined
  ); */
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();
  /*   const onSubmit = async (data: any) => {
    setData([]);

    await addMutation.mutateAsync(
      { date: data.date, date2: data.date2 },
      {
        onSuccess: (response: any) => {
          console.log(data);
          const transformedData = response?.data?.map((item: any) => ({
            name: item.name,
            date: item.date,
            operation_type: item.operation_type.join(", "),
            total_cost: `${item.total_cost} MAD`,
            total_amount_paid: `${item.total_amount_paid} MAD`,
            amount_due: `${item.amount_due} MAD`,
          }));
          setData(transformedData);
        },
      }
    );
  }; */
  //TODO also here
  const dataPlaceHolder: [] = [];
  return (
    <Paper className="p-4">
      <Box
        component="form"
        className="w-full flex flex-col gap-4"
        autoComplete="off"
        /* onSubmit={handleSubmit(onSubmit)} */
      >
        <Box className="flex justify-center  text-lg  text-gray-400 uppercase">
          <span>Page des créances</span>
        </Box>
        <Divider
          orientation="horizontal"
          flexItem
          className="gap-2 mb-4"
          variant="middle"
        />

        <Box className="w-full flex  flex-col md:flex-row gap-4 md:items-center">
          <Box className="flex  md:flex-row items-center gap-4">
            <label htmlFor="date">Start date:</label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="date"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <TextField required type="date" {...field} id="date" />
                )}
              />
            </FormControl>
          </Box>
          <Box className="flex flex-row items-center gap-4">
            <label htmlFor="date2">End date:</label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="date2"
                defaultValue=""
                control={control}
                rules={{
                  validate: (value) => {
                    console.log("value", value);

                    const startDate = new Date(getValues("date"));
                    const currentDate = new Date(value);
                    return (
                      startDate <= currentDate ||
                      "La date ne peut pas être dans le futur."
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
          <Box className="flex md:ml-auto">
            <Button
              size="small"
              type="submit"
              variant="outlined"
              startIcon={<SearchOutlinedIcon />}
              className="w-full md:w-max !px-10 !py-3 rounded-lg !ml-auto "
            >
              Search
            </Button>
          </Box>
        </Box>

        <DebtTableComponant data={dataPlaceHolder} />
      </Box>
    </Paper>
  );
};

export default DebtPage;
