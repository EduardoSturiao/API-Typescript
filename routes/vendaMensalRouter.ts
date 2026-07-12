import express from "express"
const router = express.Router()
import * as controller from '../controllers/vendaMensalController.ts'
import {  protegerRota  } from '../middlewares/authMiddleware.ts'

router.get('/',protegerRota, controller.allVendas)
router.post('/', controller.criar) 
router.put('/:id', controller.atualizar)
router.delete('/:id', controller.deletar)

export default router