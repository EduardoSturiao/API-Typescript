import express, { type Request, type Response } from "express";
// import type { RequestHandler } from "express"
//obs pra req e res: RequestHandler poupa tempo
import VendaMensal from "../models/VendaMensal.ts";

interface IFiltroVenda {
  mes?: number;
}

export const listar = (req: Request, res: Response) => {
  res.send("Bem vindo ao banco de dados");
};

export const allVendas = async (req: Request, res: Response) => {
  try {
    const filtro: IFiltroVenda = {};

    if (req.query.mes) {
      filtro.mes = Number(req.query.mes);
    }

    const limite = req.query.limite ? Number(req.query.limite) : 10;
    const ordem = req.query.ordem === "maior" ? -1 : 1;

    const pagina = req.query.pagina ? Number(req.query.pagina) : 1;
    const skip = (pagina - 1) * limite;

    const vendasMensais = await VendaMensal.find(filtro)
      .sort({ valorVendido: ordem })
      .skip(skip)
      .limit(limite)
      .populate("cliente");

    const total = await VendaMensal.countDocuments(filtro);

    res.json({
      pagina,
      totalPaginas: Math.ceil(total / limite),
      totalResultados: total,
      resultados: vendasMensais,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ mensagem: error.message });
    } else {
      res.status(500).json({ mensagem: "Erro desconhecido" });
    }
  }
};

export const atualizar = async (req: Request, res: Response) => {
  try {
    const attVendaMensal = await VendaMensal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!attVendaMensal) {
      res.status(404).json({ mensagem: "Venda mensal não encontrada." });
    }

    res.json(attVendaMensal);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ mensagem: error.message });
    } else {
      res.status(404).json({ mensagem: "Erro desconhecido" });
    }
  }
};

export const criar = async (req: Request, res: Response) => {
  try {
    const novaVendaMensal = await VendaMensal.create(req.body);
    res.json(novaVendaMensal);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ mensagem: error.message });
    } else {
      res.status(400).json({ mensagem: "Erro desconhecido" });
    }
  }
};

export const deletar = async (req: Request, res: Response) => {
  try {
    const vendaMensalExcluida = await VendaMensal.findByIdAndDelete(
      req.params.id,
    );

    if (!vendaMensalExcluida) {
      return res.status(404).json({ mensagem: "Venda mensal não encontrada" });
    }

    res.json(vendaMensalExcluida);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ mensagem: error.message });
    } else {
      res.status(404).json({ mensagem: "Erro desconhecido" });
    }
  }
};
