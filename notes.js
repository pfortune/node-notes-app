const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicate = notes.find(note => note.title === title);

  debugger;

  if (!duplicate) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
  } else {
    console.log(chalk.red.inverse('Note title taken.'));
  }
};

const removeNote = title => {
  const notes = loadNotes();

  // filtering the note to be removed out
  const notesToKeep = notes.filter(note => {
    return note.title !== title;
  });

  if (notesToKeep.length < notes.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse('Note removed!'));
  } else {
    console.log(chalk.red.inverse('No notes to remove!'));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.bold.yellowBright.inverse('Your Notes:'));

  for (const note of notes) {
    console.log('- ' + chalk.magentaBright(note.title));
  }
};

const readNote = title => {
  const notes = loadNotes();

  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(`
    Title:  ${chalk.bold.green(note.title)}
    Body:   ${note.body}
    `);
  } else {
    console.log(chalk.red.bold('No note found with that title.'));
  }
};

const loadNotes = () => {
  try {
    const buffer = fs.readFileSync('notes.json');
    const data = buffer.toString();
    const notes = JSON.parse(data);

    return notes;
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  const data = JSON.stringify(notes);
  fs.writeFileSync('notes.json', data);
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
