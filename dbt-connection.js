// ADD to Connect to Database
var mysql = require('mysql');

var con = mysql.createConnection({
  host : 'fkonat.it.pointpark.edu',
  user : 'lunamista',
  password : 'lunamista123',
  database : 'lunadb'
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT *  FROM users;", function(err, rows, fields) {
//    con.query("INSERT INTO users(first_name, last_name, is_admin, email) VALUES (?, ?, ?, ?);",  ["Tanner", "Campbell", 0, "tcampb@pointpark.edu"], function(err, rows, fields) {
    if (err) throw err;
    console.log("Connected!");
//  console.log(fields);
    console.log(rows);
    con.end();
  });
});
