const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Import routes from routes.js
let apiRoutes = require("./api/routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.use(cors());
app.options('*', cors());

// Connect to MongoDB using docker image
mongoose
  .connect('mongodb://mongo:27017/outfittr', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// database and port
var db = mongoose.connection;
var port = process.env.PORT || 3000;

// Default url
app.get('/', (req, res) => res.send('Hello World'));

app.listen(port, () => console.log('Server running on port ' + port));