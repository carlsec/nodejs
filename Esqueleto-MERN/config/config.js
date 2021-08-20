/**
 * Configurações de algumas variáveis relacionadas as configurações do servidor
 * Env: Para diferenciar entre os modeos de desenvolvimeno e produção
 * port: Para definir a porta de escuta do servidor
 * JwtSecret: A chave secreta a ser usada para assinar o JWT
 * mongoUri: A localização da instância do banco de dados MongoDB para o projeto.
 */

 const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/mernproject'
}

export default config