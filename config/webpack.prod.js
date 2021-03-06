const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const HardSourcePlugin = require("hard-source-webpack-plugin");

const baseConfig = require("./webpack.base");
const manifest = require("../build/library/library.json");

module.exports = merge(baseConfig, {
	mode: "production",
	plugins: [
		new CleanWebpackPlugin(),
		new HardSourcePlugin(),
		new webpack.DllReferencePlugin({
			manifest,
		}),
		new Dotenv({
			path: "./.env.prod",
		}),
	],
});
