import { LoginDTO } from '@/models/login.dto';
import axios, { AxiosResponse } from 'axios';

const url = process.env.VUE_APP_URI + '/auth'

function login(login: LoginDTO): Promise<AxiosResponse<any>> {
  return axios.post(url, login);
}

export { login }