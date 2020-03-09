const fs = require('fs');
const notes = require('./note');
const argsList = process.argv.splice(2);
const cmd = argsList[0];
const titleCmd = argsList[1] && (argsList[1].split('=')[0] === '--title' || '-t');
const title = titleCmd && argsList[1].split('=')[1];
const bodyCmd = argsList[2] && (argsList[2].split('=')[0] === '--body' || '-b');
const body = bodyCmd && argsList[2].split('=')[1];

const help = () => {
	console.log(`options: 
                      --help,                 show help
                      --title, -t             add a title
	                    --body,  -b             add	a body`);
};
const removeNote = title => {
	fs.readFile('note.json', (err, data) => {
		const notes = JSON.parse(data);
		const filteredNotes = notes.filter(note => note.title !== title);
		fs.writeFile('note.json', JSON.stringify(filteredNotes), err => {
			if (err) throw err;
			console.log('Done writing'); // Success
		});
	});
};
const readNote = () => {
	console.log('from read note');
	fs.readFile('note.json', function(err, data) {
		// Check for errors
		if (err) throw err;

		// Converting to JSON
		const notes = JSON.parse(data);

		console.log('notes', notes);
	});
};

const searchNote = title => {
	fs.readFile('note.json', function(err, data) {
		if (err) throw err;

		const notes = JSON.parse(data);
		console.log(Object.values(notes[0])[0]);
		for (const iterator of Object.keys(notes)) {
			if (Object.values(notes[iterator])[0] === title) {
				console.log(notes[iterator]);
				return;
			} else {
				console.log('not found');
			}
		}
	});
};

const addNote = note => {
	console.log('note from add:', note);
	notes.push(note);
	fs.writeFile('note.json', JSON.stringify(notes), err => {
		if (err) throw err;
		console.log('Done writing'); // Success
	});
};

const noteApp = () => {
	switch (cmd) {
		case 'add': {
			if (titleCmd && bodyCmd) {
				addNote({
					title,
					body,
				});
			} else {
				help();
			}
			break;
		}
		case 'list': {
			readNote();
			break;
		}

		case '--find':
		case '-f': {
			searchNote(argsList[1]);
		}
		case '--remove':
		case '-r': {
			if (titleCmd) {
				removeNote(argsList[1]);
			} else {
				help();
			}

			break;
		}

		default: {
			help();
		}
	}
};

console.log('****** welcome dont forget to note any crazy idea that traverse your mind feel free******');
noteApp();
