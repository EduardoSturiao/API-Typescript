import type {IVendaMensal} from '../../models/VendaMensal.ts'
import type  { CreateVendaMensalRepository, CreateVendaInput } from '../criar/CreateVendaMensalRepository.ts'
import VendaMensal from '../../models/VendaMensal.ts'

export class MongoCreateVendaMensalRepository implements CreateVendaMensalRepository{
    async create(data: CreateVendaInput): Promise <IVendaMensal>{
        const novaVenda = await VendaMensal.create(data)
        return novaVenda
    }
}