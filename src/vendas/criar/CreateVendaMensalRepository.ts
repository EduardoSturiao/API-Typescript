import type {IVendaMensal} from '../../models/VendaMensal.ts'

export type CreateVendaInput = Pick<IVendaMensal, "mes" | "valorVendido" | "cliente">

export interface CreateVendaMensalRepository{
    create(data: CreateVendaInput): Promise <IVendaMensal>
}


