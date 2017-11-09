var express = require('express');
//var credentials = require('./credentials.js');
var expressValidator = require('express-validator');
var formidable = require('formidable');
var mysql = require('mysql');
var fs = require('fs');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:"main"});
var mysql = require('mysql');
var connection = mysql.createConnection({
        host: 'fkonat.it.pointpark.edu',
        user: 'lunamista',
        password: 'lunamista123',
        database:'lunadb'
});

app.engine("handlebars",handlebars.engine);
app.set("view engine","handlebars");
app.set('port', process.env.PORT || 4000);
app.use(express.static(__dirname +'/public'));

app.use( function( req, res, next){
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
 });

app.use(require('body-parser').urlencoded({extended:true}));
//app.use(require('cookie-parser')(credentials.cookieSecret));
//app.use(require('express-session')({
 //resave:false,
 //saveUninitialized:false,
// secret:credentials.cookieSecret
//}));

//app.get("/", function(req,res){
//    res.render("home");
//});

function getMenu(req) {
  var menu = [];
  var isAdmin = true;
  if (isAdmin) {
    menu.push({"page": "search", "label": "Search"});
    menu.push({"page": "searchhistory", "label": "History"});
  } else {
    menu.push({"page": "login", "label": "Log In"});
    menu.push({"page": "signup", "label": "Sign Up"});
    menu.push({"page": "forgotpassword", "label": "Forgot Password"});
  }
  menu.push({"page": "about", "label": "About"});
  return menu;
}

// Root Dir
app.get('/', function(req, res) {
  res.render('landing', {
    menu: getMenu(req)
  });
});

app.get("/addUser", function(req,res){
  res.render("addUser", {
    menu: getMenu(req)
  });
});
 
app.post('/process-search', function(req, res) {
  var search = req.body.search;
 // console.log(search);
  var q = "SELECT * FROM users WHERE first_name LIKE '%" + search +"%'";
  connection.query(q, function(err, results) {
    if (err) throw err;
      res.send({success: results});
  }); 
});


app.get("/forgotpassword", function(req,res){
  res.render("forgotpassword");
    menu: getMenu(req)
});

app.get("/search", function(req,res){
  res.render("search");
    menu: getMenu(req)
});

app.get("/about", function(req,res){
  res.render("about");
    menu: getMenu(req)
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
  console.log("listening on http:// localhost:" + app.get("port") + "; press Ctrl-C to terminate.");
});
