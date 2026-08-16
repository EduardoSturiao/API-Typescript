import type { Request, Response } from "express";
import type { DeleteVendaMensalRepository } from "./DeleteVendaMensalRepository.ts";
import VendaMensal from "../../models/VendaMensal.ts";

export class DeleteVendaMensalController {
  constructor(private repository: DeleteVendaMensalRepository) {}

  async handle(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const vendaExcluida = await this.repository.delete(id);

      if (!vendaExcluida) {
        return res.status(404).json({ mensagem: "Venda não encontrada." });
      }
      res.json(vendaExcluida);

    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ mensagem: error.message });
      } else {
        res.status(400).json({ mensagem: "Erro desconhecido" });
      }
    }
  }
}
