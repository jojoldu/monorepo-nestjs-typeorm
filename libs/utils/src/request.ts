import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.apiUrl,
  responseType: 'json',
  validateStatus(status) {
    return [200].includes(status);
  },
});

export async function request<T>(
  config: AxiosRequestConfig,
  Model: any,
): Promise<T> {
  const response = await axiosInstance.request<T>(config);
  return plainToClass<T, AxiosResponse['data']>(Model, response.data);
}
