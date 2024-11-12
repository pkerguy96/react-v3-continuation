import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import addGlobal from "../hooks/addGlobal";
import { StockApiClient } from "../services/StockService";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import { useNavigate } from "react-router";

interface FormData {
  bar_code?: string;
  product_name: string;
  product_family: string;
  product_nature?: string;
  min_stock?: number;
}

const AddStockForm = () => {
  const { showSnackbar } = useSnackbarStore();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      bar_code: "",
      product_name: "",
      product_family: "none",
      product_nature: "",
      min_stock: 0,
    },
  });
  const addMutation = addGlobal({} as FormData, StockApiClient, undefined);
  const onSubmit = async (data) => {
    try {
      await addMutation.mutateAsync(data, {
        onSuccess: (data: { message: string }) => {
          navigate("/Stock");
          showSnackbar(data.message, "success");
        },
      });
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Une erreur s'est produite";
      showSnackbar(errorMessage, "error");
    }
  };
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
          <span>Créer un produit</span>
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
              Code à barres
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="bar_code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="bar_code"
                    label="Code à barres"
                    error={!!errors.bar_code}
                    helperText={errors.bar_code?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Désignation du produit
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="product_name"
                control={control}
                rules={{ required: "Le champ Désignation est requis." }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="product_name"
                    label="désignation du produit"
                    error={!!errors.product_name}
                    helperText={errors.product_name?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="product_family" className="w-full md:w-[160px]">
              famille de produit
            </label>
            <FormControl className="w-full md:flex-1">
              <InputLabel id="demo-select-small-label">
                famille de produit
              </InputLabel>
              <Controller
                name="product_family"
                control={control}
                rules={{ required: "Le champ  famille de produit est requis." }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="product_family"
                    error={!!errors.product_family}
                  >
                    <MenuItem value="none">
                      <em>Aucune</em>
                    </MenuItem>
                    <MenuItem value="Médical">Médical</MenuItem>
                    <MenuItem value="Paramédical">Paramédical</MenuItem>
                    <MenuItem value="Ostéosynthèse">Ostéosynthèse</MenuItem>
                    <MenuItem value="Instruments">Instruments</MenuItem>
                    <MenuItem value="Autres">Autres</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Nature du produit
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="product_nature"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="product_nature"
                    label="Nature du produit"
                    error={!!errors.product_nature}
                    helperText={errors.product_nature?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Min stock
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="min_stock"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    id="min_stock"
                    label="Nature du produit"
                    error={!!errors.min_stock}
                    helperText={errors.min_stock?.message}
                  />
                )}
              />
            </FormControl>
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
      </Box>
    </Paper>
  );
};

export default AddStockForm;
