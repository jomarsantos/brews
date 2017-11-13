## brews
# Set Up
- `npm install`
- If running with local database:
	- Ensure mongodb is installed
	- Start mongo daemon
		- Option 1: In terminal
			- `mongod`
		- Option 2: As a daemon
			- If initial run, `mkdir ~/log`
			- `mongod --fork --logpath ~/log/mongodb.log`
- Update config.js with relevant info (ie. mongo URL)
- `mongo`
- If you want to populate the DB with test data:
	- Run `node populateWithTestData.js`
- Start:
	- Development: `npm run dev`
	- Production: `npm start`
