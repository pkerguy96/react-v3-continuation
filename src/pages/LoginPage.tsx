import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router";

import { FormHelperText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import addGlobal from "../hooks/addGlobal";
import { AuthData, AuthServiceClient } from "../services/AuthService";
import useUserRoles from "../zustand/UseRoles";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/pkerguy96">
        ELKOR
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface UserData {
  email: string;
  password: string;
}

export default function SignIn() {
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [error, setError] = useState({ isError: false, message: "" });
  const [userdata, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const { setRoles } = useUserRoles();
  const addmutation = addGlobal({} as AuthData, AuthServiceClient);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors = {
      email: !userdata.email.trim(),
      password: !userdata.password.trim(),
    };
    setErrors(newErrors);
    await addmutation.mutateAsync(userdata, {
      onSuccess: (data: any) => {
        setRoles(data.data.roles);

        localStorage.setItem("user_login", JSON.stringify(data.data));

        navigate("/dashboard");
      },
      onError: (error: any) => {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message
            : error.message;
        setError({ isError: true, message });
      },
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <CssBaseline />
      <Box className=" flex flex-col justify-center items-center min-h-[100dvh]">
        {/*   <img src="/centre-jadid.jpeg" /> */}
        <Box className="p-4 bg-white rounded-lg">
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              error={errors.email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Address Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              value={userdata.email}
            />

            {errors.email && (
              <FormHelperText id="email-error-text" style={{ color: "red" }}>
                Le champ adresse email est obligatoire.
              </FormHelperText>
            )}
            <TextField
              error={errors.password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={userdata.password}
            />
            {errors.password && (
              <FormHelperText id="password-text" style={{ color: "red" }}>
                Le champ mot de pass est obligatoire.
              </FormHelperText>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#528F8A",
                "&:hover": {
                  backgroundColor: "#3E7A75", // Darker shade for hover
                },
              }}
            >
              Sign In
            </Button>
            {error.isError && (
              <Alert variant="filled" severity="error">
                {error.message}
              </Alert>
            )}
            <Grid container>
              <Grid item xs>
                <RouterLink to="réinitialisation-mot-de-passe">
                  Mot de passe oublié ?
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
