import Cliente from '../../models/Cliente.ts'
import { type CreateClienteRepository, type CreateClienteInput } from './CreateClienteRepository.ts'
import type { ICliente } from '../../models/Cliente.ts'


export class MongoCreateClienteRepository implements CreateClienteRepository{
    async create(data: CreateClienteInput): Promise <ICliente>{
        const novoCliente = await Cliente.create(data)
        return novoCliente
    }
}


