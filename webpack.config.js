/**
 * Created by happyu on 2017/10/9.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        index: './index.js', // 配置入口文件
    },
    output: {
        filename: 'js/[name].js', // 打包输出文件的名称
        path: path.resolve(__dirname, 'dist') // 打包输出文件的路径
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: path.resolve(__dirname, 'node_modules/'),
                include: [path.resolve(__dirname,'index.js'), path.resolve(__dirname, 'src/')],
                use: [
                    "babel-loader"
                ]
            },
            {
                test: /.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader","less-loader"
                    ]
                })
            },
            {
                test: /.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader"
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/[name].js'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // 热替换
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300
        },
        port: '8080', //设置端口号
        //其实很简单的，只要配置这个参数就可以了
        proxy: {
            '/api/*': {
                target: 'http://localhost:3001',
                secure: false,
                changeOrigin: true
            }
        }

    }
};