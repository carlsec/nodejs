/**
 * Express e um framework web estruturado que roda sobre o ambiente node.js em tempo de execução.
 * cookie-parser: Cookie analisando middleware para analisar e definir cookies em objetos de solicitação.]
 * compression: Middleware de compactação que tentará compactar corpos de resposta para todas as solicitações que atravessam o middleware.
 * helmet: Coleção de funções de middleware para ajudar a proteger aplicativos Express definindo vários cabeçalhos HTTP.
 * cors: Middleware para habilitar o compartilhamento de recursos de origem cruzada ( CORS ).
 * devBundle: Configura o middleware webpack.
 */

import express from 'express'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import devBundle from './devBundle'
import path from 'path'

// modules for server side rendering
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/MainRouter'
import { StaticRouter } from 'react-router-dom'

import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import theme from './../client/theme'
//end

const CURRENT_WORKING_DIR = process.cwd()

const app = express()
devBundle.compile(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use('/', userRoutes)
app.use('/', authRoutes)

/**
 * Para garantir que o express server leia corretamente arquivos staticos como CSS, imagens or cliente-side Js
 * precisamos da seguinte configuração. Quando o expres recebe um request na rota /dist ele vai saber procurar
 * o recurso statico e retornar a resposta.
 */
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

/**
 * Autenticação para proteger rotas:
 * Express-jw lança um erro nomeado UnauthorizedError quando um token não pode ser validado por algum motivo.
 * Capturamos esse erro aqui para retornar um 401 status ao cliente solicitante.
 */
// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({"error" : err.name + ": " + err.message})
    }else if (err) {
      res.status(400).json({"error" : err.name + ": " + err.message})
      console.log(err)
    }
  })

app.get('*', (req, res) => {
    const sheets = new ServerStyleSheets()
    const context = {}
    const markup = ReactDOMServer.renderToString(
      sheets.collect(
            <StaticRouter location={req.url} context={context}>
              <ThemeProvider theme={theme}>
                <MainRouter />
              </ThemeProvider>
            </StaticRouter>
          )
      )
      if (context.url) {
        return res.redirect(303, context.url)
      }
      const css = sheets.toString()
      res.status(200).send(Template({
        markup: markup,
        css: css
      }))
  })
   
export default app