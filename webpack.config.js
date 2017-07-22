var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'electron',
  module: {
    loaders: [
      { test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
      {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.less'],
    alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  },
};

// var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var autoprefixer = require('autoprefixer');
// var CopyWebpackPlugin = require('copy-webpack-plugin');
// var OfflinePlugin = require('offline-plugin');
// var path = require('path');
// const ENV = process.env.NODE_ENV || 'development';

// const CSS_MAPS = ENV!=='production';

// module.exports = {
// 	context: path.resolve(__dirname, "app"),
// 	entry: './index.js',

// 	output: {
// 		path: path.resolve(__dirname, "dist"),
// 		publicPath: '/',
// 		filename: 'bundle.js'
// 	},

// 	resolve: {
// 		extensions: ['.jsx', '.js', '.json', '.less'],
// 		modules: [
// 			path.resolve(__dirname, "app/lib"),
// 			path.resolve(__dirname, "node_modules"),
// 			'node_modules'
// 		],
// 		alias: {
// 			components: path.resolve(__dirname, "app/components"),    // used for tests
// 			style: path.resolve(__dirname, "app/style"),
// 			'react': 'preact-compat',
// 			'react-dom': 'preact-compat'
// 		}
// 	},

// 	module: {
// 		rules: [
// 			{
// 				test: /\.jsx?$/,
// 				exclude: path.resolve(__dirname, 'app'),
// 				enforce: 'pre',
// 				use: 'source-map-loader'
// 			},
// 			{
// 				test: /\.jsx?$/,
// 				exclude: /node_modules/,
// 				use: 'babel-loader'
// 			},
// 			{
// 				// Transform our own .(less|css) files with PostCSS and CSS-modules
// 				test: /\.(less|css)$/,
// 				include: [path.resolve(__dirname, 'app/components')],
// 				use: ExtractTextPlugin.extract({
// 					fallback: 'style-loader',
// 					use: [
// 						{
// 							loader: 'css-loader',
// 							options: { modules: true, sourceMap: CSS_MAPS, importLoaders: 1 }
// 						},
// 						{
// 							loader: `postcss-loader`,
// 							options: {
// 								sourceMap: CSS_MAPS,
// 								plugins: () => {
// 									autoprefixer({ browsers: [ 'last 2 versions' ] });
// 								}
// 							}
// 						},
// 						{
// 							loader: 'less-loader',
// 							options: { sourceMap: CSS_MAPS }
// 						}
// 					]
// 				})
// 			},
// 			{
// 				test: /\.(less|css)$/,
// 				exclude: [path.resolve(__dirname, 'app/components')],
// 				use: ExtractTextPlugin.extract({
// 					fallback: 'style-loader',
// 					use: [
// 						{
// 							loader: 'css-loader',
// 							options: { sourceMap: CSS_MAPS, importLoaders: 1 }
// 						},
// 						{
// 							loader: `postcss-loader`,
// 							options: {
// 								sourceMap: CSS_MAPS,
// 								plugins: () => {
// 									autoprefixer({ browsers: [ 'last 2 versions' ] });
// 								}
// 							}
// 						},
// 						{
// 							loader: 'less-loader',
// 							options: { sourceMap: CSS_MAPS }
// 						}
// 					]
// 				})
// 			},
// 			{
// 				test: /\.json$/,
// 				use: 'json-loader'
// 			},
// 			{
// 				test: /\.(xml|html|txt|md)$/,
// 				use: 'raw-loader'
// 			},
// 			{
// 				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
// 				use: ENV==='production' ? 'file-loader' : 'url-loader'
// 			}
// 		]
// 	},
// 	plugins: ([
// 		new webpack.NoEmitOnErrorsPlugin(),
// 		new ExtractTextPlugin({
// 			filename: 'style.css',
// 			allChunks: true,
// 			disable: ENV !== 'production'
// 		}),
// 		new webpack.DefinePlugin({
// 			'process.env.NODE_ENV': JSON.stringify(ENV)
// 		}),
// 		new CopyWebpackPlugin([
// 			{ from: './manifest.json', to: './' },
// 			{ from: './favicon.ico', to: './' }
// 		])
// 	]).concat(ENV==='production' ? [
// 		new webpack.optimize.UglifyJsPlugin({
// 			output: {
// 				comments: false
// 			},
// 			compress: {
// 				unsafe_comps: true,
// 				properties: true,
// 				keep_fargs: false,
// 				pure_getters: true,
// 				collapse_vars: true,
// 				unsafe: true,
// 				warnings: false,
// 				screw_ie8: true,
// 				sequences: true,
// 				dead_code: true,
// 				drop_debugger: true,
// 				comparisons: true,
// 				conditionals: true,
// 				evaluate: true,
// 				booleans: true,
// 				loops: true,
// 				unused: true,
// 				hoist_funs: true,
// 				if_return: true,
// 				join_vars: true,
// 				cascade: true,
// 				drop_console: true
// 			}
// 		}),

// 		new OfflinePlugin({
// 			relativePaths: false,
// 			AppCache: false,
// 			excludes: ['_redirects'],
// 			ServiceWorker: {
// 				events: true
// 			},
// 			cacheMaps: [
// 				{
// 					match: /.*/,
// 					to: '/',
// 					requestTypes: ['navigate']
// 				}
// 			],
// 			publicPath: '/'
// 		})
// 	] : []),

// 	stats: { colors: true },

// 	node: {
// 		global: true,
// 		process: false,
// 		Buffer: false,
// 		__filename: false,
// 		__dirname: false,
// 		setImmediate: false
// 	},

// 	devtool: ENV==='production' ? 'source-map' : 'cheap-module-eval-source-map',

// 	devServer: {
// 		port: process.env.PORT || 8080,
// 		host: 'localhost',
// 		publicPath: '/',
// 		contentBase: './app',
// 		historyApiFallback: true,
// 		open: true,
// 		proxy: {
// 			// OPTIONAL: proxy configuration:
// 			// '/optional-prefix/**': { // path pattern to rewrite
// 			//   target: 'http://target-host.com',
// 			//   pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
// 			// }
// 		}
// 	}
// };