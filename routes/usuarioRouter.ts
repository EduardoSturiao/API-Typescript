import express from 'express'
const router = express.Router()
import * as controller from '../controllers/usuarioController.ts'

router.get('/', controller.allUsuarios)
router.post('/', controller.cadastrar)
router.post('/login', controller.login)

export default router