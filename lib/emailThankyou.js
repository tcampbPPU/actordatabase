module.exports = function(credentials) {

  var mailgun = require('mailgun-js')
    service: 'mailgun',
      auth: {
	api_key: credentials.mailgun.api_key,
	domain: credentials.mailgun.domain,
	  ({apiKey: api_key, domain: domain});
  }


  var data = {  
    from: 'MovieDatabase <bigmatal87@gmail.com>',  
    to: 'mdalexa@pointpark.edu',  
    subject: 'Resetting Movie Database Password',  
    text: 'Please click this link to reset your password.',
    html: 'lkonat.it.pointpark.edu:4000/resetpassword'
  }; 


