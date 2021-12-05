const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.ProvidePlugin({
				_: 'lodash',
				jQuery: 'jquery',
				$: 'jquery',
				'global.jQuery': 'jquery'
			}),
			//copy all game images from "games/jumper/img" to "/dist/game-images/jumper"
			new CopyWebpackPlugin([
				{
					from: './src/game/jumper/img',
					to: './game-images/jumper'
				}
			]),
			//mp3 files loader
			new webpack.LoaderOptionsPlugin({
				test: /\.mp3$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]'
				}
			})
		]
	},
	//change the app/html title
	chainWebpack: (config) => {
		config
			.plugin('html')
			.tap((args) => {
				args[0].title = 'Halloween Jumper';
				return args;
			});
	},
	css: {
		loaderOptions: {
			sass: {
				//imports the provided scss files globally (in every vue component)
				//so you don't have to import them manually
				prependData: `
					@import '@/assets/css/_variables.scss';
				`
			}
		}
	}
};
