const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    './app/main.js',
  ],
  output: {
		path: '/',
    filename: 'bundle.js',
		publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
};
