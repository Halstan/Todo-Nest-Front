import { UsuarioModel } from "./usuario.model";

export class PostsModel {
  id!: number;
  text!: string;
  dateCreated!: Date;
  usuario!: UsuarioModel;
}