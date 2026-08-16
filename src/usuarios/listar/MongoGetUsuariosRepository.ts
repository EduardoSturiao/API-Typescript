import type { IUsuario } from "../../models/Usuario.ts";
import type { GetUsuariosRepository } from "./GetUsuariosRepository.ts";
import Usuario from "../../models/Usuario.ts";

export class MongoGetUsuariosRepository implements GetUsuariosRepository {
  async getAll(): Promise<IUsuario[]> {
    const usuarios = await Usuario.find();
    return usuarios;
  }
}
