import express from "express"
const router = express.Router()
import * as controller from '../controllers/clienteController.ts'

router.get('/', controller.allClientes)
router.post('/', controller.criar)
router.delete('/:id', controller.deletar)

export default router