const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const app = express();
const path = require('path')

// Webpack
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler));

// Body Parser
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Database
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/foundation';
mongoose.connect(mongoDB, {
	useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Server
var testRouter = require('./routes/testRoute.js');
var rootRouter = require('./routes/root.js');
app.use('/api/test', testRouter);
app.use('/api', rootRouter);

// Client
app.use(express.static(__dirname + '/src/app'));
app.get('/*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'src/app/index.html'));
});

// Initialize
const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
