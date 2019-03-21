// object where we will write our config

const path = require('path'); // to include built-in node module, it provides us a path resolve method at line 8
const HtmlWebpackPlugin = require('html-webpack-plugin'); // to require(include) html-webpack pugin

module.exports = {
	entry: ['@babel/polyfill', './src/js/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js' // this file is injected in our final (dist) indx.html file
	},
	devServer: { // for webpack-dev-server: auto refresh browser when changes are made
		contentBase: './dist'
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html', //html file inside dist folder, ready to be deployed on production(can delete this file as the plugin can autocopy index.html from src)
			template: './src/index.html' // html file inside src folder, for development purpose
		})
	],
	module: { // setup for Babel: this is the defined way of writing Babel's working 
		rules: [ 
			{
				test: /\.js$/, // all files ending with '.js' are to be compiled by babel
				exclude: /node_modules/, // don't include/compile files inside the node_modules folder
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}  
};