import { Router } from "express"
const vendaMensalRouter = Router()


// CREATE

import { CreateVendaMensalController } from "../vendas/criar/CreateVendaMensalController.ts"
import { MongoCreateVendaMensalRepository } from "../vendas/criar/MongoCreateVendaMensalRepository.ts"

const createVendaMensalRepository = new MongoCreateVendaMensalRepository()
const createVendaMensalController = new CreateVendaMensalController(createVendaMensalRepository)



// DELETE

import { DeleteVendaMensalController } from '../vendas/deletar/DeleteVendaMensalController.ts'
import { MongoDeleteVendaMensalRepository } from '../vendas/deletar/MongoDeleteVendaMensalRepository.ts'
 
const deleteVendaMensalRepository = new MongoDeleteVendaMensalRepository()
const deleteVendaMensalController = new DeleteVendaMensalController(deleteVendaMensalRepository)


// GET

import { GetVendasMensaisController } from '../vendas/listar/GetVendasMensaisController.ts'
import { MongoGetVendasMensaisRepository } from "../vendas/listar/MongoGetVendasMensaisRepository.ts"

const getVendasMensaisRepository = new MongoGetVendasMensaisRepository()
const getVendasMensaisController = new GetVendasMensaisController(getVendasMensaisRepository)


// rotas

vendaMensalRouter.post('/', (req, res) => createVendaMensalController.handle(req, res))
vendaMensalRouter.delete('/:id', (req, res) => deleteVendaMensalController.handle(req, res) )
vendaMensalRouter.get('/', (req, res) => getVendasMensaisController.handle(req, res) )

export default vendaMensalRouter 
