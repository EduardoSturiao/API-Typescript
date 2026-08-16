import Usuario from '../../models/Usuario.ts'
import type { IUsuario } from '../../models/Usuario.ts'
import type { CreateUsuarioRepository, CreateUsuarioInput } from './CreateUsuarioRepository.ts'

export class MongoCreateUsuarioRepository implements CreateUsuarioRepository{
    async create(data: CreateUsuarioInput): Promise<IUsuario>{
        const novoUsuario = await Usuario.create(data)
        return novoUsuario
    } 
}
