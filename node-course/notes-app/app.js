const yargs = require('yargs');


// process.argv.forEach(arg => console.log(arg));
const {name, add} = require('./utils');
const {getNotes} = require('./notes');

yargs.command([{
    command: 'add',
    description: 'Add a note.',
    builder: {
        title: {
            description: 'Title of the note',
            demandOption: true,
            type: 'string'

        },
        body: {
            description: 'Body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(`Adding note:`)
        console.log(`Title: ${argv.title}`)
        console.log(`Body: ${argv.body}`)
    }

},
{
    command: 'remove',
    description: 'Remove a note.',
    handler: () => console.log('remove')

},
{
    command: 'list',
    description: 'List the notes.',
    handler: () => console.log('list')

},
{
    command: 'read',
    description: 'Read a note.',
    handler: () => console.log('read')

}])
yargs.parse();
