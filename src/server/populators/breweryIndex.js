//// Used to import breweries

var config = require('../config');

//// SCHEMA:
//// NOTE: Set unused fields to false
// {
// 	code: '',
// 	logo: '',
// 	name: '',
// 	description: '',
// 	address: '',
// 	city: '',
// 	province: '',
// 	country: '',
// 	postal: '',
// 	website: '',
// 	twitter: '',
// 	instagram: '',
// 	facebook: '',
// 	youtube: '',
// 	currentTapLineup: '',
// 	currentTakeoutLineup: '',
// 	importActivated: ''
// }

module.exports = [
	{
		code: 'brassneck',
		logo: config.baseURL + '/images/logo_brassneck_dark.png',
		name: 'Brassneck Brewery',
		description: 'The public space at Brassneck, i.e. the Growler Shop & Tasting Room are designed to have you, our customers feel as though you are part of our process. The brew house & cellar wrap around the tasting room & growler shop putting you in the very heart of the Brewery.',
		address: '2148 Main Street',
		city: 'Vancouver',
		province: 'BC',
		country: 'Canada',
		postal: false,
		website: 'http://brassneck.ca/',
		twitter: 'brassneckbrew',
		instagram: 'brassneckbrew',
		facebook: 'https://www.facebook.com/pages/Brassneck-Brewery/661469417210968',
		youtube: false,
		currentTapLineup: false,
		currentTakeoutLineup: false,
		importActivated: true
	},
	{
		code: '33acres',
		logo: config.baseURL + '/images/logo_33acres_dark.png',
		name: '33 Acres Brewing Co.',
		description: 'Our space is located in Vancouver near a synthesis of forest and the Pacific. Itʼs here weʼve carved out a space to foster collectivity and fine craft beer. We hold that quality product exists in solidarity with working among friends, family, and community. This is an inclusive space; we value innovation in both our craft and design. Our common area was created to align these fundamentals with the simple aesthetics of our surrounding environment.',
		address: '15 W 8th Ave',
		city: 'Vancouver',
		province: 'BC',
		country: 'Canada',
		postal: false,
		website: 'http://33acresbrewing.com/',
		twitter: '33acres',
		instagram: '33acresbrewing',
		facebook: 'https://www.facebook.com/33AcresBrewing',
		youtube: false,
		currentTapLineup: false,
		currentTakeoutLineup: false,
		importActivated: true
	},
	{
		code: 'strangefellows',
	  logo: config.baseURL + '/images/logo_strangefellows_dark.png',
		name: 'Strange Fellows Brewing',
		description: 'We are an East Vancouver craft brewery inspired by tradition and creativity, and go beyond the ordinary to celebrate that which is strange* and extraordinary. The beer we make is influenced both by old world traditions and West coast ingenuity as well as by seasonal ingredients. Our barrel programme promises unique aged beers, and we have a bit of a thing for sour beer.',
		address: '1345 Clark Drive',
		city: 'Vancouver',
		province: 'BC',
		country: 'Canada',
		postal: false,
		website: 'https://strangefellowsbrewing.com/',
		twitter: 'Strange_Fellows',
		instagram: 'strangefellowsbrewing',
		facebook: 'https://www.facebook.com/strangefellowsbrewing/',
		youtube: false,
		currentTapLineup: false,
		currentTakeoutLineup: false,
		importActivated: true
	}
]
