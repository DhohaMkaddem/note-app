const fs = require('fs');

// STEP 1: Reading JSON file
const notes = require('./note');

// Defining new user
let user = {
	name: 'New User',
	age: 30,
	language: ['PHP', 'Go', 'JavaScript'],
};

// STEP 2: Adding new data to notes object
notes.push(user);

// STEP 3: Writing to a file
fs.writeFile('note.json', JSON.stringify(notes), err => {
	// Checking for errors
	if (err) throw err;

	console.log('Done writing'); // Success
});
