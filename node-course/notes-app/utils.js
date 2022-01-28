const fs = require('fs');
const NOTES_FILE = 'notes.txt';
const read = () => {
    const dataBuffer = fs.readFileSync(NOTES_FILE);
    const jsonData = dataBuffer.toString();
    return JSON.parse(jsonData);
}

const write = (note) => {
    fs.appendFileSync(NOTES_FILE, JSON.stringify(note));
}

module.exports = {
    read, write
}