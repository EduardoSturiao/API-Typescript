// interface
import type { ICliente } from "../../models/Cliente.ts";


export type CreateClienteInput = Pick<ICliente, "nome" | "email">

export interface CreateClienteRepository {
  create(data: CreateClienteInput): Promise<ICliente>; 
}

//a barra aqui nao significa 'or'.
// e sim uma 'lista' de campos que voce quis selecionar daquela interface