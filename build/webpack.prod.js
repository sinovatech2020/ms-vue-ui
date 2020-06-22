const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')


module.exports = {
    mode: 'production',
    entry: {
        app: ['./src/index.js'],
    },
    output: {
        path: path.resolve(process.cwd(), './lib'),
        publicPath: '/dist/',
        filename: 'index.js',
        chunkFilename: '[id].js',
        libraryTarget: 'umd',
        libraryExport: 'default',
        library: 'MS',
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
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', {
                        discardComments: {
                            removeAll: true,
                        },
                        normalizeUnicode: false
                    }]
                },
                canPrint: true
            })
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}
