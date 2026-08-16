import { Router } from 'express' 
const clienteRouter = Router()

//DELETE
import {  DeleteClienteController  } from '../clientes/deletar/DeleteClienteController.ts'
import { MongoDeleteClienteRepository } from '../clientes/deletar/MongoDeleteClienteRepository.ts'

//CREATE
import {  CreateClienteController  } from '../clientes/criar/CreateClienteController.ts'
import {  MongoCreateClienteRepository  } from '../clientes/criar/MongoCreateClienteRepository.ts'


//READ 
import {  GetClientesController  } from '../clientes/listar/GetClientesController.ts'
import { MongoGetClientesRepository } from '../clientes/listar/MongoGetClientesRepository.ts'

//Delete
const deleteClienteRepository = new MongoDeleteClienteRepository()
const deleteClienteController = new DeleteClienteController(deleteClienteRepository)

//Create
const createClienteRepository = new MongoCreateClienteRepository()
const createClienteController = new CreateClienteController(createClienteRepository)

//Read 
const getClientesRepository = new MongoGetClientesRepository()
const getClientesController = new GetClientesController(getClientesRepository)


clienteRouter.delete('/:id', (req, res)=> deleteClienteController.handle(req, res))
clienteRouter.post('/', (req, res) => createClienteController.handle(req, res))
clienteRouter.get('/', (req, res) => getClientesController.handle(req, res))

export default clienteRouter