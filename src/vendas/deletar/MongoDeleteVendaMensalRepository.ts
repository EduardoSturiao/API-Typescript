import type { IVendaMensal } from "../../models/VendaMensal.ts";
import type { DeleteVendaMensalRepository } from "./DeleteVendaMensalRepository.ts";
import VendaMensal from "../../models/VendaMensal.ts";

export class MongoDeleteVendaMensalRepository implements DeleteVendaMensalRepository {
  async delete(id: string): Promise<IVendaMensal | null> {
    const vendaExcluida = await VendaMensal.findByIdAndDelete(id);
    return vendaExcluida;
  }
}
