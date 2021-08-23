import congif from './../config/config'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './../webpack.config.client.js'

/**
 * Express também deve carregar o middleware Webpack que é relevante para o front-end em relação à 
 * configuração que foi definida para o código do lado do cliente, para que o fluxo de trabalho de 
 * desenvolvimento de front-end e back-end seja integrado. 
 */

const compile = (app) => {
  if(congif.env === "development") {
    const compiler = webpack(webpackConfig)
    const middleware = webpackMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath
    })
    app.use(middleware)
    app.use(webpackHotMiddleware(compiler))
    }
}

export default {
    compile
}