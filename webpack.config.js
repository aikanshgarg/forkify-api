// object where we will write our config

const path = require('path'); // to include built-in node module, it provides us a path resolve method at line 8
const HtmlWebpackPlugin = require('html-webpack-plugin'); // to require(include) html-webpack plugin

module.exports = {
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js'
	},
	devServer: {
		contentBase: './dist'
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		})
	]
};