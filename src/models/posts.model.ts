import { UsuarioModel } from "./usuario.model";

export class PostsModel {
  id!: number;
  titulo!: string;
  description!: string;
  dateCreated!: Date;
  usuario!: UsuarioModel;
}