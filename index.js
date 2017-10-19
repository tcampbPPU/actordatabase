// New fortunes at lib/fortune.js
var express = require('express');
//var fortune = require('./lib/fortune.js');
var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout:'main', helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
 });

// Tell Express loading Handlebars
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set Port
app.set('port', process.env.PORT || 4000);

// Chai and Mocha Test
app.use(function(req, res, next) {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

// Looks for files in Public Dir
app.use(express.static(__dirname + '/public'));

// Render looks in views for file name in extenstion

// Root Dir
app.get('/', function(req, res) {
  res.render('home');
});

app.get('/admin-login', function(req, res) {
  res.render('admin-login');
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
});


// About Dir with Chai and Mocha
app.get('/about', function(req,res){
  res.render('about', { fortune: fortune.getFortune(), pageTestScript: '/qa/tests-about.js'});
});
// hood-river
app.get('/tours/hood-river', function(req, res){
        res.render('tours/hood-river');
});

// Oregon Tours
app.get('/tours/oregon-coast', function(req, res){
        res.render('tours/oregon-coast');
});


// request group rate
app.get('/tours/request-group-rate', function(req, res){
        res.render('tours/request-group-rate');
});

// custom 404 page
app.use(function(req, res){
  res.status(404);
  res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('text/ plain');
  res.status(500);
  res.render('500');
});

// Listen to APP for Port
app.listen(app.get('port'), function(){ console.log('Express started on http:// localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

