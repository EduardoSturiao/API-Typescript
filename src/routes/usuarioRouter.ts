import { Router } from 'express'
const usuarioRouter = Router()

// CREATE 
import { CreateUsuarioController } from '../usuarios/criar/CreateUsuarioController.ts'
import { MongoCreateUsuarioRepository } from '../usuarios/criar/MongoCreateUsuarioRepository.ts'

const createUsuarioRepository = new MongoCreateUsuarioRepository()
const createUsuarioController = new CreateUsuarioController(createUsuarioRepository)


// READ

import { GetUsuariosController } from '../usuarios/listar/GetUsuariosController.ts'
import { MongoGetUsuariosRepository } from '../usuarios/listar/MongoGetUsuariosRepository.ts'

const getUsuariosRepository = new MongoGetUsuariosRepository()
const getUsuariosController = new GetUsuariosController(getUsuariosRepository)



usuarioRouter.post('/', (req, res) => createUsuarioController.handle(req, res))
usuarioRouter.get('/', (req, res) => getUsuariosController.handle(req, res))

export default usuarioRouter