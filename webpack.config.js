var path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /(node_modules|bower_components|dist)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},{
	            test: /\.(png|jp(e*)g|svg)$/,  
	            use: [{
	                loader: 'url-loader',
	                options: { 
	                    limit: 8000, // Convert images < 8kb to base64 strings
	                    name: 'images/[hash]-[name].[ext]'
	                } 
	            }]
	        }
		]
	}
};