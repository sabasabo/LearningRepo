const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');


mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'productuon';

const app = express();

app.options('*', cors()) 
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(session({ secret: 'lightblog', cookie: { maxAge: 60 }, resave: false, saveUninitialized: false }));

if (!isProduction) {
    app.use(errorHandler());
}

mongoose.connect('mongodb://lir:yofiyofi1@ds115543.mlab.com:15543/react-blog').catch((reason) => console.log(" failed to connect MLab because:" + reson));
mongoose.set('debug', true);

// Models:

require('./models/Articles');

// Routes:
app.use(require('./routes'));

app.use((req, res, next) => {
    let error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// TODO: might be a bug here!!!!
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            error: isProduction ? {} : err
        }
    });

});

// Zeit Now port
const port = 443;
 
app.listen(port, function(){ 
	console.log(`Server started on http://localhost:${port}`);
});







