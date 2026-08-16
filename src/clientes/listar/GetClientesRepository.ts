import type { ICliente } from '../../models/Cliente.ts'


export interface GetClientesRepository{
    getAll(): Promise<ICliente[]>
}