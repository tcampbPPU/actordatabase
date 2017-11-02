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
    res.render("home",info={"menu":[{page:"home",label:"Home",isCurent:true},{page:"about",label:"About"}]});
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

// app.post("/update-user-info", function(req,res){
//
//   var user_info =["first_name","last_name","sex","is_admin","email"];
//   for(key in req.body ){
//     if(key ==="password" || key ==="current_password" || key === "confirm_password"){
//
//       console.log("current: ",req.body.current_password,"password: ",req.body.password,"confirm_password: ", req.body.confirm_password);
//       break;
//     }else if(user_info.indexOf(key)!==-1){
//       console.log(key,": ",req.body[key]);
//         var query = "UPDATE users SET "+key+" = '"+req.body[key]+"'  WHERE id = '"+req.session.user_id+"';";
//         con.query(query, function (err, result, fields) {
//           if (err){
//             throw err;
//           }else {
//               //res.redirect(303,'/user');
//
//                 //console.log("this success: ",succeeded);
//           }
//         });
//
//     }else {
//      //for info that are in actors
//        console.log(key,": ",req.body[key]);
//     }
//   }
//   res.send({success:true});
// });



app.post("/update-user-info", function(req,res){
  console.log("update-user-info",req.body);
  var table = req.body.table_name;
  for(key in req.body ){
    if(key!=="table_name"){
           console.log("in table:",table," change",key,".to.",req.body[key]);
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


// app.get("/user", function(req,res){
//   if(req.session.user_id){
//     var query0="SELECT users.*, cars.*, actors.* FROM users JOIN cars ON cars.actors_users_id = users.id JOIN actors ON actors.users_id = cars.actors_users_id  WHERE users.id = '"+req.session.user_id+"'  "
//     var query ="SELECT * FROM users LEFT JOIN actors ON users.id = actors.users_id  WHERE id = '"+req.session.user_id+"'  "; //"SELECT * FROM users WHERE id = '"+req.session.user_id+"' " //ON users.id=actors.users_id WHERE id = '"+req.session.user_id+"'
//       con.query(query, function (err, result, fields) {
//         if(err){
//          //error
//         }
//         else {
//           if(result[0]){
//             var info={login:req.session.user_id?req.session.user_id:false,};
//             for(key in result[0]){
//               if(key!=="password" && result[0][key]!== null){
//                 info[key] = result[0][key];
//               }
//             }
//             if(result[0].is_admin){
//               info["menu"] = [{page:"search",label:"Search"},{page:"search-history",label:"Search History"},{page:"give-privilege",label:"Give Admin Privilege"}];
//             }
//             res.render("user",info);
//           }
//         }
//       });
//   }else {
//     res.redirect(303,'/');
//   }
// });
var voids = {"password":true,"is_admin":true,"id":true,"users_id":true};
var users_info_names={"first_name":true,"last_name":true,"sex":true,"email":true};
var actors_info_names={"first_name":true,"last_name":true,"sex":true,"email":true};
var measurements ={"weight":true,"height":true,"neck_size":true,"sleeve_size":true,"waist_size":true,"inseam_size":true,"dress_size":true,"jacket_size":true,"shoe_size":true,"bust_size":true,"chest_size":true,"hip_size":true,"hat_size":true,}
app.get("/user", function(req,res){
  if(req.session.user_id){
    var query ="SELECT * FROM users LEFT JOIN actors ON users.id = actors.users_id  WHERE id = '"+req.session.user_id+"'  ";
    //var query ="SELECT * FROM users  WHERE id = '"+req.session.user_id+"'";
      con.query(query, function (err, result, fields) {
        if(err){
         //error
        }
        else {
          if(result[0]){
            var info={user_name: result[0].first_name,login:req.session.user_id?req.session.user_id:false,user_info:[],actor_info:[],is_admin:result[0].is_admin,all_users:[],users_id:result[0].users_id,actors_measurement:[]};
            for(key in result[0]){
              if(users_info_names[key]){
                //user info only
                info.user_info.push({name:key,label:upperCaseFirstLetter(key), value:result[0][key]});
              }
              else if (measurements[key]) {
                //actors measurements only
                info.actors_measurement.push({name:key,label:upperCaseFirstLetter(key), value:result[0][key]});
              }else if (!voids[key]) {
                //actors others info only
                  info.actor_info.push({name:key,label:upperCaseFirstLetter(key), value:result[0][key]});
              }
            }
            if(result[0].is_admin){
              info["menu"] = [{page:"home",label:"Home",isCurent:true},{page:"search",label:"Search"},{page:"search-history",label:"Search History"},{page:"give-privilege",label:"Give Admin Privilege"}];
              con.query("SELECT first_name,last_name,sex, is_admin, id FROM users", function (err, result, fields){
                 if(err) throw err;
                 for(rs in result){
                   info.all_users.push(result[rs]);
                 }
             });
           }
            //console.log(info);
            res.render("user",info);
          }
        }
      });
  }else {
    res.redirect(303,'/');
  }
});

app.post("/get-all-users",function(req,res){
  if(req.session.user_id){
    var query ="SELECT id,first_name,last_name,is_admin,email,sex,height,eye_color,gender,weight,hair_color,hair_type,tattoo,piercings,facial_hair,eyes_color,us_citizen,neck_size,sleeve_size,waist_size,inseam_size,dress_size,jacket_size,shoe_size,bust_size,chest_size,hip_size,hat_size,union_status,union_number FROM users LEFT JOIN actors ON users.id = actors.users_id";
    var q = "SELECT first_name,last_name,sex, is_admin, id FROM users";
    con.query(query, function (err, result, fields){
       if(err) throw err;
       res.send({success:result,admin_id:req.session.user_id});
   });

  }else {
    res.send({success:false});
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

function upperCaseIt(word){
  return word[0].toUpperCase()+word.substring(1,word.length);
}
function upperCaseFirstLetter(word0){
  var word = word0.split("_");
  var new_Word=false;
  for(var i =0; i<word.length; i++){
    if(!new_Word){
      new_Word = upperCaseIt(word[i]);
    }else {
        new_Word+=" "+upperCaseIt(word[i]);
    }
  }
  return new_Word;
}
