const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    devServer: {
        contentBase: "./dist",
        open: true,
        port: 3000,
        hot: true,
        hotOnly: true
        // 跨域代理
        // proxy:{
        //     './api':'http://localhost:3000'
        // },
    },
    devtool: "cheap-module-eval-source-map",
    entry: {
        main: "./src/index.js"
        // sub: './src/index.js'
    },
    output: {
        publicPath: "/",
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    // options: {
                    //     presets: [ 
                    //         [
                    //             "@babel/preset-env",
                    //             {
                    //                 // 更具浏览器版本来编译js
                    //                 targets: {
                    //                     browsers: [">1%", "not ie<=8"]
                    //                 },
                    //                 // 根据代码来打包polyfill，减少代码冗余
                    //                 useBuiltIns: "usage",
                    //                 corejs: "^3.0.1"
                    //             }
                    //         ],
                    //         ["@babel/preset-react"]
                    //     ]
                    // }
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2
                        }
                    },
                    // 'sass-loader',
                    "postcss-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        // placehoder 占位符
                        name: "[name]_[hash].[ext]",
                        // 打包到dist下文件夹
                        outputPath: "images/", 
                        limit: 10240  // 字节 
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico"
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};
