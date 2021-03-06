const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: ['./src/index'],
    watch: false,
    cache: false,
    target: 'node',
    node: {
        __filename: false,
        __dirname: false,
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.IgnorePlugin(/vertx/),
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'server.js',
    },
}
