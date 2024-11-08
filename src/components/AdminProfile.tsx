//@ts-nocheck
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Input,
  Paper,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import addGlobal from "../hooks/addGlobal";
import { AuthProfileServiceClient } from "../services/AuthService";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import { AxiosError } from "axios";
export interface Props {
  name: string;
  email: string;
  picture: File | null;
}

const AdminProfile = () => {
  const { showSnackbar } = useSnackbarStore();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const addmutation = addGlobal({} as Props, AuthProfileServiceClient, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const storedUserData = localStorage.getItem("user_login");
  const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
  const userProfilePicture = parsedUserData
    ? parsedUserData.profile || null
    : null;
  const userData = parsedUserData.user;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Props>({
    defaultValues: {
      name: userData?.nom || "",
      email: userData?.email || "",
    },
  });
  const customErrorMessages = {
    name: {
      required: "Le champ Nom est requis.",
    },
    email: {
      required: "Le champ Email est requis.",
    },
  };
  const onSubmit: SubmitHandler<Props> = async (data) => {
    try {
      var form = new FormData();
      form.append("name", data.name);
      form.append("email", data.email);
      if (data.picture) {
        form.append("picture", data.picture);
      }
      await addmutation.mutateAsync(form, {
        onSuccess(data: any) {
          const user = JSON.parse(localStorage.getItem("user_login") || "{}");
          user.user = data.data;
          user.profile = data.profile;
          localStorage.setItem("user_login", JSON.stringify(user));
          showSnackbar("Utilisateur modifié avec succès", "success");
        },
        onError: (error: any) => {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message
              : error.message;
          showSnackbar(`Oops.. ${message}`, "error");
        },
      });
    } catch (error) {
      showSnackbar(`Oops.. ${error}`, "error");
    }
  };
  return (
    <Paper className="p-4" elevation={12}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="w-full flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box className="w-full flex flex-col gap-2 items-center justify-center	">
          <Avatar
            alt="Remy Sharp"
            src={
              imageFile ? URL.createObjectURL(imageFile) : userProfilePicture
            }
            sx={{ width: 120, height: 120 }}
          />
          <Button variant="contained" component="label">
            Importer l'image
            <Controller
              control={control}
              name={"picture"}
              render={({ field: { value, onChange, ...field } }) => {
                return (
                  <Input
                    {...field}
                    value={value?.fileName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(event.target.files?.[0]);

                      setImageFile(event.target.files[0]);
                    }}
                    type="file"
                    inputProps={{
                      accept: "image/*",
                    }}
                    id="picture"
                    style={{ display: "none" }}
                  />
                );
              }}
            />
          </Button>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="name" className="w-full md:w-[160px]">
            Nom:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              name="name"
              control={control}
              rules={{ required: customErrorMessages.name.required }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="name"
                  label="name"
                  size="small"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="name" className="w-full md:w-[160px]">
            Email:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              name="email"
              control={control}
              rules={{ required: customErrorMessages.email.required }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="email"
                  label="email"
                  size="small"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </FormControl>
        </Box>
        <Box sx={{ marginTop: 5 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 16 }}
            fullWidth={true}
          >
            Enregistrer
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AdminProfile;
