import axios, { AxiosResponse, AxiosError } from "axios";
import useAuthStore from "../store/zustand/auth/useAuth";

const client = axios.create({
  // baseURL: `http://localhost:8888/api`,
  baseURL: `https://thrift-api.themonograf.com/api`,
});

client.interceptors.request.use(
  (config) => {
    const state = useAuthStore.getState();
    config.headers = {
      ...config.headers,
      Authorization: state.token ? `Bearer ${state.token}` : undefined,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

export type { AxiosResponse, AxiosError };

export default client;
