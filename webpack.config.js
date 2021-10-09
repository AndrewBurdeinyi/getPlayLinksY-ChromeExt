const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    devtool: 'eval',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'script.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/manifest.json", to: "./" },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ],
            },
        ],
    },
};