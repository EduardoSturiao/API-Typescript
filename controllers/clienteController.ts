import Cliente from "../models/Cliente.ts";
import express, { type Request, type Response } from "express";

export const criar = async (req: Request, res: Response) => {
  try {
    const novoCliente = await Cliente.create(req.body);
    res.json(novoCliente);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ mensagem: error.message });
    } else {
      res.status(400).json({ mensagem: "Erro desconhecido." });
    }
  }
};

export const allClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ mensagem: error.message });
    } else {
      res.status(400).json({ mensagem: "Erro desconhecido" });
    }
  }
};


export const deletar = async (req: Request, res: Response) =>{
    try {
        const clienteExcluido = await Cliente.findByIdAndDelete(req.params.id)
        if(!clienteExcluido){
           return res.status(404).json({mensagem: 'Cliente não encontrado.'})
        }
        res.json(clienteExcluido)
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({mensagem: error.message})
        }else{
            res.status(400).json({mensagem: 'Erro desconhecido'})
        }
    }
}