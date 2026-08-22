import express, {type Request, type Response, type NextFunction} from 'express'
import { connectDB } from "./config/db.ts";
import vendaMensalRouter from './routes/vendaMensalRouter.ts'
import clienteRouter from './routes/clienteRouter.ts'
import usuarioRouter from './routes/usuarioRouter.ts'

const app = express()
const port = 3000

app.use(express.json())

// libera o client (client/dashboard.html), que roda em outra origem, para
// chamar as rotas já existentes abaixo
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.use('/usuarios', usuarioRouter)
app.use('/vendas', vendaMensalRouter)
app.use('/clientes', clienteRouter)

app.get('/', (req: Request, res: Response)=> res.send('Bem vindo ao banco de dados'))

const startServer = async()=>{
  await connectDB()

  app.listen(port, ()=> console.log(`Server initialized: http://localhost:${port}`))
}

startServer()


