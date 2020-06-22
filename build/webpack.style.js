const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const scssJson = require("../scss.json")

module.exports = {
    mode: 'production',
    entry: './packages/theme/src/index.scss',
    output: {
        path: path.resolve(process.cwd(), './lib'),
        publicPath: '/dist/',
        filename: 'index.js',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
}