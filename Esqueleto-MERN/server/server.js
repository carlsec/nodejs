/**
 * Express configurado para aceitar solicitações HTTP.
 * Importando o app com express para inicar o servidor.
 * Mongoose: Utilizamos ele para defenir uma conexão com o MongoDB.
 * Importando o módulo do mongoose e conectando ao servidor.
 */

import config from "../config/config";
import app from './express'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})