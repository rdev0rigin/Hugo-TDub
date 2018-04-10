const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const extractTextPluginOptions = { filename: '[name].css', allChunks: true, disable: false };

const plugins = [
	new UglifyJsPlugin({
		parallel: true,
		uglifyOptions: {
			ie8: false,
			ecma: 6,
			warnings: true,
			mangle: isProd,
			output: {
				comments: false,
				beautify: !isProd,
			}
		},
		sourceMap: true
	}),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(nodeEnv)
		}
	}),
	new webpack.LoaderOptionsPlugin({
		options: {
			tslint: {
				emitErrors: true,
				failOnHint: true
			}
		}
	}),
	new ExtractTextPlugin(extractTextPluginOptions)
];

const config = {
	devtool: isProd ? 'hidden-source-map' : 'source-map',
	context: path.resolve('./src'),
	entry: {
		index: './index.ts',
	},
	output: {
		path: path.resolve('./static'),
		filename: '[name].bundle.js',
		sourceMapFilename: '[name].bundle.map',
		devtoolModuleFilenameTemplate: function(info) {
			return 'file:///' + info.absoluteResourcePath
		}
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.ts?$/,
				exclude: ['node_modules'],
				use: ['awesome-typescript-loader', 'source-map-loader']
			},
			{
				test: /\.(js|ts)$/,
				loader: 'istanbul-instrumenter-loader',
				exclude: [/\/node_modules\//],
				query: {
					esModules: true
				}
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(
					Object.assign(
						{
							fallback: {
								loader: require.resolve('style-loader'),
								options: {
									hmr: false,
								},
							},
							use: [
								{
									loader: require.resolve('css-loader'),
									options: {
										importLoaders: 1,
										minimize: true,
										sourceMap: true,
									},
								},
								{
									loader: require.resolve('postcss-loader'),
									options: {
										ident: 'postcss',
										plugins: () => [
											require('postcss-flexbugs-fixes'),
											require('autoprefixer')({
												browsers: [
													'>1%',
													'last 4 versions',
													'Firefox ESR',
													'not ie < 9',
												],
												flexbox: 'no-2009',
											}),
										],
									},
								},
							],
						},
					)
				),
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: plugins,
};

module.exports = config;
