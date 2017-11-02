var express = require('express');
//var credentials = require('./credentials.js');
var expressValidator = require('express-validator');
var formidable = require('formidable');
var mysql = require('mysql');
var fs = require('fs');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:"main"});

app.engine("handlebars",handlebars.engine);
app.set("view engine","handlebars");
app.set('port', process.env.PORT || 4000);
app.use(express.static(__dirname +'/public'));
app.use( function( req, res, next){
  res.locals.showTests = app.get(' env') !== 'production' && req.query.test === '1';
  next();
 });

app.use(require('body-parser').urlencoded({extended:true}));

app.get("/", function(req,res){
    res.render("home");
});

app.post('/', [function(req, res, next) {
  next();
}, function(req, res) {
  res.send('Hello World!');
}]);

app.get("/addUser", function(req,res){
    res.render("addUser");
});

// Gets From data from addUser Page, then redirects
app.post('/addUser', function(req, res){
  var con = mysql.createConnection({
    host : 'fkonat.it.pointpark.edu',
    user : 'lunamista',
    password : 'lunamista123',
    database : 'lunadb'
  });
  var sql = "INSERT INTO users (first_name, last_name, email, password, is_admin, sex) VALUES (?, ?, ?, ?, ?, ?)";
  var values = [req.body.first_name, req.body.last_name, req.body.email, req.body.password, 0, req.body.sex];
  con.query(sql, values, function(err, results) {
    if (err) throw err;
      con.end();
   res.redirect('/');
  }); 
});

//custom 404 page
app.use(function(req, res){
  res.status(404);
  res.render("404");
});

//custom 500 page
app.use(function(err, req, res, next){
  console.log(err.stack);
  res.status(500);
  res.render("500");
});

app.listen(app.get('port'), function(){
console.log('listening on http:// localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
