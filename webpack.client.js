const resolve = require ('path').resolve
const webpack = require ('webpack')

module.exports = {
	entry: {
		app: [ resolve ('./client/app.js') ],
	},
	output: {
		path: resolve ('./static'),
		publicPath: '/',
		filename: 'bundle.[name].js',
	},
	target: 'web',
	module: {
		rules: [
			{
				test: /\.js$/,
				include: resolve ('.'),
				exclude: resolve ('./node_modules'),
				use: [ {
					loader: 'babel-loader',
					options: {
						presets: [ 'react', 'env' ],
					},
				} ],
			},
			{
				test: /\.css$/,
				include: resolve ('.'),
				use: [ 'style-loader', 'css-loader' ],
			},
		],
	},
	resolve: {
		modules: [ resolve ('.'), 'node_modules' ],
		extensions: [ '.js', '.css' ],
	},
	plugins: [
		...(process.env.NODE_ENV === 'production' ? [
			new webpack.optimize.UglifyJsPlugin (),
			new webpack.optimize.AggressiveMergingPlugin (),
		] : [
			new webpack.NoEmitOnErrorsPlugin (),
		]),
	],
	devtool: process.env.NODE_ENV !== 'production' ? 'cheap-module-eval-source-map' : false,
	performance: {
		hints: false,
	},
}
