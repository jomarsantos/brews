var config = {};

config.prod = {};
config.dev = {};
config.test = {};

config.prod.mongoURL = 'mongodb://127.0.0.1:27017/brews';
config.prod.port = '3000';

config.dev.mongoURL = 'mongodb://127.0.0.1:27017/brewsDev';
config.dev.port = '3000';

config.test.mongoURL = 'mongodb://127.0.0.1:27017/brewsTest';
config.test.port = '3000';


// TODO: depending on environment, set config to specific one
// ie. config = config.prod if PRODUCTION environment
// use dev for now
config = config.dev;

module.exports = config;
