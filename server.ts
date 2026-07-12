import express, {type Request, type Response} from 'express'
import { connectDB } from "./config/db.ts";
import vendaMensalRouter from './routes/vendaMensalRouter.ts'
import clienteRouter from './routes/clienteRouter.ts'
import usuarioRouter from './routes/usuarioRouter.ts'


const app = express()
const port = 3000

app.use(express.json())


app.use('/usuarios', usuarioRouter)
app.use('/vendas', vendaMensalRouter)
app.use('/clientes', clienteRouter)


app.get('/', (req: Request, res: Response)=> res.send('Bem vindo ao banco de dados'))


const startServer = async()=>{
  await connectDB()

  app.listen(port, ()=> console.log(`Server initialized: http://localhost:${port}`))
}

startServer()

