exports.login = function(req, res){
  var data = {
    title: 'Login'
  };
  res.render('auth/login', data);
};



exports.authentication = function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  var user = require(__dirname + '/lib/models/user.js');
  user.getUser(username, function(err, user) {
    // if (err) { return done(err); }
    if(user) {
      var bcrypt = require('bcrypt-nodejs');
      bcrypt.compare(password, user.password, function(err, compare) {
        if(compare == true) {
          req.session.user_id   = user.user_id;
          req.session.username  = user.username;
          req.session.firstname = user.firstname;
          req.session.lastname  = user.lastname;
          req.session.loggedin  = true;
          if(user.admin == 1){
            req.session.admin = true;
          }
          else {
            req.session.admin = false;
          }
          res.redirect('/');
        }
        else {
          req.session.message = 'Wrong password';
          res.redirect('/login');
        }
      });
    }
    else {
      req.session.message = '«' + username + '» is an unknown user';
      res.redirect('/login');
    }
  })
};




exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
};






exports.registration = function(req, res){
  var data = {
    title: 'Registration'
  };
  res.render('auth/registration', data);
};



exports.register = function(req, res){
  var username  = req.body.username;
  var password  = req.body.password;
  var firstname = req.body.firstname;
  var lastname  = req.body.lastname;
  var email     = req.body.email;

  var user = require(__dirname + '/lib/models/user.js');
  user.countUser(username, function(err, count) {
    // if (err) { return done(err); }
    if(count > 0) {
      req.session.message = 'Sorry, this username is not available';
      res.redirect('/registration');
    }
    else {
      var bcrypt = require('bcrypt-nodejs');
      bcrypt.hash(password, null, null, function(err, password_hash) {
        user.insertUser(username, password_hash, firstname, lastname, email, function(err) {
          // if (err) { return done(err); }
          res.redirect('/users');
        })
      });
    }
  })

};






exports.retrieval = function(req, res){
  var data = {
    title: 'Password Retrieval'
  };
  res.render('auth/retrieval', data);
};

