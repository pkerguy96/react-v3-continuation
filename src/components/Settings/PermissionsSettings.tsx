import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import getGlobal from "../../hooks/getGlobal";
import {
  AddRoles,
  AddRolesApiClient,
  NurseRole,
  NurseRoleResponse,
  Role,
  RoleApiClient,
  RoleNursesClient,
  RoleResponse,
  getRolespermissionsApiClient,
} from "../../services/RolesService";
import {
  CACHE_KEY_NurseRole,
  CACHE_KEY_Role,
  PermissionListcreance,
  PermissionListdebt,
  PermissionListdocument,
  PermissionListHistoriqueEnter,
  PermissionListHistoriqueSortie,
  PermissionListordonance,
  PermissionListpatient,
  PermissionListProduct,
  PermissionListStock,
  PermissionListSupplier,
} from "../../constants";
import LoadingSpinner from "../LoadingSpinner";
import addGlobal from "../../hooks/addGlobal";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { AxiosError } from "axios";
import { useEffect } from "react";

const PermissionsSettings = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const { data, isLoading } = getGlobal(
    {} as RoleResponse,
    CACHE_KEY_Role,
    RoleApiClient,
    undefined
  );
  const { data: data2, isLoading: isLoading2 } = getGlobal(
    {} as NurseRoleResponse,
    CACHE_KEY_NurseRole,
    RoleNursesClient,
    undefined
  );
  const addMutation = addGlobal({} as AddRoles, AddRolesApiClient);
  const getPermissionsMutation = addGlobal(
    {} as any,
    getRolespermissionsApiClient
  );
  const roleName = watch("rolename");

  useEffect(() => {
    const getpermissions = async () => {
      const mutationData = {
        rolename: roleName,
      };
      await getPermissionsMutation.mutateAsync(mutationData, {
        onSuccess(data: any) {
          [
            PermissionListpatient,
            PermissionListordonance,
            PermissionListcreance,
            PermissionListdebt,
            PermissionListdocument,
            PermissionListSupplier,
            PermissionListStock,
            PermissionListProduct,
            PermissionListHistoriqueEnter,
            PermissionListHistoriqueSortie,
          ].forEach((permissionArray) => {
            permissionArray.forEach((permission) => {
              setValue(permission.name, false);
            });
          });

          data?.data?.forEach((permission: any) => setValue(permission, true));
        },
        onError(error: any) {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message
              : error.message;
          showSnackbar(message, "error");
        },
      });
    };
    if (roleName) {
      getpermissions();
    }
  }, [roleName]);

  const { showSnackbar } = useSnackbarStore();
  if (isLoading || isLoading2) return <LoadingSpinner />;

  const onSubmit = async (data: any) => {
    const { nurseid, rolename, ...permissions } = data;
    const form: any = {
      nurseid,
      rolename,
      permissions: Object.entries(permissions)
        .filter((e) => e[1])
        .map((e) => e[0]),
    };

    try {
      await addMutation.mutateAsync(form, {
        onSuccess(data: any) {
          showSnackbar(data?.message, "success");
        },
        onError(error: any) {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message
              : error.message;
          showSnackbar(message, "error");
        },
      });
    } catch (error: any) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;
      showSnackbar(message, "error");
    }
  };

  return (
    <Box
      className="flex flex-col w-full h-full p-4 gap-4"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="font-light text-gray-600 text-md md:text-xl text-center">
        Gestion des Autorisations Infirmiers
      </p>
      <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
        <label htmlFor="nom" className="w-full md:w-[160px]">
          Infirmière:
        </label>
        <FormControl className="w-full md:flex-1">
          <InputLabel id="nurse-label">Infirmière</InputLabel>
          <Controller
            name="nurseid"
            control={control}
            rules={{ required: "Infirmière est requise" }}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="nurse-label"
                id="nurse-select"
                label="Infirmière"
                error={!!errors.nurseid}
              >
                {data2.map((nurse: NurseRole) => (
                  <MenuItem value={nurse.id} key={nurse.id}>
                    {nurse.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </Box>
      <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
        <label htmlFor="nom" className="w-full md:w-[160px]">
          Rôle:
        </label>
        <FormControl className="w-full md:flex-1">
          <InputLabel id="role-label">Rôle</InputLabel>
          <Controller
            name="rolename"
            control={control}
            rules={{ required: "Rôle est requise" }}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="role-label"
                id="role-select"
                label="Rôle"
                error={!!errors.rolename}
              >
                {data?.map((role: Role) => (
                  <MenuItem value={role.name} key={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </Box>
      <Box className="w-full flex flex-col gap-4 md:flex-row md:flex-wrap items-center md:items-start">
        <label className="w-full md:w-[160px] text-base">Permissions:</label>
        <Box className="w-full grid grid-rows-1 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <Box className="flex flex-col flex-wrap">
            <label htmlFor="nom">Patient:</label>
            {PermissionListpatient.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label={item.display}
                  />
                )}
              />
            ))}
          </Box>
          <Box className="flex flex-col flex-wrap">
            <label htmlFor="nom">Document:</label>
            {PermissionListdocument.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label={item.display}
                  />
                )}
              />
            ))}
          </Box>
          <Box className="flex flex-col flex-wrap">
            <label htmlFor="nom">Ordonnance:</label>
            {PermissionListordonance.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label={item.display}
                  />
                )}
              />
            ))}
          </Box>
          <Box className="flex flex-col flex-wrap">
            <label htmlFor="nom">Dette:</label>
            {PermissionListdebt.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label={item.display}
                  />
                )}
              />
            ))}
          </Box>
          <Box className="flex flex-col flex-wrap">
            <label htmlFor="nom">Créance:</label>
            {PermissionListcreance.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label={item.display}
                  />
                )}
              />
            ))}
          </Box>
          <Box className="flex flex-col flex-wrap">
            <label htmlFor="nom">Fournisseur:</label>
            {PermissionListSupplier.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label={item.display}
                  />
                )}
              />
            ))}
          </Box>
          <Box className="flex flex-col flex-wrap">
            <label htmlFor="nom">Produit:</label>
            {PermissionListProduct.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label={item.display}
                  />
                )}
              />
            ))}
          </Box>
          <Box className="flex flex-col flex-wrap">
            <label htmlFor="nom">Stock général:</label>
            {PermissionListStock.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label={item.display}
                  />
                )}
              />
            ))}
          </Box>
          <Box className="flex flex-col flex-wrap">
            <label htmlFor="nom">historique d'entrée:</label>
            {PermissionListHistoriqueEnter.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label={item.display}
                  />
                )}
              />
            ))}
          </Box>
          <Box className="flex flex-col flex-wrap">
            <label htmlFor="nom">historique d'sortie:</label>
            {PermissionListHistoriqueSortie.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label={item.display}
                  />
                )}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Box className="flex mt-4">
        <Button
          size="small"
          type="submit"
          variant="contained"
          className="w-full md:w-max !px-10 !py-3 rounded-lg !ms-auto"
        >
          Enregistrer
        </Button>
      </Box>
    </Box>
  );
};

export default PermissionsSettings;
