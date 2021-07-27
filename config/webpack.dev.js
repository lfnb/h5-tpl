const path = require("path");

const { merge } = require("webpack-merge");

const webpack = require("webpack");

const Dotenv = require("dotenv-webpack");

const baseConfig = require("./webpack.base");
const manifest = require("../build/library/library.json");


module.exports = merge(baseConfig, {
	mode: "development",

	plugins: [
		new webpack.HotModuleReplacementPlugin(),

		new webpack.DllReferencePlugin({
			manifest,
		}),

		new Dotenv({
			path: "./.env.dev",
		}),
	],

	devServer: {
		contentBase: path.resolve(__dirname, `../dist`),

		hot: true,

		port: 8080,

		// open: 'Google Chrome',
	},
});
