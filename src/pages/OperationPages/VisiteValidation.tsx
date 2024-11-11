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
import { PatientXrayApiClient, XrayData } from "../../services/XrayService";
import { useLocation } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner";
import { CACHE_KEY_Xray } from "../../constants";
interface RowData {
  id?: string | number;
  xray_type: string;
  price: number;
}
const VisiteValidation = ({ onNext }) => {
  const { handleSubmit, control, setValue } = useForm<{ rows: RowData[] }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const patient_id = queryParams.get("id");
  const { data, isLoading } = getGlobalById(
    {} as XrayData,
    [CACHE_KEY_Xray, patient_id.toString()],
    PatientXrayApiClient,
    undefined,
    parseInt(patient_id)
  );
  const [totalPrice, setTotalPrice] = useState(0);
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
  const onSubmit = (data: { rows: RowData[] }) => {
    console.log(data);
  };
  return (
    <Paper className="!p-6 w-full flex flex-col gap-4">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="flex gap-4 flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
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
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box className="flex justify-between items-center">
          <h2 className="font-semibold text-base text-start">Montant Total</h2>
          <span className="font-semibold text-sm text-end">
            {totalPrice} MAD
          </span>
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
    </Paper>
  );
};

export default VisiteValidation;
