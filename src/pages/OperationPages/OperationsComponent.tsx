import {
  Box,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  TextField,
  IconButton,
} from "@mui/material";

import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useEffect, useMemo, useRef, useState } from "react";
import getGlobalById from "../../hooks/getGlobalById";
import { XrayData, PatientXrayApiClient } from "../../services/XrayService";
import { CACHE_KEY_OperationPref } from "../../constants";
import getGlobal from "../../hooks/getGlobal";
import {
  OperationPrefApiClient,
  OperationPreference,
} from "../../services/SettingsService";
import { APIClient } from "../../services/Http";
import LoadingSpinner from "../../components/LoadingSpinner";

interface RowData {
  id?: string | number;
  xray_type: string;
  price: number;
}
const OperationsComponent = ({ operation_id }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  //gpt
  const [isInitialized, setIsInitialized] = useState(false);
  const { control, setValue, getValues } = useForm<{
    rows: RowData[];
  }>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });
  const rows = useWatch({ control, name: "rows" });
  const {
    data: Operationprefs,

    isLoading: isloading2,
  } = getGlobal({}, CACHE_KEY_OperationPref, OperationPrefApiClient, {
    staleTime: Infinity, // Data will never be considered stale
    cacheTime: Infinity, // Data will remain in the cache indefinitely
  });

  const { data: xrayData, isLoading } = operation_id
    ? getGlobalById(
        {} as XrayData,
        ["CACHE_KEY_Xray", operation_id.toString()],
        PatientXrayApiClient,
        undefined,
        parseInt(operation_id)
      )
    : { data: [], isLoading: false };

  const handleAddRow = () => {
    append({ xray_type: "", price: 0 });
  };

  useEffect(() => {
    const total = rows?.reduce((sum, row) => sum + Number(row.price || 0), 0);
    setTotalPrice(total);
  }, [rows]);
  const hasSetInitialRows = useRef(false);
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
  console.log("hello");

  /*  useEffect(() => {
    const combinedRows = [
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

    if (combinedRows.length > 0) {
      setValue("rows", combinedRows);
    }

    console.log("Combined Rows After Transformation:", combinedRows);
  }, []); */
  if (isLoading || isloading2) return <LoadingSpinner />;

  return (
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
                            id={`xray_type_${index}`}
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
                            id={`price_${index}`}
                            size="small"
                            type="number"
                          />
                        )}
                      />
                    </FormControl>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton color="error" onClick={() => remove(index)}>
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
        <h2 className="font-semibold text-base text-start">Montant Total</h2>
        <span className="font-semibold text-sm text-end">{totalPrice} MAD</span>
      </Box>
    </Box>
  );
};

export default OperationsComponent;
