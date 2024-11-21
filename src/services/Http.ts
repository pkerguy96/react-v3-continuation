//@ts-nocheck
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
interface ApiResponse<T> {
  data: T[];
}
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = localStorage.getItem("user_login");
    if (user) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(user).token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user_login");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
export class APIClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getall = (): Promise<T> => {
    return axiosInstance.get<ApiResponse<T>>(this.endpoint).then((res) => {
      return res.data.data; // Explicitly return the `data`
    });
  };
  getalls = (page = 1, perPage = 10, search = "") => {
    const endpoint = `${
      this.endpoint
    }?page=${page}&per_page=${perPage}&searchQuery=${encodeURIComponent(
      search
    )}`;

    return axiosInstance.get<ApiResponse<T>>(endpoint).then((res) => res.data);
  };
  getone = () => {
    return axiosInstance.get<T>(this.endpoint).then((res) => res);
  };
  getById = (id: number) => {
    const endpointWithId = `${this.endpoint}/${id}`;
    return axiosInstance
      .get<ApiResponse<T>>(endpointWithId)
      .then((res) => res.data.data);
  };
  getUrl = (id: string) => {
    const endpointWithId = `${this.endpoint}/${id}`;

    return axiosInstance
      .get<ApiResponse<T>>(endpointWithId)
      .then((res) => res.data.data);
  };
  Postall = (data: T, options: any) => {
    return axiosInstance
      .post<T>(this.endpoint, data, options)
      .then((res) => res.data);
  };
  update = (id: number) => {
    return axiosInstance
      .patch<T>(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };
  UpdateAll = (data: T, id: number) => {
    return axiosInstance
      .patch<T>(`${this.endpoint}/${id}`, data)
      .then((res) => res.data);
  };
  DeleteOne = (id: Number) => {
    return axiosInstance
      .delete<T>(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };
  getPaginated = async (
    params: Record<string, any>
  ): Promise<ApiResponse<T>> => {
    return axiosInstance
      .get<ApiResponse<T>>(this.endpoint, { params })
      .then((res) => res.data);
  };
}

export default axiosInstance;
