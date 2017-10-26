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
//  con.query("SELECT *  FROM users;", function(err, rows, fields) {
//    con.query("INSERT INTO users(first_name, last_name, usr, email, home_phone, cell_phone, address, is_admin,) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",  ["", "", "", "", "", "", "", 0], function(err, rows, fields) {
      if (err) throw err;
      console.log("Connected!");
//      console.log(rows);
      con.end();
//    });
//  });
});
