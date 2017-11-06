## foundation
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
- Update server.js with relevant mongo url
- `mongo`
- Start:
	- Development: `npm run dev`
	- Production: `npm start`
