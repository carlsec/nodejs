const path = require('path')
const webpack = require('webpack')
const CURRENT_WORKING_DIR = process.cwd()

/**
 * ----------- 
 * devtool: 'eval-source-map': Uncaught EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval'
 * Use: devtool: 'source-map',
 */

const config = {
    name: "browser",
    mode: "development",
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client?reload=True',
        path.join(CURRENT_WORKING_DIR, 'client/main.js')
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    },  
    plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom'
        }
    }
}

module.exports = config