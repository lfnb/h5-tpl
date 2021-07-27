const path = require("path");

const glob = require("glob");

const fs = require("fs");

const WebpackBar = require("webpackbar");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const TerserPlugin = require("terser-webpack-plugin");

const CopyPlugin = require("copy-webpack-plugin");

const basePath = path.resolve(__dirname, "../src");

// const pageEntry = process.env.npm_config_module;

const template = path.resolve(__dirname, "../public/index.html");

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
	entry: ["./src/apps/pages/index.js"],

	module: {
		rules: [
			{
				test: /\.(js|tsx)$/,

				use: [
					// {

					//     loader: 'thread-loader',

					//     options: {

					//         workers: 4

					//     }

					// },

					{
						loader: "babel-loader",

						options: {
							cacheDirectory: true,
						},
					},
				],

				include: [basePath],
			},

			{
				test: /\.(css|less)$/,

				use: [
					MiniCssExtractPlugin.loader,

					{
						loader: "css-loader",

						options: {
							import: true,
							importLoaders: 2,
							modules: {
								localIdentName: "[local]--[hash:base64:5]",
							},
						},
					},

					{
						loader: "postcss-loader",
					},

					"less-loader",
				],

				include: [basePath],
			},

			{
				test: /\.(jpg|jpeg|png|gif)$/,

				use: [
					{
						loader: "file-loader",

						options: {
							name: (file) => {
								const match = file.match(/src\/apps\/(.*)\/assets/);

								const filename = match && match[1];

								return `${filename}/assets/[name]_[hash:8].[ext]`;
							},
						},
					},
				],

				include: [basePath],
			},

			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,

				use: ["file-loader"],

				include: [basePath],
			},
		],
	},

	plugins: [
		new WebpackBar(),

		new MiniCssExtractPlugin({
			filename: "[name]/pages/[name]_[contenthash:8].css",
		}),

		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,

			// eslint-disable-next-line global-require
			cssProcessor: require("cssnano"),
		}),

		new CopyPlugin({
			patterns: [{ from: "./build/", to: "../dist/" }],
		}),
		new HtmlWebpackPlugin({
			template,
			filename: `index.html`,
			inject: true,
		}),
	],

	resolve: {
		extensions: [".tsx", ".ts", ".js", ".less"],
	},

	output: {
		filename: "[name]/pages/[name]_[hash:8].js",

		path: path.resolve(__dirname, "../dist"),

		publicPath: "/",
	},

	optimization: {
		minimize: true,

		minimizer: [
			new TerserPlugin({
				parallel: true,

				cache: true,
			}),
		],
	},

	stats: "errors-only",
});
