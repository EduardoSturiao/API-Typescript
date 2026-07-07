import express, { Request, Response } from "express";
import VendaMensal from "../models/VendaMensal.ts";

export const listar = (req: Request, res: Response): void => {
  res.send("Bem vindo ao banco de dados");
};

export const allVendas = async (req: Request,  res: Response) =>{
    try {
        const vendasMensais = await VendaMensal.find()
    } catch (error) {
        
    }
}
 
export const atualizar = async (req: Request, res: Response): Promise<void> => {
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


export const deletar = async (req: Request, res: Response) =>{
try {
    const vendaMensalExcluida = await VendaMensal.findByIdAndDelete(req.params.id)


    if(!vendaMensalExcluida){
        return res.status(404).json({mensagem: "Venda mensal não encontrada"})
    }

    res.json(vendaMensalExcluida)
} catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ mensagem: error.message });
    } else {
      res.status(404).json({ mensagem: "Erro desconhecido" });
    }
  }
};

