const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: './src/app.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},
	devServer: {
		contentBase: './build'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: require.resolve('babel-loader')
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				],
				exclude: [path.resolve(__dirname, 'node_modules')]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.csv$/,
				loader: 'csv-loader',
				options: {
					dynamicTyping: true,
					header: true,
					skipEmptyLines: true
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public', 'index.html'),
			filename: 'index.html'
		}),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'data'),
				to: path.resolve(__dirname, 'build')
			}
		]),
		new MiniCssExtractPlugin({
			filename: 'bundle.css'
		})
	]
}
