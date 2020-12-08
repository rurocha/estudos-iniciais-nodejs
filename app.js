const express = require('express');
const routes = require('./routes');
const mustache = require('mustache-express');
const helpers = require('./helpers');
const app = express();

// setando a view engine, argumentos para pasta path partials + extensao
app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));

app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

// setando helpers
app.use((req, res, next) => {
  res.locals.helpers = helpers
  next();
});

// setando a raiz para as rotas
app.use('/', routes);

// caso nenhuma rota encontrada, renderizar a view 404
app.use('*', (req, res) => res.render('404'))

module.exports = app