const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        app:  [
            "react-hot-loader/patch",
            path.join(__dirname,"../client/app.js")
        ]         
    },
    output: {
        filename: "[name].[hash].js",
        path: path.join(__dirname,"../dist"),
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: "babel-loader"
            },
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: [
                    path.join(__dirname, "../node_modules")
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../client/template.html")
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: "localhost",
        port: "8888",
        compress: true,
        contentBase: path.join(__dirname,"../dist"),
        hot: true,
        overlay: {
            errors: true
        }
       // publicPath: "/public",
        // historyApiFallback: {
        //     index: "/public/index.html"
        // }
    }
}
