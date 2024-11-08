import { Box, Button, TextField } from "@mui/material";
import lettersvg from "/letter.jpg";
import { useRef } from "react";

import { AxiosError } from "axios";
import addGlobal from "../hooks/addGlobal";
import { ResetPasswordServiceClient, UserMail } from "../services/AuthService";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
const ForgotPassword = () => {
  const addmutation = addGlobal({} as UserMail, ResetPasswordServiceClient);
  const { showSnackbar } = useSnackbarStore();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const email = emailInputRef?.current!.value;
      if (!email) {
        alert("E-mail est requis");
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("Format d'email invalide");

        return;
      }
      addmutation;
      await addmutation.mutateAsync(
        { email: email },
        {
          onSuccess: () => {
            showSnackbar(
              "Veuillez vérifier votre courrier électronique pour le courrier de récupération",
              "success"
            );
          },
          onError: (error: any) => {
            const message =
              error instanceof AxiosError
                ? error.response?.data?.message
                : error.message;
            showSnackbar(message, "error");
          },
        }
      );
    } catch (error: any) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;
      showSnackbar(message, "error");
    }
  };
  return (
    <Box className="w-full   flex flex-col md:flex p-4 gap-2 justify-center items-center	">
      <h1 className="text-base font-medium">Mot de passe oublié?</h1>
      <h3 className="text-base font-light">
        Entrez votre e-mail enregistré ci-dessous pour recevoir les instructions
        de réinitialisation du mot de passe
      </h3>
      <Box className="w-full flex justify-center items-center">
        <img src={lettersvg} className="h-auto  max-w-sm" />
      </Box>
      <Box
        className="flex flex-col  w-full min-w-80 gap-4"
        component="form"
        onSubmit={handleSubmit}
      >
        <Box className="flex flex-col gap-4 p-2 justify-center items-center">
          <h3 className="font-semibold">Email</h3>
          <TextField
            inputRef={emailInputRef}
            id="email"
            name="email"
            label="Votre adresse e-mail"
            size="small"
            variant="outlined"
            className="w-80"
          />
          <Button type="submit" className="w-80" variant="contained">
            Continuer
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
