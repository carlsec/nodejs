import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../config/config'


/**
 * O POST recebe o obejto com o email e senha em req.body. 
 * Esse email e usado para encontrar o user no banco de dados, e então e definido o metodo UserShema para verificar 
 * se a senha que foi recebida e a mesma. Se verificada o JWT e usado para gerar a signe usando a secret key.
 */
 const signin = async (req, res) => {
  try {
    let user = await User.findOne({
      "email": req.body.email
    })
    if (!user)
      return res.status('401').json({
        error: "User not found"
      })

    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Email and password don't match."
      })
    }

    const token = jwt.sign({
      _id: user._id
    }, config.jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 9999
    })

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })

  } catch (err) {

    return res.status('401').json({
      error: "Could not sign in"
    })

  }
}

/**
 * O signout funcao limpa a resposta do cookie o signed JWT. Isso e um endpoint opcional e não e necessario auth.
 * Estabelece que o cliente não esta mais autenticado.
 */

const signout = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({
        message: "signed out"
    })
}

/**
 * Essa função verifica se a requisição e valida JWT e autoriza o cabeçalho. Se o token e valido e adicionado
 * a verificação ID in auth key da que requisição do objeto. Caso contrario acontece um erro.
 */
 const requireSignin = expressJwt({
    secret: config.jwtSecret,
    algorithms: ['sha1', 'RS256', 'HS256'],
    userProperty: 'auth'
  })

/**
 * O hasAuthorization definido em auth.controller.js vai checar se dentro da autenticação do user e a mesma do user
 * sendo autaulizada ou deletada antes da correspondente CRUD.
 */
 const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default { signin, signout, requireSignin, hasAuthorization }