import express from "express"
const router = express.Router()
import * as controller from '../controllers/vendaMensalController.ts'

router.get('/', controller.allVendas)
router.post('/', controller.criar) 
router.put('/:id', controller.atualizar)
router.delete('/:id', controller.deletar)
