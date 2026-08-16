import type { IVendaMensal } from "../../models/VendaMensal.ts";
import type { GetVendasMensaisRepository } from "./GetVendasMensaisRepository.ts";
import VendaMensal from "../../models/VendaMensal.ts";


export class MongoGetVendasMensaisRepository implements GetVendasMensaisRepository{
    async getAll(): Promise<IVendaMensal[]>{
        const vendas = await VendaMensal.find()
        return vendas
    }
}