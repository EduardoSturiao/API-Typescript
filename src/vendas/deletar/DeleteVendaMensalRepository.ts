import type { IVendaMensal } from '../../models/VendaMensal.ts'


export interface DeleteVendaMensalRepository{
    delete(id: string): Promise <IVendaMensal | null >
}