var express = require('express');
var credentials = require('./credentials.js');
var expressValidator = require('express-validator');
var formidable = require('formidable');
var mysql = require('mysql');
var fs = require('fs');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:"main"});
var con = mysql.createConnection({
 host: "fkonat.it.pointpark.edu",
 user:"lunamista",
 password:"lunamista123",
 database: "lunadb"
});
con.connect(function(err) {
  if (err) throw err;
});
app.engine("handlebars",handlebars.engine);
app.set("view engine","handlebars");
app.set('port', process.env.PORT || 4000);
app.use(express.static(__dirname +'/public'));
app.use( function( req, res, next){
  res.locals.showTests = app.get(' env') !== 'production' && req.query.test === '1';
  next();
 });
app.use(require('body-parser').urlencoded({extended:true}));
app.use(expressValidator());
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
 resave:false,
 saveUninitialized:false,
 secret:credentials.cookieSecret
}));
app.get("/", function(req,res){
    res.render("home");
});

app.get("/search", function(req,res){
  res.render("search");
});

app.get("/history", function(req,res){
  if(req.session.admin_id){
  }else {
    res.render("searchhistory",{admin:req.session.firstName,adminlogin:req.session.admin_id});
  }
});

app.get("/creatnewaccount", function(req,res){
  res.render("addUser");
});
app.get("/forgotpassword", function(req,res){
  res.render("forgotpassword");
});
app.get("/logout", function(req,res){
  delete req.session.user_id;

  res.redirect(303,'/');
});

app.post("/update-user-info", function(req,res){

  var user_info =["first_name","last_name","sex","is_admin","email"];
  for(key in req.body ){
    if(key ==="password" || key ==="current_password" || key === "confirm_password"){

      console.log("current: ",req.body.current_password,"password: ",req.body.password,"confirm_password: ", req.body.confirm_password);
      break;
    }else if(user_info.indexOf(key)!==-1){
      console.log(key,": ",req.body[key]);
        var query = "UPDATE users SET "+key+" = '"+req.body[key]+"'  WHERE id = '"+req.session.user_id+"';";
        con.query(query, function (err, result, fields) {
          if (err){
            throw err;
          }else {
              //res.redirect(303,'/user');

                //console.log("this success: ",succeeded);
          }
        });

    }else {
     //for info that are in actors
       console.log(key,": ",req.body[key]);
    }
  }
  res.send({success:true});
});
app.post("/login", function(req,res){
  console.log("enter login route");
  req.check('email','invalid email address').isEmail();
  var errors = req.validationErrors();
  if( errors){
    req.session.errors = errors;
    res.redirect(303,'/');
  }else {
    var email=req.body.email;
      var q  ="SELECT id, email,password FROM users WHERE email = '"+email+"' ;"; //"SELECT id, email,FROM users WHERE email = '"+email+"' "
      con.query(q, function (err, result, fields) {
        //con.end();
        if (err){
          throw err;
        }
        else {
          if(result[0]){

              //req.session.userpassEmail = false;
            if(result[0].password === req.body.password){
               req.session.user_id = result[0].id;
               //req.session.firstName = result[0].name;
               req.session.cookie.maxAge = 9000000;
               //req.session.userpassPassword = false;
               res.redirect(303,'/user');
              //.....
            }else {
              //password false
               //console.log("password not correct");
               //req.session.userpassPassword = true;
                res.redirect(303,'/');
            }
          }else {
            //not result email false
            //console.log("email not found");
            //req.session.userpassEmail = true;

             res.redirect(303,'/');
          }

        }
      });
  }
});


app.get("/user", function(req,res){
  if(req.session.user_id){
    var query0="SELECT users.*, cars.*, actors.* FROM users JOIN cars ON cars.actors_users_id = users.id JOIN actors ON actors.users_id = cars.actors_users_id  WHERE users.id = '"+req.session.user_id+"'  "
    var query ="SELECT * FROM users LEFT JOIN actors ON users.id = actors.users_id  WHERE id = '"+req.session.user_id+"'  "; //"SELECT * FROM users WHERE id = '"+req.session.user_id+"' " //ON users.id=actors.users_id WHERE id = '"+req.session.user_id+"'
      con.query(query, function (err, result, fields) {
        if(err){
         //error
        }
        else {
          if(result[0]){
            res.render("user", {
                    login:req.session.user_id?req.session.user_id:false,
                    //user:req.session.firstName,
                    is_admin :result[0].is_admin,
                    first_name:result[0].first_name,
                    last_name:result[0].last_name,
                    email:result[0].email,
                    sex:result[0].sex,
                    users_id:result[0].users_id,
                    home_phone:(result[0].home_phone?result[0].home_phone:"-"),
                    cell_phone:result[0].cell_phone,
                    address:result[0].street+", "+ result[0].city+", "+result[0].state+", "+result[0].zip,
                    emergency_name:result[0].emergency_contact_name,
                    emergency_number:result[0].emergency_contact_number,
                    height:result[0].height,
                    weight:result[0].weight,
                    shoe:result[0].shoe_size,
                    bust:result[0].bust_size,
                    waist:result[0].waist_size,
                    hip:result[0].hip_size,
                    dress:result[0].dress_size,
                    neck:result[0].neck_size,
                    sleeve:result[0].sleeve,
                    chest:result[0].chest_size,
                    hat:result[0].hat_size,
                    jacket:result[0].jacket_size,
                    inseam:result[0].inseam,
                    location:result[0].location,
                    birthday:result[0].birthday,
                    ethnicity:result[0].ethnicity,
                    hair_color:result[0].hair_color,
                    hair_type:result[0].hair_type,
                    us_citizen:result[0].us_citizen,
                    union_status:result[0].union_status,
                    union_number:result[0].union_number,
                    facial_hair:result[0].facial_hair,
                    piercings:result[0].piercings,
                    tattoos:result[0].tattoos,
                    eyes:result[0].eyes,

            });
          }
        }
        //console.log(result);
        //res.render("user");
      });
  }else {
    res.redirect(303,'/');
    // res.render("user", {
    //         login:req.session.user_id?req.session.user_id:false, user:req.session.firstName
    // });
    //con.end();
  }
});

app.post("/get_user_images",function(req,res){
  if(req.session.user_id){
    con.query("SELECT image_url FROM images WHERE actors_users_id ='"+req.session.user_id+"'", function(err, result,fields){
      if(err){
        res.send({success:false});
      }else {
        res.send({success:result});
      }
    })
  }else {
    res.send({success:false});
  }
});

app.post("/get_user_cars",function(req,res){
  if(req.session.user_id){
    con.query("SELECT * FROM cars WHERE actors_users_id ='"+req.session.user_id+"'", function(err, result,fields){
      if(err){
        res.send({success:false});
      }else {
        res.send({success:result});
      }
    })
  }else {
    res.send({success:false});
  }
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
