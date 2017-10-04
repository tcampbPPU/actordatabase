var express = require('express');
var credentials = require('./credentials.js');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:"main"});
app.engine("handlebars",handlebars.engine);
app.set("view engine","handlebars");
app.set('port', process.env.PORT || 3000);
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

// To add new Actor to Database
app.get('/addUSer', function(req, res) {
  res.render('addUser');
});
app.get("/search", function(req,res){
  res.render("search", {
          pageTestScript: '/qa/tests-search.js', username:req.session.username
  }); 
});

app.get("/admin", function(req,res){
var d = new Date();
  res.render("admin",{date:d});
});
app.post("/login", function(req,res){
console.log(req.body);
req.session.username = req.body.email;
req.session.cookie.maxAge = 60000;
res.redirect(303,'/search');
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

app.listen(app.get("port"), function(){
  console.log("Express started on");
});


