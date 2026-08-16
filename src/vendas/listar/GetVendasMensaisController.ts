import type { Request, Response } from 'express'
import type { GetVendasMensaisRepository } from './GetVendasMensaisRepository.ts'
import VendaMensal from '../../models/VendaMensal.ts'

export class GetVendasMensaisController{
    constructor(private repository: GetVendasMensaisRepository){}

    async handle(req: Request, res: Response){
        try {
            const vendas = await this.repository.getAll()
            res.json(vendas)
        } catch (error) {
            if(error instanceof Error){
                res.status(400).json({mensagem: error.message})
            }else{
                res.status(400).json({mensagem: 'Erro desconhecido'})
            }
        }
    }
}