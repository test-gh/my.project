exports.index = function(req, res){
  var data = {
    title: 'My Home'
  };

  res.render('home', data);
};
