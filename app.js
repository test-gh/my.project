// Dependencies
var express = require('express');
var app = express();





// CONFIGURATION

// Global configuration
app.configure(function(){
  // Set environment to PRODUCTION
  // app.set('env', 'production');

  // Template System
  var hbs = require('hbs');
  app.set('view engine', 'hbs');

  var blocks = {};
  
  hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
      block = blocks[name] = [];
    }
    block.push(context.fn(this));
  });
  
  hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');
    blocks[name] = [];
    return val;
  });
  
  // Sessions
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.urlencoded());
  app.use(express.session({secret: 'aopcz5ftg8yyt1f85e2rg4z2d8z'}));
  app.use(function(req, res, next){
    res.locals.username  = req.session.username;
    res.locals.firstname = req.session.firstname;
    res.locals.lastname  = req.session.lastname;
    res.locals.loggedin  = req.session.loggedin;
    res.locals.admin     = req.session.admin;
    res.locals.message   = req.session.message;
    delete req.session.message;
    next();
  });

// To look also : https://github.com/visionmedia/express/blob/master/examples/auth/app.js

  // Settings
  app.set('author', 'Jérémie Zitoun');

  // Show environment
  console.log('Environement: ' + app.get('env'));
})

// Development configuration
app.configure('development', function(){
  app.set('db uri', 'mysql://root:@localhost/express');
  app.use(express.logger());
})

// Production configuration
app.configure('production', function(){
  app.set('db uri', 'mysql://login:password@sql.free.fr/database');
})













var isAuth = function(req, res, next) {
  if (req.session.loggedin === true) {
    next();
  }
  else {
    res.redirect('/login');
  }
};

var isAdmin = function(req, res, next) {
  if (req.session.admin === true) {
    next();
  }
  else {
    res.redirect('/');
  }
};








// ROUTER


var home  = require('./home');
var auth  = require('./auth');
var user  = require('./user');


app.get('/',                    home.index);
app.get('/login',               auth.login);
app.get('/logout',              auth.logout);
app.get('/registration',        auth.registration);
app.get('/retrieval',           auth.retrieval);
app.get('/localusers',  isAuth, user.listlocal);
app.get('/users',       isAuth, user.list);
app.get('/user/:user',  isAuth, user.profil);

app.post('/login',        auth.authentication);
app.post('/registration', auth.register);





// Handle 404 Error: File Not Found
app.use(function(req, res) {
  res.status(404);
  res.render('error/404', {title: '404: File Not Found'});
});

// Handle 500 Error: Internal Server Error
app.use(function(error, req, res, next) {
  res.status(500);
  res.render('error/500', {title: '500: Internal Server Error', error: error});
});

// Could move the error functions on an "error" handler page if you find a way to test the 500 error execution with the 4 parameters


app.listen(1337);
