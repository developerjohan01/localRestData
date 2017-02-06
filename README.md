# localRestData

Basic Ionic2 Tab app that reads joke data from a REST service and displays jokes.
It also stores the jokes in a local SQLite database or Web SQL when developing / running in Chrome

When clicking on a individual joke record it 
reads the record from local stash/storage.
If the record isnt found we read from the REST service. 
stores the joke locally. 

To run the app you need to have Ionic2 installed and the SQLite native plugin.
`ionic plugin add cordova-sqlite-storage`
Then type `ionic serve` from the project root.
