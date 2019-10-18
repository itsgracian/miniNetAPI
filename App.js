const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./src/routes/Index');
// configure dotenv
dotenv.config();
// initial app
const App = express();
const Port = process.env.PORT || 8000;
// cors
App.use(cors());

// morgan
App.use(morgan('dev'));
// body parser configuration
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));

// config routes
App.use('/api', routes);
App.listen(Port, () => {
  console.log(`App started on Port ${Port}`);
});
