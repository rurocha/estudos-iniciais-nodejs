const express = require('express');
const mustache = require('mustache-express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const app = express();
const routes = require('./routes');
const helpers = require('./helpers');


// setando a view engine, argumentos para pasta path partials + extensao
app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));

app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

app.use(cookieParser(process.env.SECRET));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());

//setando login
app.use(passport.initialize());
app.use(passport.session());
const User = require('./models/User');
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// setando helpers
app.use((req, res, next) => {
  res.locals.helpers = {...helpers};
  res.locals.flashes = req.flash();
  res.locals.user = req.user;

  if(req.isAuthenticated()) {
    res.locals.helpers.menu = res.locals.helpers.menu.filter(item => item.canLoggedView);
  } else {
    res.locals.helpers.menu = res.locals.helpers.menu.filter(item => item.canGuestView);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// setando a pasta publica
app.use(express.static(__dirname+'/public'));
// setando a raiz para as rotas


//setando rotas;
app.use('/', routes);
// caso nenhuma rota encontrada, renderizar a view 404
app.use('*', (req, res) => res.render('404'))

module.exports = app