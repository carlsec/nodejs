import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

/**
 * Essa funcao cria um novo usuario com JSON object com o metodo post recebendo do frontend dentro de req.body.
 * Chamamos user.save() para salvar o novo usuario no nosso banco de dados depois do monggose checar nossos dados.
 */
const create = async (req, res) => {
    const user = new User(req.body)
    try {
      await user.save()
      return res.status(200).json({
        message: "Successfully signed up!"
      })
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }

/**
 * A list controller function encontra todos os users da database, selecionando somente o nome, email, created e update.
 * E retornado um Json in um array com o requeste.
 */
 const list = async (req, res) => {
    try {
      let users = await User.find().select('name email updated created')
      res.json(users)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }

/**
 * Todas as três endpoints read, update e delete requerem o user para carregar os dados, vamos acessar pelo userID.
 * Se o usuario e encontrado no banco de dados o objeto e adicionado em req.profile e então chamado next().
 * Next e a proxima função que e definida, assim com o ID do User podemos chamar a função read, update e delete.
 */
 const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
    if (!user)
      return res.status('400').json({
        error: "User not found"
      })
    req.profile = user
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve user"
    })
  }
}

/**
 * A função read recebe os detalhes do user da req.profile e remove as informaçõe sensiveis.
 * como hashed_password e salt valores, antes de enviar o objeto como resposta para o cliente.
 * Essa regra também deve ser usada para implementar a função update do user.
 */
const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
 }

 /**
  * A função update recebe os detalhes do user pela req.profile e então usa o modulo lodash para extender e fundir
  * as mudanças que veio do resquest body do user.
  */
  const update = async (req, res) => {
    try {
      let user = req.profile
      user = extend(user, req.body)
      user.updated = Date.now()
      await user.save()
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }

 /**
  * De forma similar as outras a delete espera receber o Id do user.
  * A função recee o req.profile e usa a função remove() query para deletar o usuario do banco de dados.
  */
  const remove = async (req, res) => {
    try {
      let user = req.profile
      let deletedUser = await user.remove()
      deletedUser.hashed_password = undefined
      deletedUser.salt = undefined
      res.json(deletedUser)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }

export default { create, userByID, read, list, remove, update}