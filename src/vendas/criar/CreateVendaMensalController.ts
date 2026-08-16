import type { Request, Response } from "express";
import type { CreateVendaMensalRepository } from "./CreateVendaMensalRepository.ts";

export class CreateVendaMensalController {
  constructor(private repository: CreateVendaMensalRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { mes, valorVendido, cliente } = req.body;

      const novaVendaMensal = await this.repository.create({
        mes,
        valorVendido,
        cliente,
      });

      res.json(novaVendaMensal)
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({mensagem: error.message })
        }else{
            res.status(400).json({ mensagem: 'Erro desconhecido' })
        }
    }
  }
}
