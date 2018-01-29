var config = require('./config');
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

// Public Assets
app.use(express.static(path.resolve(__dirname, '../../public')));

// Database
var mongoose = require('mongoose');
var mongoDB = config.mongoURL;
mongoose.connect(mongoDB, {
	useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Server
var currentBrewsRouter = require('./routes/currentBrews.js');
var loginRouter = require('./routes/login.js');
var userRouter = require('./routes/user.js');
var rootRouter = require('./routes/root.js');
var breweryRouter = require('./routes/brewery.js');
// Routes
app.use('/api/currentBrews', currentBrewsRouter);
app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);
app.use('/api/brewery', breweryRouter);
app.use('/api', rootRouter);

// Client
app.use(express.static('../client'));
app.get('/*', function response(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

// Initialize
const server = app.listen(config.port, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
