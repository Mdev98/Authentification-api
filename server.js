const express      = require('express');
const dotenv       = require('dotenv');
const connectDB    = require('./config/database');
const cookieParser = require('cookie-parser');
const morgan       = require('morgan');
const errorHandler = require('./middleware/error');
const color        = require('colors')

// Loads env variables 
dotenv.config({ path : './config/config.env' });

// Load database
connectDB()

// Routes files

const authRoute = require('./routes/auth');


// Initializing express app
const app = express();

app.use(express.json());

app.use(cookieParser());

if(process.env.NODE_ENV === 'developpement'){
    app.use(morgan('dev'));
}

// Mounting Route

app.use('/api/v1/auth', authRoute)

// Using middleware

app.use(errorHandler);

// Listening server

app.listen(process.env.PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.bgGreen.bold);
})
