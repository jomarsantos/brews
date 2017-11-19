const url = 'http://brassneck.ca'

var request = require('request');
var cheerio = require('cheerio');

var errors = []

module.exports = {
  execute: function (callback) {
		console.log('Scrape, save, return.');
		callback(null, null);
  }
};
