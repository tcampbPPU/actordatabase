var express = require('express');
//var credentials = require('./credentials.js');
var expressValidator = require('express-validator');
var formidable = require('formidable');
var mysql = require('mysql');

var con = mysql.createConnection({
  host : 'fkonat.it.pointpark.edu',
  user : 'lunamista',
  password : 'lunamista123',
  database : 'lunadb'
});

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

var bodyParser = require('body-parser');

// Skip till Node-modules get updated
/*
app.use(require('body-parser').urlencoded({extended:true}));
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
 resave:false,
 saveUninitialized:false,
 secret:credentials.cookieSecret
}));
*/

// Call to Express body parser json for DB querys and inserts
app.use(bodyParser.json());

app.get("/", function(req,res){
    res.render("home");
});

app.post('/', [function(req, res, next) {
  next();
}, function(req, res) {
  res.send('Hello World!');
}]);

/* TO CHECK user login with DB records
app.post("/", function (req, res) {
//  console.log(req.body.user.email);
//  console.log(req.body.user.pwd);
  var email = req.body.user.email;
  var pwd = req.body.user.pwd;
  var q = "SELECT * FROM users WHERE user[email] LIKE '%" + email +"%'" AND user[pwd] LIKE '%" + pwd +"%'";
  con.query(q, function(err, results) {
    if (err) throw err;
      res.send({success: results});
});
*/

app.get("/addUser", function(req,res){
    res.render("addUser");
});

// Gets From data from addUser Page, then redirects
app.post('/addUser', [function(req, res, next){
//  console.log(request.body.user.first_name);
//  console.log(request.body.user.last_name);
//  console.log(request.body.user.usr_name);
//  console.log(request.body.user.email);
//  console.log(request.body.user.home_phone);
//  console.log(request.body.user.cell_phone);
//  console.log(request.body.user.address);
var sql = "INSERT INTO Test (first_name, last_name, usr_name, email, home_phone, cell_phone, address, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
var values = [
    [request.body.user.first_name, request.body.user.last_name, request.body.user.usr_name, request.body.user.email, request.body.user.home_phone, request.body.user.cell_phone, request.body.user.address, 0],
];
con.query(sql, [values], function(err) {
    if (err) throw err;
    con.end();
  //next();
  }, 
}]);



// Block Test
/* 
// Looks for files in Public Dir
app.use(express.static(__dirname + '/public'));

// Root Dir
app.get('/', function(req, res) {
  res.render('home');
});

app.get('/login', function(req, res) {
  res.render('login');
});

// To redirect After login given
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

app.get("/history", function(req,res){
  if(req.session.admin_id){
  }else {
    res.render("searchhistory",{admin:req.session.firstName,adminlogin:req.session.admin_id});
  }
});

app.get("/addUser", function(req,res){
  res.render("addUser");
});

app.get("/forgotpassword", function(req,res){
  res.render("forgotpassword");
});

app.get("/search", function(req,res){
  res.render("search");
});
END*/

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
