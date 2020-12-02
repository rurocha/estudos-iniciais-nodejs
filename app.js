const express = require('express');
const routes = require('./routes');
const mustache = require('mustache-express');

const app = express();
app.use('/', routes);

// setando a view engine, argumentos para pasta path partials + extensao
app.engine('mst', mustache(__dirname+'/views/partials', '.mst'));
 
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

module.exports = app