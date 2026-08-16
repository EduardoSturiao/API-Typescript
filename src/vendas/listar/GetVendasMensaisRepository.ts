import type { IVendaMensal } from '../../models/VendaMensal.ts'

 
export interface GetVendasMensaisRepository{
    getAll(): Promise <IVendaMensal[]>
}