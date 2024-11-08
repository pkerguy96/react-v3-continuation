//@ts-nocheck
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "../services/Http";

const addFileswithloading = <T>(Tname: T, service: any) => {
  const mutation = useMutation((data: T) =>
    axiosInstance.post<T>(service.endpoint, data, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          ((progressEvent.loaded ?? 0) * 100) / (progressEvent.total ?? 1)
        );
      },
    })
  );

  return mutation;
};

export default addFileswithloading;
