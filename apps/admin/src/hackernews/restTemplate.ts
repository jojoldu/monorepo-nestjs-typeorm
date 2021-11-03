import { plainToClass } from 'class-transformer';
import axios from 'axios';
import { HttpMethod } from './HttpMethod';

export async function restTemplate<T>(
  method: HttpMethod,
  url: string,
  requestBody: any,
  classType?: { new (): T },
) {
  const response = await axios({
    method: method,
    url: url,
    data: requestBody,
  });

  return plainToClass(classType, response.data);
}
