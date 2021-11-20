import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';

export const instance: AxiosInstance = axios.create({
  responseType: 'json',
  validateStatus(status) {
    return [200].includes(status);
  },
});

export async function request<T>(
  config: AxiosRequestConfig,
  classType: any,
): Promise<T> {
  const response = await instance.request<T>(config);
  return plainToClass<T, AxiosResponse['data']>(classType, response.data);
}
