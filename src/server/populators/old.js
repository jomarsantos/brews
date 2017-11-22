var request = require('request');
var cheerio = require('cheerio');
var url = '';
var brew = {};
var tap = []; // TODO: move to database
var fills = []; // TODO: move to database

// BREW FIELDS
// brewery
// name
// shortDesc
// longDesc
// abv
// ibu

// BRASSNECK BREWERY
url = 'http://brassneck.ca/';
request(url, function(err, resp, body) {
	if (err)
	throw err;
	$ = cheerio.load(body);

	// TAP
	$('#ontap-footer ul li .beertitle').each(function(i) {
		brew = {}
		brew.brewery = 'Brassneck Brewery'
		brew.name = $(this)
			.text().trim();
		brew.shortDesc = $(this).parent().clone()
			.find("span:contains('kind:')")
			.parent().children().remove().end()
			.text().trim();
		brew.abv = $(this).parent().clone()
			.find("span:contains('abv:')")
			.parent().children().remove().end()
			.text().trim();
		brew.ibu = '';
		url = $(this).parent().attr('href');
		request(url, (function(brew) {
			return function(err, resp, body) {
				if (err)
				throw err;
				$ = cheerio.load(body);
				brew.longDesc = $('#content .thecontent').text().trim().replace(/\r?\n|\r/g, '');
				tap.push(brew);
			};
		})(brew));
	});

	// FILLS
	// $('#fills-footer ul li .beertitle').each(function(i) {
	// 	brew = {}
	// 	brew.brewery = 'Brassneck Brewery'
	// 	brew.name = $(this)
	// 		.text().trim();
	// 	brew.shortDesc = $(this).parent().clone()
	// 		.find("span:contains('kind:')")
	// 		.parent().children().remove().end()
	// 		.text().trim();
	// 	brew.abv = $(this).parent().clone()
	// 		.find("span:contains('abv:')")
	// 		.parent().children().remove().end()
	// 		.text().trim();		brew.ibu = '';
	// 		url = $(this).parent().attr('href');
	// 	request(url, (function(brew) {
	// 		return function(err, resp, body) {
	// 			if (err)
	// 			throw err;
	// 			$ = cheerio.load(body);
	// 			brew.longDesc = $('#content .thecontent').text().trim().replace(/\r?\n|\r/g, '');
	// 			fills.push(brew);
	// 		};
	// 	})(brew));
	// });
});

// STORM BREWING
url = 'https://static.wixstatic.com/sites/c5ad2c_2f7779451277052594b9c51acaa08a91_542.json.z?v=3';
request(url, function(err, resp, body) {
	if (err)
	throw err;
	body = JSON.parse(body).data.document_data.c1ksg.text;
	$ = cheerio.load(body);

	// TAP
	$('p').each(function(i) {
		if (i % 3 == 0) {
			brew = {}
			brew.brewery = 'Storm Brewing'
			var nameAndABV = $(this).find('span span').text().split(' - ');
			brew.name = nameAndABV[0];
			brew.shortDesc = '';
			brew.abv = nameAndABV[1] || '';
			brew.abv = brew.abv.split(' ')[0]
			brew.ibu = ''
		} else if (i % 3 == 1) {
			brew.longDesc = $(this).find('span').text()
			tap.push(brew);
		}
	});
});

// FILLS
// $('#fills-footer ul li .beertitle').each(function(i) {
// 	brew = {};
// 	brew.brewery = 'Brassneck Brewery'
// 	brew.name = $(this)
// 		.text().trim();
// 	brew.description = $(this).parent().clone()
// 		.find("span:contains('kind:')")
// 		.parent().children().remove().end()
// 		.text().trim();
// 	brew.abv = $(this).parent().clone()
// 		.find("span:contains('abv:')")
// 		.parent().children().remove().end()
// 		.text().trim();		brew.ibu = '';
// 	fills.push(brew);
// });
//






setTimeout(function(){
	console.log(tap);
}, 2000);
