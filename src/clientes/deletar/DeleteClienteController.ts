import type { Request, Response } from "express";
import type { DeleteClienteRepository } from "./DeleteClienteRepository.ts";

export class DeleteClienteController {
  constructor(private repository: DeleteClienteRepository) {}

  async handle(req: Request<{id: string}>, res: Response) {
    try {
      const { id } = req.params;  

      if(!id){
        return res.status(400).json({mensagem: 'ID não informado'})
      }

      const clienteExcluido = await this.repository.delete(id);

      if (!clienteExcluido) {
        return res.status(404).json({ mensagem: "Cliente não encontrado" });
      }
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({mensagem: 'error.message'})
        }else{
            res.status(400).json({mensagem: 'Erro desconhecido'})
        }
    }  
  }
}
