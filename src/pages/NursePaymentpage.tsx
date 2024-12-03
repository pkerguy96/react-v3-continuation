import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CACHE_KEY_Operation, CACHE_KEY_OperationDetail } from "../constants";
import getGlobalById from "../hooks/getGlobalById";
import updateItem from "../hooks/updateItem";
import operationDetailsApiClient, {
  deleteoperationdetailsApiclient,
  OperationDetail,
} from "../services/OperationDetailsService";
import operationApiClient, { Operation } from "../services/OperationService";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LoadingSpinner from "../components/LoadingSpinner";
import deleteItem from "../hooks/deleteItem";

import { useSearchParams } from "react-router-dom";
interface FormData {
  amount_paid: number;
  // Add other form fields here
}
const NursePaymentpage = () => {
  const { handleSubmit, control, setValue } = useForm<FormData>();
  const [fetchedoperations, setFetchedOperations] = useState<any[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const addMutation = updateItem<Operation>(
    {} as Operation,
    operationApiClient
  );
  const { showSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();
  // Extract query parameter target_id
  const [searchParams] = useSearchParams();
  const target_id = searchParams.get("target_id"); // Get target_id from query string

  if (!target_id) return <div>No operation selected</div>;
  const operationID = target_id;
  const { data, isLoading, refetch } = getGlobalById(
    {} as OperationDetail,
    [CACHE_KEY_OperationDetail, target_id.toString()],
    operationDetailsApiClient,
    undefined,
    parseInt(target_id)
  );

  useEffect(() => {
    if (data && data.payments) {
      setFetchedOperations(data.payments);
      const operationDetailsCost = data.operation_details.reduce(
        (total: number, detail: any) => total + Number(detail.price),
        0
      );

      const xraysCost = data.xrays.reduce(
        (total: number, xray: any) => total + Number(xray.price),
        0
      );

      setTotalCost(operationDetailsCost + xraysCost);
    }
  }, [data]);
  const onSubmit = async (data: FormData) => {
    if (data) {
      if (totalpaid + Number(data.amount_paid) > totalCost) {
        showSnackbar("Le paiement total dépasse le coût total.");
        return;
      }

      await addMutation
        .mutateAsync(
          //@ts-ignore
          { data, id: operationID },
          {
            onSuccess(data: any) {
              queryClient.invalidateQueries([
                CACHE_KEY_OperationDetail,
                operationID.toString(),
              ]);
              queryClient.invalidateQueries(CACHE_KEY_Operation);

              setFetchedOperations((prevData) => [
                ...prevData,
                {
                  amount_paid: data.amount_paid,
                  date: data.date,
                  id: data.id,
                },
              ]);
              //@ts-ignore
              setValue("amount_paid", "");
            },

            onError(error) {
              console.log(error);
            },
          }
        )
        .catch((error) => {
          console.error("onError", error);
        });
    }
  };

  const totalpaid = fetchedoperations.reduce(
    (total, payment) => total + parseFloat(payment.amount_paid || "0"),
    0
  );

  const outstandingAmount = totalCost - totalpaid;

  const deletePayment = async (id: number) => {
    try {
      const deletionSuccessful = await deleteItem(
        id,
        deleteoperationdetailsApiclient
      );

      if (deletionSuccessful) {
        refetch();
        /* queryClient.invalidateQueries([CACHE_KEY_OperationDetail, id]); */
        showSnackbar("La suppression du paiement a réussi", "success");
      } else {
        showSnackbar("La suppression du paiement a échoué", "error");
      }
    } catch (error) {
      showSnackbar(
        `Une erreur s'est produite lors de la suppression du paiement :${error}`,
        "error"
      );
      console.log(error);
    }
  };
  if (isLoading) return <LoadingSpinner />;
  return (
    <Paper className="p-4">
      <Box className="w-full flex flex-col gap-2">
        <Box className="flex justify-center  text-lg  text-gray-400 uppercase">
          <span>Payment validation</span>
        </Box>
        <Divider
          orientation="horizontal"
          flexItem
          className="gap-2 mb-4"
          variant="middle"
        />

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
        >
          <Box className="flex flex-col gap-6 p-6">
            <Box className="flex flex-col gap-6 md:justify-between md:flex-row">
              <h3 className="text-2xl font-semibold leading-none tracking-tight text-red-500">
                Détails du paiement des patients
              </h3>
              <h3 className="text-2xl font-semibold leading-none tracking-tight text-gray-500">
                {data?.patient_name}
              </h3>
            </Box>

            <Box className="flex flex-col gap-10">
              <Box className="flex flex-col gap-2">
                <Box className="flex items-center justify-between">
                  <span className="font-semibold text-base text-start">
                    Opération
                  </span>
                  <span className="font-semibold text-base text-end">Prix</span>
                </Box>
                <Box className="flex flex-col gap-1">
                  {data?.operation_details?.map((detail: any, i: number) => (
                    <Box className="flex items-center justify-between" key={i}>
                      <span className="text-gray-500 text-base text-start">
                        {detail.operation_type || "No Operation Name"}
                      </span>
                      <span className="text-gray-500 text-sm text-end">
                        {detail.price} MAD
                      </span>
                    </Box>
                  ))}
                  {data?.xrays?.map((xray: any, i: number) => (
                    <Box
                      className="flex items-center justify-between"
                      key={`xray-${i}`}
                    >
                      <span className="text-gray-500 text-base text-start">
                        {xray.xray_type.join(", ") || "No X-Ray Type"}
                      </span>
                      <span className="text-gray-500 text-sm text-end">
                        {xray.price} MAD
                      </span>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box className="flex flex-col gap-2">
                <Box className="flex justify-between items-center">
                  <h2 className="font-semibold text-base text-start w-1/3">
                    Paiements
                  </h2>
                  <h2 className="font-semibold text-base text-center w-1/3">
                    Prix
                  </h2>
                  <h2 className="font-semibold text-base text-center w-1/3">
                    Date
                  </h2>
                  <h2 className="font-semibold text-base text-center w-[160px]">
                    Action
                  </h2>
                </Box>
                <Box className="flex flex-col gap-1">
                  {fetchedoperations?.map((payment: any, j: number) => {
                    return (
                      <Box
                        className="flex items-center justify-between"
                        key={j}
                      >
                        <span className="text-gray-500 text-base text-start w-1/3">
                          Payment {j + 1}
                        </span>
                        <span className="text-gray-500 text-sm text-center w-1/3">
                          {payment.amount_paid === null
                            ? "0.00"
                            : payment.amount_paid}
                          MAD
                        </span>
                        <span className="text-gray-500 text-sm text-center w-1/3">
                          {payment.date}
                        </span>
                        <div className="text-center w-[160px]">
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => deletePayment(payment.id)}
                          >
                            <DeleteOutlineOutlinedIcon />
                          </IconButton>
                        </div>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              {outstandingAmount && (
                <Box className="flex items-center flex-wrap gap-2">
                  <Controller
                    //@ts-ignore
                    defaultValue=""
                    name="amount_paid"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        className="flex-1"
                        id="amount_paid"
                        label="Montant"
                        variant="outlined"
                        size="small"
                        type="number"
                        placeholder="Enter Montant" // Add a placeholder
                        {...field}
                      />
                    )}
                  />
                  <Button variant="outlined" className="" type="submit">
                    {addMutation.isLoading ? "..." : "Ajouter"}
                  </Button>
                </Box>
              )}
              <Box className="flex justify-between items-center">
                <h2 className="font-semibold text-base text-start">
                  Montant restant
                </h2>
                <span className="font-semibold text-sm text-end text-red-500">{`${outstandingAmount.toFixed(
                  2
                )} MAD `}</span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default NursePaymentpage;
