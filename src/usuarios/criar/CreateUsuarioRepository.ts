import type { IUsuario } from '../../models/Usuario.ts'



export type CreateUsuarioInput = Pick<IUsuario, "nome" | "senha" | "email">

export interface CreateUsuarioRepository{
    create(data: CreateUsuarioInput): Promise<IUsuario>;
}


// nome, email e senha na interface em models