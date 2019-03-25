const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();

module.exports = app // testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  // Import routes from routes.js
  let apiRoutes = require("./api/routes");

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/', apiRoutes);
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
  app.get('/', (req, res) => res.send('Outfittr'));
  app.listen(port, () => console.log('Server running on port ' + port));
});