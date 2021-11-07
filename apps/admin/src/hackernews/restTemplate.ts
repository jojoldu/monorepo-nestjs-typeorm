import { plainToClass } from 'class-transformer';
import axios from 'axios';
import { HttpMethod } from './HttpMethod';

export async function restTemplate<T>(
  method: HttpMethod,
  url: string,
  data?: any,
  headers?: any,
  classType?: { new (): T },
) {
  const response = await axios({
    method: method,
    url: url,
    headers: headers,
    data: data,
  });

  return plainToClass(classType, response.data);
}
