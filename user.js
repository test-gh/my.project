exports.listlocal = function(req, res){
  // My Fake User Database
  var users = [
    { username: 'Dr. No',    firstname: 'Yes',    lastname: 'No',      email: 'dr.no@blackhole.io' },
    { username: 'Mrs Smith', firstname: 'Stan',   lastname: 'Smith',   email: 'mrs.smith@blackhole.io' },
    { username: 'GLaDOS',    firstname: 'Glad',   lastname: 'Os',      email: 'glados@blackhole.io' },
    { username: 'Jérôme',    firstname: 'Jérôme', lastname: 'Opoulai', email: 'jerome@blackhole.io' },
    { username: 'foo/bar',   firstname: 'Foo',    lastname: 'Bar',     email: 'foobar@blackhole.io' }
  ];

  var data = {
    title: 'User list',
    users: users
  };
  res.render('user/list', data);
};




exports.list = function(req, res){
  var user = require(__dirname + '/lib/models/user.js');
  user.getUsers(function(err, users) {
    // if (err) { return done(err); }
    var data = {
      title: 'Users from my database',
      users: users
    };
    res.render('user/list', data);
  })
};





exports.profil = function(req, res){
  var user = req.params.user;
  var data = {
    title: 'Profile of ' + user,
    user: user
  };
  res.render('user/profil', data);
};

