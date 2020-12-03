const express = require('express');
const routes = require('./routes');
const mustache = require('mustache-express');
const helpers = require('./helpers');
const app = express();

// setando helpers
app.use((req, res, next) => {
  res.locals.helpers = helpers
  next();
});

app.use('/', routes);
// setando a view engine, argumentos para pasta path partials + extensao
app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));

app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

module.exports = app