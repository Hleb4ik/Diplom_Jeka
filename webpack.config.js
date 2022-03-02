const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './js/auth.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HTMLPlugin({
            template: './index.html',
            template: './index2.html'
        })
    ]
}