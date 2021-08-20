/**
 * Express e um framework web estruturado que roda sobre o ambiente node.js em tempo de execução.
 * cookie-parser: Cookie analisando middleware para analisar e definir cookies em objetos de solicitação.]
 * compression: Middleware de compactação que tentará compactar corpos de resposta para todas as solicitações que atravessam o middleware.
 * helmet: Coleção de funções de middleware para ajudar a proteger aplicativos Express definindo vários cabeçalhos HTTP.
 * cors: Middleware para habilitar o compartilhamento de recursos de origem cruzada ( CORS ).
 */

import express from 'express'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use('/', userRoutes)
app.use('/', authRoutes)

/**
 * Autenticação para proteger rotas:
 * Express-jw lança um erro nomeado UnauthorizedError quando um token não pode ser validado por algum motivo.
 * Capturamos esse erro aqui para retornar um 401 status ao cliente solicitante.
 */
app.use((err, req, res, next) => {
    if (err.name == 'Unauthorization') {
        res.status(401).json({"error": err.name + ": " + err.message})
    } else if (err) {
        res.status(400).json({"error": err.name + ": " + err.message})
        console.log(err)
    }
})

app.get('/', (req, res) => {
    res.status(200).send(Template())
   })

export default app