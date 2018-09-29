const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');
const morgan = require('morgan');


mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'productuon';

const app = express();

app.use(cors());
app.use(morgan);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'lightblog', cookie: { maxAge: 60 }, resave: false, saveUninitialized: false }));

if (!isProduction) {
    app.use(errorHandler());
}

mongoose.connect('mongodb://lir:yofiyofi1@ds115543.mlab.com:15543/react-blog');
mongoose.set('debug', true);

// Models:

require('./models/Articles');

// Routes:
//const routes = require('./routes');

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

// const server = 
app.listen(8000, () => console.log('Server started on http://localhost:8000'));







