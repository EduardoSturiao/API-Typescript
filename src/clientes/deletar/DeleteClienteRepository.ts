import type { ICliente } from '../../models/Cliente.ts'

export interface DeleteClienteRepository{
    delete(id: string): Promise<ICliente | null>
}

// DeleteClienteRepository é a criação de um contrato
// qualquer coisa que implemente esse contrato precisa ter um metodo chamado delete e receber o id como string
// devolve ICliente ou null (caso nao encontrar ID)


