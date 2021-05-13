import axios, { AxiosResponse } from 'axios';
import { UsuarioModel } from '@/models/usuario.model';

const url = process.env.VUE_APP_URI + '/usuarios'

export default function registerUser(usuario: UsuarioModel): Promise<AxiosResponse<UsuarioModel>> {
    return axios.post(url, usuario)
}