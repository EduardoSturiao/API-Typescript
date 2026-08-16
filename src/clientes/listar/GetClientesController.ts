import type { Request, Response } from "express";
import type { GetClientesRepository } from "./GetClientesRepository.ts";

export class GetClientesController {
  constructor(private repository: GetClientesRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const clientes = await this.repository.getAll();

      res.json(clientes);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ mensagem: error.message });
      }else{
        res.status(400).json({mensagem: "Erro desconhecido"})
      }
    }
  }
}
