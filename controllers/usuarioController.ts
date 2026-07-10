import Usuario from "../models/Usuario.ts";
import express, { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const cadastrar = async (req: Request, res: Response) => {
  try {
    const novoUsuario = await Usuario.create(req.body);
    const { senha, ...usuarioSemSenha } = novoUsuario.toObject();
    res.json(usuarioSemSenha);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ mensagem: error.message });
    } else {
      res.status(400).json({ mensagem: "Erro desconhecido" });
    }
  }
};


export const allUsuarios = async (req: Request, res: Response) =>{
    try {
        const usuarios = await Usuario.find()
        res.json(usuarios)
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({mensagem: error.message})
        }else{
            res.status(500).json({mensagem: 'Erro desconhecido'})
        }
    }
}

export const login = async (req: Request, res: Response)=>{
    
    try {
        const { email, senha } = req.body
        const usuario = await Usuario.findOne({ email }).select('+senha')
    if(!usuario){
        return res.status(401).json({mensagem: "Email ou senha inválidos"})
    }
    
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if(!senhaCorreta){
        return res.status(401).json({mensagem: "Email ou senha inválidos"})
    }

    const token = jwt.sign(
        {id: usuario._id},
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    )
    res.json(token)
    } catch (error) {
        if(error instanceof Error ){
            res.status(500).json({mensagem: error.message})
        }
    }
    
}