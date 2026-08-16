import type {Request, Response} from 'express'
import type { GetUsuariosRepository } from './GetUsuariosRepository.ts'

export class GetUsuariosController {
    constructor(private repository: GetUsuariosRepository){}

   async handle(req: Request, res: Response){
    try {
        const usuarios = await this.repository.getAll()

        res.json(usuarios)
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({mensagem: error.message})
        }else{
            res.status(400).json({mensagem: "Erro desconhecido"})
        }
    }
   }
}
