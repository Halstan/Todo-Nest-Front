import { LoginDTO } from '@/models/login.dto';
import axios from 'axios';

const url = process.env.VUE_APP_URI + '/auth'

function login(login: LoginDTO) {
  return axios.post(url, login);
}

export { login }