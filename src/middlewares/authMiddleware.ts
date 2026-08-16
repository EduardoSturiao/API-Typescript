import jwt from 'jsonwebtoken';
import express, { type Request, type Response, type NextFunction  } from 'express'

export const protegerRota = (req: Request, res: Response, next: NextFunction)=>{
    const authHeader = req.headers.authorization


    if(!authHeader){
        return res.status(401).json({mensagem: 'Token não fornecido'})
    }

    const token = authHeader.split(' ')[1]
    
    try {
        const dadosDecodificados = jwt.verify(token as string, process.env.JWT_SECRET as string)


        if(typeof dadosDecodificados === 'string'){
            return res.status(401).json({mensagem: 'Token inválido'})
        }

        req.usuarioId = dadosDecodificados.id as string
        next()
        

    } catch (error) {
        if(error instanceof Error){
            res.status(401).json({mensagem: 'Token inválido ou expirado'})
        }
    }
}