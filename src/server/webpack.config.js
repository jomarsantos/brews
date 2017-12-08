const path = require('path');

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
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, '../../node_modules'),
    ],
  },
};
