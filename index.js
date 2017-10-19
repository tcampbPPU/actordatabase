var express = require('express');
var credentials = require('./credentials.js');
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
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
 resave:false,
 saveUninitialized:false,
 secret:credentials.cookieSecret
}));
app.get("/", function(req,res){
    res.render("home");
});

<<<<<<< HEAD
// Looks for files in Public Dir
app.use(express.static(__dirname + '/public'));

// Render looks in views for file name in extenstion

// Root Dir
app.get('/', function(req, res) {
  res.render('home');
});


app.get('/login', function(req, res) {
  res.render('login');
});

// To redirect After login given
// TODO Check Login succsess
app.post('/', [function(req, res, next) {
  next();
}, function(req, res) {
  res.render('addUser');
}]);

// Movie DB Test
app.get('/addUSer', function(req, res) {
  res.render('addUser');
});

// To redirect After User has been added
app.post('/addUser', [function(req, res, next) {
  next();
}, function(req, res) {
  res.render('home');

}]);

// Date Dir
app.get('/datetime', function(req, res) {
  var date = new Date();
  res.render('datetime', { datetime: date});
=======
app.get("/search", function(req,res){
  res.render("search");
>>>>>>> 2b570f142dda5a2f61160bfc34163b7fdf7fcb82
});

app.get("/history", function(req,res){
  if(req.session.admin_id){
  }else {
    res.render("searchhistory",{admin:req.session.firstName,adminlogin:req.session.admin_id});
  }
});

app.get("/creatnewaccount", function(req,res){
  res.render("newaccount");
});
app.get("/forgotpassword", function(req,res){
  res.render("forgotpassword");
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
