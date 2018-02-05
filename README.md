# brews
## Set Up
- `npm install`
- If running with local DB:
	- Ensure mongodb is installed
	- Start mongo daemon
		- Option 1: In terminal
			- `mongod`
		- Option 2: As a daemon
			- If initial run, `mkdir ~/log`
			- `mongod --fork --logpath ~/log/mongodb.log`
- `cd src/server`
- Update config.js with relevant info (ie. mongo URL)
- If you want to populate the DB with test data:
	- `cd src/server/populators`
	- `node populateWithTestData.js`
	- Check if DB was populated:
		- `mongo`
		- Switch to your DB: `use <db_name>`
		- `show collections` / `db.breweries.find()`
- Otherwise, check below for other ways of populating data
- Start (from anywhere in project):
	- Development: `npm run dev`
	- Production: `npm start`

## Data Population
### Breweries
- Add brewery details to `src/server/populators/breweries.js`
	- Follow schema provided within the file
- To populate the database:
	- `cd src/server/populators`
	- `node populateBreweries.js`
### Line Ups
- If creating a feed for the brewery, create a new file in `brews/src/server/populators` and name it using the code of the brewery (ie. 'brassneck.js')
- In `brews/src/server/populators/populators.js` add an entry for the new entry for your populator (make sure that the property matches the brewery's code exactly)
- To run lineup populators for all breweries:
	- `cd src/server/populators`
	- `node populateCurrentLineups.js.js`
- To run lineup populators for a single brewery:
	- `cd src/server/populators`
	- `node populateCurrentLineups.js.js <brewery_code>`
### Clear All Collection (Only Suggested For Development)
- To clear all database collections:
	- `cd src/server/populators`
	- `node dropAllCollections.js`
