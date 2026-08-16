import Cliente from '../../models/Cliente.ts'
import type {GetClientesRepository} from './GetClientesRepository.ts'
import type { ICliente } from '../../models/Cliente.ts'

export class MongoGetClientesRepository implements GetClientesRepository{
    async getAll(): Promise<ICliente[]>{
        const clientes = await Cliente.find()
        return clientes
    }
}