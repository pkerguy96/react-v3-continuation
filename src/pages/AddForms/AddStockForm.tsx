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
import addGlobal from "../../hooks/addGlobal";
import { StockApiClient } from "../../services/StockService";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { useLocation, useNavigate } from "react-router";
import getGlobalById from "../../hooks/getGlobalById";
import { CACHE_KEY_Products } from "../../constants";
import { useEffect } from "react";
import updateItem from "../../hooks/updateItem";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

interface FormData {
  bar_code?: string;
  product_name: string;
  product_family: string;
  product_nature?: string;
  min_stock?: number;
  productData?: string;
  qte?: number;
}
interface UpdateData {
  id: string;
  data: FormData;
}

const AddStockForm = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbarStore();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const addMutation = addGlobal({} as FormData, StockApiClient, undefined);
  const updateMutation = updateItem({}, StockApiClient);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      bar_code: "",
      product_name: "",
      product_family: "Aucune",
      product_nature: "",
      min_stock: 0,
      qte: 0,
    },
  });

  let productData: FormData | undefined;
  if (id) {
    const queryResult = getGlobalById(
      {} as FormData,
      [CACHE_KEY_Products[0], id],
      StockApiClient,
      undefined,
      parseInt(id)
    );
    productData = queryResult.data;
  }
  const isAddMode = !productData;
  const onSubmit = async (data: FormData) => {
    try {
      if (!id) {
        await addMutation.mutateAsync(data, {
          onSuccess: (data: { message: string }) => {
            navigate("/Stock");
            showSnackbar(data.message, "success");
            queryClient.invalidateQueries(CACHE_KEY_Products);
          },
        });
      } else {
        await updateProduct({ data, id });
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Une erreur s'est produite";
      showSnackbar(errorMessage, "error");
    }
  };
  const updateProduct = async (updateData: UpdateData) => {
    const { data, id } = updateData;
    if (!id) {
      showSnackbar("L'identifiant du fournisseur est manquant.", "error");
      return;
    }

    await updateMutation.mutateAsync(
      { data, id: parseInt(id) },
      {
        onSuccess: () => {
          showSnackbar("Fournisseur modifié avec succès.", "success");
          navigate("/Stock");
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
  useEffect(() => {
    if (!isAddMode) {
      Object.keys(productData ?? {}).forEach((key) =>
        setValue(key as keyof FormData, productData[key] ?? "")
      );
    }
  }, [id, productData]);
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
                    <MenuItem value="Aucune">
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
                    label="Stock minimum"
                    error={!!errors.min_stock}
                    helperText={errors.min_stock?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Quantité en stock
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="qte"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    id="qte"
                    label="Quantité"
                    error={!!errors.qte}
                    helperText={errors.qte?.message}
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
