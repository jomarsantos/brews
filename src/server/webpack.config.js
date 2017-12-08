const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: [
    '../client/main.js',
  ],
  output: {
		path: '/',
    filename: 'bundle.js',
		publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
			{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true
    })
  ],
  resolve: {
    modules: [
      path.join(__dirname, '../../node_modules'),
    ],
  },
};
