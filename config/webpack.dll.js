const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        library: [
            'react',
            'react-dom',
            'react-router-dom'
        ]
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../build/library'),
        library: '[name]',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname,'../build/library/[name].json')
        })
    ]
}