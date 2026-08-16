import type {IUsuario} from '../../models/Usuario.ts'

export interface GetUsuariosRepository{
    getAll(): Promise<IUsuario[]>
}



