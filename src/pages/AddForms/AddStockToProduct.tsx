import {
  Paper,
  Box,
  Divider,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Autocomplete,
  Chip,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import getGlobal from "../../hooks/getGlobal";
import {
  SupplierNamesApiClient,
  SupplierProductApiClient,
  SupplierTinyData,
} from "../../services/SupplierService";
import {
  CACHE_KEY_Products,
  CACHE_KEY_StockEntry,
  CACHE_KEY_StockEntryUpdate,
  CACHE_KEY_SupplierTinyData,
} from "../../constants";
import LoadingSpinner from "../../components/LoadingSpinner";
import addGlobal from "../../hooks/addGlobal";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import getGlobalById from "../../hooks/getGlobalById";
import updateItem from "../../hooks/updateItem";
import { AxiosError } from "axios";

interface ProductSupplier {
  patient_id: string;
  supplier_id: string; // ID of the supplier
  product_id: number; // ID of the product
  quantity: number; // Quantity purchased
  buy_price: number;
  sell_price: number;
  expiry_date?: string;
  supplier_name?: string;
  invoice?: string;
}
const AddStockToProduct = () => {
  const queryParams = new URLSearchParams(location.search);
  const product_id = queryParams.get("id");
  const StockOperationId = queryParams.get("stockoperation");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ProductSupplier>({
    defaultValues: {
      supplier_id: "", // Ensure supplier_id has a valid default
      quantity: 0,
      sell_price: 0,
      buy_price: 0,
      expiry_date: new Date().toISOString().split("T")[0],
      invoice: "",
    },
  });
  const updateMutation = updateItem(
    {} as ProductSupplier,
    SupplierProductApiClient
  );
  const { data, isLoading } = getGlobal(
    {} as SupplierTinyData,
    CACHE_KEY_SupplierTinyData,
    SupplierNamesApiClient,
    undefined
  );
  let SupplierProductData: ProductSupplier | undefined;

  if (StockOperationId) {
    const queryResult = getGlobalById(
      {} as ProductSupplier,
      [CACHE_KEY_StockEntryUpdate[0], StockOperationId],
      SupplierProductApiClient,
      undefined,
      parseInt(StockOperationId)
    );

    SupplierProductData = queryResult.data;
  }
  const isAddMode = !SupplierProductData;
  const addMutation = addGlobal({}, SupplierProductApiClient);
  const onSubmit = async (data: ProductSupplier) => {
    const formdata = {
      product_id: parseInt(product_id),
      ...data,
    };

    try {
      if (!StockOperationId) {
        await addMutation.mutateAsync(formdata, {
          onSuccess: () => {
            showSnackbar("Stock mis à jour avec succès", "success");
            navigate("/Stock");
            queryClient.invalidateQueries(CACHE_KEY_Products);
            queryClient.invalidateQueries(CACHE_KEY_StockEntry);
          },
        });
      } else {
        updateUser({ data, StockOperationId });
        queryClient.invalidateQueries(CACHE_KEY_Products);
        queryClient.invalidateQueries(CACHE_KEY_StockEntry);
      }
    } catch (error) {}
  };

  const updateUser = async (updateData: any) => {
    const { data, StockOperationId } = updateData;
    if (!StockOperationId) {
      showSnackbar("L'identifiant d'operation est manquant.", "error");
      return;
    }

    await updateMutation.mutateAsync(
      { data, id: parseInt(StockOperationId) }, // Ensure ID is included in the API call
      {
        onSuccess: () => {
          showSnackbar("Fournisseur modifié avec succès.", "success");
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
      Object.keys(SupplierProductData ?? {}).forEach((key) =>
        setValue(key as keyof ProductSupplier, SupplierProductData[key] ?? "")
      );
    }
  }, [StockOperationId, SupplierProductData]);
  if (isLoading) return <LoadingSpinner />;
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
          <span>Ajouter du stock</span>
        </Box>
        <Divider
          orientation="horizontal"
          flexItem
          className="gap-2 mb-4"
          variant="middle"
        />

        <Box className="w-full flex flex-col gap-4">
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="Fournisseur" className="w-full md:w-[160px]">
              Fournisseur
            </label> 
            <FormControl className="w-full md:flex-1">
              <InputLabel id="demo-select-small-label">Fournisseur</InputLabel>
              <Controller
                name="supplier_id" // Use supplier_id instead of supplier_name
                control={control}
                rules={{ required: "Le champ fournisseur est requis." }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Fournisseur"
                    error={!!errors.supplier_id}
                  >
                    {data && data.length > 0 ? (
                      data.map((supplier: SupplierTinyData) => (
                        <MenuItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="none" disabled>
                        <em>Aucun fournisseur disponible</em>
                      </MenuItem>
                    )}
                  </Select>
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="expiry_date" className="w-full md:w-[160px]">
              Date de péremption
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="expiry_date"
                control={control}
                rules={{ required: "Le champ date est requis." }}
                render={({ field }) => (
                  <TextField
                    type="date"
                    {...field}
                    id="expiry_date"
                    error={!!errors.expiry_date}
                    helperText={errors.expiry_date?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="quantity" className="w-full md:w-[160px]">
              Quantité entrant
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="quantity"
                    label="Quantité"
                    type="number"
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="price" className="w-full md:w-[160px]">
              Prix unitaire d'achat
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="buy_price"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
                    {...field}
                    id="buy_price"
                    label="Prix d'achat"
                    error={!!errors.buy_price}
                    helperText={errors.buy_price?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="price" className="w-full md:w-[160px]">
              Prix unitaire de vente
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="sell_price"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
                    {...field}
                    id="sell_price"
                    label="Prix de vente"
                    error={!!errors.sell_price}
                    helperText={errors.sell_price?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="price" className="w-full md:w-[160px]">
              Numéro de facture
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="invoice"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    {...field}
                    id="invoice"
                    label="Facture"
                    error={!!errors.invoice}
                    helperText={errors.invoice?.message}
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

export default AddStockToProduct;
