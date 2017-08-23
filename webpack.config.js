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
                test: /\.scss$/,
                include: resolve ('.'),
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            },
			{
				test: /\.js$/,
				include: resolve ('.'),
				exclude: resolve ('./node_modules'),
				use: [ {
					loader: 'babel-loader',
					options: {
						presets: [ 'env' ],
						plugins: [ 'inferno', 'transform-class-properties' ],
					},
				} ],
			},
		],
	},
	resolve: {
		modules: [ resolve ('.'), 'node_modules' ],
		extensions: [ '.js', '.css' ],
	},
	plugins: [
		new webpack.ProvidePlugin ({
			'_': 'lodash',
			'c': 'classnames',
			'Inferno': 'inferno',
			'Component': 'inferno-component',
		}),
		new webpack.DefinePlugin ({
			'process.env.NODE_ENV': JSON.stringify (process.env.NODE_ENV),
		}),
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
