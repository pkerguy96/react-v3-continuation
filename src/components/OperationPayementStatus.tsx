//@ts-nocheck
import { Box, IconButton, TextField, Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import updateItem from "../hooks/updateItem";
import operationApiClient, { Operation } from "../services/OperationService";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import { useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_Operation, CACHE_KEY_OperationDetail } from "../constants";
import operationDetailsApiClient, {
  OperationDetail,
  deleteoperationdetailsApiclient,
} from "../services/OperationDetailsService";
import getGlobalById from "../hooks/getGlobalById";
import LoadingSpinner from "./LoadingSpinner";
import deleteItem from "../hooks/deleteItem";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
const OperationPayementStatus = () => {
  const { handleSubmit, control, setValue } = useForm<FormData>();
  /*   const { operationid } = useParams(); */

  const operationid = 1;
  const [fetchedoperations, setFetchedOperations] = useState<any[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const addMutation = updateItem<Operation>(
    {} as Operation,
    operationApiClient
  );
  const { showSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  if (!operationid) return null;

  const { data, isLoading, refetch } = getGlobalById(
    {} as OperationDetail,
    [CACHE_KEY_OperationDetail, operationid.toString()],
    operationDetailsApiClient,
    undefined,
    parseInt(operationid)
  );

  useEffect(() => {
    if (data && data.payments) {
      setFetchedOperations(data.payments);
      const cost = data.operation_details.reduce(
        (total: any, fetchedoperations: any) =>
          total + Number(fetchedoperations.price),
        0
      );
      setTotalCost(cost);
    }
  }, [data]);

  if (isLoading) return <LoadingSpinner />;
  const onSubmit = async (data: any) => {
    if (data) {
      if (totalpaid + Number(data.amount_paid) > totalCost) {
        showSnackbar("Total payment exceeds total cost.");
        return;
      }

      await addMutation
        .mutateAsync(
          //@ts-ignore
          { data, id: operationid },
          {
            onSuccess(data: any) {
              queryClient.invalidateQueries([
                CACHE_KEY_OperationDetail,
                operationid.toString(),
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
    (total, payment) => total + Number(payment.amount_paid),
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
  return (
    <Paper>
      <Box className="p-4 w-full flex gap-4 flex-col">
        <Box className="flex  flex-col md:flex-row md:justify-between">
          <p className="flex font-bold  mx-auto  text-md md:text-2xl md:mx-0 text-red-400">
            Avertissement de paiement
          </p>
          <p className="flex font-bold text-sm mx-auto  md:text-2xl md:mx-0 text-red-400">
            Paiement incomplet
          </p>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full"
        >
          <Box className="flex flex-col gap-6 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Détails du paiement de patient
            </h3>
            <Box className="flex flex-col gap-4">
              <Box className="flex flex-col gap-2">
                <Box className="flex items-center justify-between">
                  <span className="font-semibold text-base text-start">
                    Opération
                  </span>
                  <span className="font-semibold text-base text-end ">
                    Prix
                  </span>
                </Box>
                <Box className="flex flex-col gap-1">
                  {data?.operation_details?.map((detail: any, i: number) => (
                    <Box className="flex items-center justify-between" key={i}>
                      <span className="text-gray-500 text-base text-start">
                        {detail.name || "No Operation Name"}
                      </span>
                      <span className="text-gray-500 text-sm text-end ">
                        {detail.price} MAD
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
                  <h2 className="font-semibold text-base text-end w-1/3">
                    Date
                  </h2>
                  <h2 className="font-semibold text-base text-end w-1/3">
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
                        <span className="text-gray-500 text-sm text-center  w-1/3">
                          {payment.amount_paid === null
                            ? "0.00"
                            : payment.amount_paid}{" "}
                          MAD
                        </span>
                        <span className="text-gray-500 text-sm text-end md:text-center w-1/3">
                          {payment.date}
                        </span>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => deletePayment(payment.id)}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              {outstandingAmount !== 0 && (
                <Box className="flex items-center flex-wrap gap-2">
                  <Controller
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
                <span className="font-semibold text-sm text-end">{`${outstandingAmount.toFixed(
                  2
                )} MAD `}</span>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="flex justify-between flex-row mt-5 content-center ml-auto">
          <Button variant="contained" onClick={() => navigate("/dashboard")}>
            Terminer
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default OperationPayementStatus;
