## brews
# Set Up
- `npm install`
- If running with local DB:
	- Ensure mongodb is installed
	- Start mongo daemon
		- Option 1: In terminal
			- `mongod`
		- Option 2: As a daemon
			- If initial run, `mkdir ~/log`
			- `mongod --fork --logpath ~/log/mongodb.log`
- `cd /brews/src/server`
- Update config.js with relevant info (ie. mongo URL)
- If you want to populate the DB with test data:
	- Run `node populateWithTestData.js`
	- Check if DB was populated:
		- `mongo`
		- Switch to your DB: `use <db_name>`
		- `show collections` / `db.breweries.find()`
- Start (from anywhere in project):
	- Development: `npm run dev`
	- Production: `npm start`
