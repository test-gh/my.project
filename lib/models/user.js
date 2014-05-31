// Get User info for authentication and session initialization
exports.getUser = function(username, cb) {
  username = username.toLowerCase();
  var mysql = require('mysql');
  var db = mysql.createConnection('mysql://root:@localhost/express');
  db.connect();
  db.query("SELECT user_id, username, firstname, lastname, password, admin FROM users WHERE LOWER(username)=? LIMIT 1", [username], function(err, users) {
    if (err) throw err;
    if(users.length > 0){
      var user = users[0];
      return cb(null, user);
    }
    else {
      return cb(null, null);
    }
  });
  db.end();
}


// Get list of users
exports.getUsers = function(cb) {
  var mysql = require('mysql');
  var db = mysql.createConnection('mysql://root:@localhost/express');
  db.connect();
  db.query("SELECT username, firstname, lastname, email FROM users ORDER BY username ASC", function(err, users) {
    if (err) throw err;
    return cb(null, users);
  });
  db.end();
}


// Check existence of a user / Count the number of users by username (should be 0 or 1)
exports.countUser = function(username, cb) {
  username = username.toLowerCase();
  var mysql = require('mysql');
  var db = mysql.createConnection('mysql://root:@localhost/express');
  db.connect();
  db.query("SELECT COUNT(*) as count FROM users WHERE LOWER(username)=?", [username], function(err, count) {
    if (err) throw err;
    return cb(null, count[0].count);
  });
  db.end();
}


// Insert a new user
exports.insertUser = function(username, password, firstname, lastname, email, cb) {
  email = email.toLowerCase();
  var mysql = require('mysql');
  var db = mysql.createConnection('mysql://root:@localhost/express');
  db.connect();
  db.query("INSERT INTO users (username, password, firstname, lastname, email) VALUES (?, ?, ?, ?, ?)", [username, password, firstname, lastname, email], function(err) {
    if (err) throw err;
    return cb(null);
  });
  db.end();
}
