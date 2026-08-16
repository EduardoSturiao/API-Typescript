import type { Request, Response} from 'express'
import type {  CreateUsuarioRepository  } from './CreateUsuarioRepository.ts'

export class CreateUsuarioController{
    constructor(private repository: CreateUsuarioRepository){}

    async handle(req: Request, res: Response){
        try {
            const { nome, email, senha } = req.body

            const novoUsuario = await this.repository.create({nome, email, senha})
            res.json(novoUsuario)
        } catch (error) {
            if(error instanceof Error){
                res.status(400).json({mensagem: error.message})
            }else{
                res.status(400).json({mensagem: "Erro desconhecido"})
            }
        }
    }
}