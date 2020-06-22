const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Components = require('../components.json');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackConfig = {
    mode: 'production',
    entry: Components,
    output: {
        path: path.resolve(process.cwd(), './lib'),
        publicPath: '/dist/',
        filename: '[name]/index.js',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        vue: 'vue'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true,
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            esModule: false, // 这里设置为false
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
    ]
};

module.exports = webpackConfig;
