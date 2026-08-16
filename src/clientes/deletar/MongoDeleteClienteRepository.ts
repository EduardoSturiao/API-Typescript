import Cliente from "../../models/Cliente.ts";
import type { DeleteClienteRepository } from "./DeleteClienteRepository.ts";
import type { ICliente } from "../../models/Cliente.ts";

export class MongoDeleteClienteRepository implements DeleteClienteRepository {
  async delete(id: string): Promise<ICliente | null> {
    const clienteExcluido = await Cliente.findByIdAndDelete(id);
    return clienteExcluido;
  }
}
