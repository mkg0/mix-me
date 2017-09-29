const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
module.exports = {
    entry: ['webpack/hot/poll?1000', './src/index'],
    watch: true,
    target: 'node',
    node: {
        __filename: false,
        __dirname: false,
    },
    externals: [
        nodeExternals({
            whitelist: ['webpack/hot/poll?1000'],
        }),
    ],
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
        new StartServerPlugin('server.js'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'server.js',
    },
}
