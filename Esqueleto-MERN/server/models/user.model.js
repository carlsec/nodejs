/**
 * Definindo o modelo do usuario com o esquema para os campos definidos.
 */

import mongoose from 'mongoose'
import crypto from 'crypto'

/**
* Esquema com todos os atributos do usuario e propriedades associadas.
* Hashed_password: representa a senha criptografada usada para a autentiação.
*/
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  hashed_password: {
    type: String,
    required: "Password is required"
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
})

/**
 * Senha para autenticação: Senha dos usuarios precisam ser criptografadas, validada e autenticada.
 * A password_string não e armazenada diretamente no documento do usuario, ela e tratada em um campo virtual.
 * Quando o password e recebido na criação/atualização do usuario ele e criptografado em um novo hash.
 */
 UserSchema
 .virtual('password')
 .set(function(password) {
   this._password = password
   this.salt = this.makeSalt()
   this.hashed_password = this.encryptPassword(password)
 })
 .get(function() {
   return this._password
 })

 /**
 * Restrições de validação: Logica de validação associada ao hashed_password campo no esquema.
 */
  UserSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 6) {
      this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
      this.invalidate('password', 'Password is required')
    }
  }, null)

/**
 * Logica de criptografia e a logica de geração de sal, que são usadas para gerar os valores hashed_password
 * representam o passwordvalor são definidas como UserShema.methods.
 * Authenticate: Este metodo e chamado para verificar as tentativas de login.
 * encryptPassword: Este metodo e usado para gerar um hash criptografado da senha.
 * makeSalt: Este metodo gera um valor salt unico e aleatorio usando o carimbo de data/hora atual na execução.
 */

 UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

export default mongoose.model('User', UserSchema)