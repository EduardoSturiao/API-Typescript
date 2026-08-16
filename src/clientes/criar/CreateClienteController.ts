import type { Request, Response } from 'express'
import type {  CreateClienteRepository  } from './CreateClienteRepository.ts'

export class CreateClienteController{
    constructor(private repository: CreateClienteRepository){}

    async handle(req: Request, res: Response){
        try {
            const { nome, email } = req.body;

            const novoCliente = await this.repository.create({nome, email})

            res.json(novoCliente)
        } catch (error) {
            if(error instanceof Error){
                res.status(400).json({mensagem: error.message})
            }else{
                res.status(400).json({mensagem: 'Erro desconhecido'})
            }
        }
    }
}
