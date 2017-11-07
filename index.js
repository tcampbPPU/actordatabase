var express = require('express');
var expressValidator = require('express-validator');
var formidable = require('formidable');
var mysql = require('mysql');
var fs = require('fs');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:"main"});

// DB Connection
function connect(cb){
  var con = mysql.createConnection({
      host : 'fkonat.it.pointpark.edu',
      user : 'lunamista', 
      password : 'lunamista123',
      database : 'lunadb'
  });
  con.connect(function(err){
    if (err){
      console.log('error: ' + err.stack);
      return;
    }
    cb(con);
    console.log('Connected!');
  });
}

app.engine("handlebars",handlebars.engine);
app.set("view engine","handlebars");
app.set('port', process.env.PORT || 4000);
app.use(express.static(__dirname +'/public'));
app.use( function( req, res, next){
  res.locals.showTests = app.get(' env') !== 'production' && req.query.test === '1';
  next();
 });

app.use(require('body-parser').urlencoded({extended:true}));

function getMenu(req){
  var menu =[];
  var isAdmin = false;
  if(isAdmin){  
    menu.push({"page": "search", "label": "Search For Actors"});
  } else{
    menu.push({"page": "addUser", "label": "Edit Info"});
  }
  menu.push({"page": "about", "label": "About"});
  return menu;
};



// Home Landing Page
app.get('/', function(req, res) {
  res.render('landing', {
  menu: getMenu(req)
  });
});

app.get("/home", function(req,res){
    res.render("home");
});

app.get("/about", function(req,res){            
    res.render("about");                        
});

app.get("/search", function(req,res){
    res.render("search");
});

app.get("/addUser", function(req,res){         
    res.render('addUser');                     
});

app.get("/display", function(req,res){
    res.render('display');
});

app.post('/home', function(req, res){
//  connect();
  var sql = "SELECT users.email, users.password FROM users WHERE users.email = 'tc@gmail.com' AND users.password = 0";
  con.query(sql, function(err, results) {
    if (err) throw err;      
      con.end();
   res.redirect('/display');
  });  
});      

// Gets From data from addUser Page, then redirects
app.post('/addUser', function(req, res){
// TODO: Ajax for Duplicate entry // app.get
// Fix Duplicate entry Error from crashing nodemon  
  connect(function(con){    
    var sql = "INSERT INTO users (first_name, last_name, email, password, is_admin, sex) VALUES (?, ?, ?, ?, ?, ?)";
    var values = [req.body.first_name, req.body.last_name, req.body.email, req.body.password, 0, req.body.sex];
    con.query(sql, values, function(err, results) {
      if (err){
        console.log(err);
        res.redirect('/errorPage');
      }else{
        con.end();
        res.redirect('/');
      }
    }); 
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
