const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
// Route Files

//load env vars
dotenv.config({ path: './config/config.env' });

//connect to datbase;
connectDB();

const bootcamps = require('./routes/bootcamps');
const PORT = process.env.PORT || 5000;

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcamps);

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`).red.bold;
  // CLose server and exit process
  server.close(() => process.exit(1));
});
