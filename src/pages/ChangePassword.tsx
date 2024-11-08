import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  TextField,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import lettersvg from "/letter.jpg";
import React, { useRef } from "react";
import { useParams } from "react-router";
import addGlobal from "../hooks/addGlobal";
import {
  ChangePasswordServiceClient,
  UserCreds,
} from "../services/AuthService";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import { AxiosError } from "axios";

const ChangePassword = () => {
  const addmutation = addGlobal({} as UserCreds, ChangePasswordServiceClient);
  const { showSnackbar } = useSnackbarStore();
  const [showPassword, setShowPassword] = React.useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const { token } = useParams();

  if (!token) return;

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValue = emailRef?.current?.value;
    const passwordValue = passwordRef?.current?.value;
    const passwordConfirmValue = passwordConfirmRef?.current?.value;
    if (passwordValue !== passwordConfirmValue) {
      alert("Les mots de passe ne correspondent pas. Veuillez réessayer.");
      return;
    }
    if (!emailValue) {
      alert("Veuillez entrer un email");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      alert("Format d'email invalide");

      return;
    }
    try {
      if (emailValue && passwordValue) {
        await addmutation.mutateAsync(
          { email: emailValue, password: passwordValue, token: token },
          {
            onSuccess: () => {
              showSnackbar("Mot de passe modifié avec succès.", "success");
            },
            onError: () => {
              showSnackbar("Oups, quelque chose s'est mal passé", "error");
            },
          }
        );
      }
    } catch (error: any) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;
      showSnackbar(message, "error");
    }
  };
  return (
    <Box className="w-full  bg-white flex flex-col md:flex p-4 gap-2 justify-center items-center	">
      <h1 className="text-base font-bold">Nouveau mot de passe</h1>
      <h3 className="text-base font-light">
        Veuillez créer un nouveau mot de passe que vous n'utilisez sur aucun
        autre site
      </h3>
      <Box className="w-full flex justify-center items-center">
        <img src={lettersvg} className="h-auto  max-w-sm" />
      </Box>

      <Box
        className="flex flex-col  w-full min-w-80 gap-4"
        component="form"
        onSubmit={HandleSubmit}
      >
        <Box className="flex flex-col gap-4 p-2 justify-center items-center">
          <TextField
            inputRef={emailRef}
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
            style={{ maxWidth: "260px" }}
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Mot de passe
            </InputLabel>
            <OutlinedInput
              inputRef={passwordRef}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="ConfirmPassword">
              Confirmez le mot de passe
            </InputLabel>
            <OutlinedInput
              inputRef={passwordConfirmRef}
              id="ConfirmPassword"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="ConfirmPassword"
            />
          </FormControl>
          <Button type="submit" className="w-80" variant="contained">
            Continuer
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePassword;
