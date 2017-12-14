  // Load the twilio module
  var twilio = require("twilio");
  
  // Create a new REST API client to make authenticated requests against the
  // twilio back end
  var client = new twilio.RestClient("AC5f00aeef81212012375f30bfbdba3da1", "660124b175b25861497c78d3b3ac54fb");
  
  // Pass in parameters to the REST API using an object literal notation. The
  // REST client will handle authentication and response serialzation for you.
  console.log("Send to " + phone);
  client.sms.messages.create({
    to: phone, //"412-638-2370",
    from: "+14127278559",
    body: message
  }, function(error, message) {
    // The HTTP request to Twilio will run asynchronously. This callback
    // function will be called when a response is received from Twilio
    // The "error" variable will contain error information, if any.
    // If the request was successful, this value will be "falsy"
    if (!error) {
      // The second argument to the callback will contain the information
      // sent back by Twilio for the request. In this case, it is the
      // information about the text messsage you just sent:
      console.log("Success! The SID for this SMS message is:");
      console.log(message.sid);
       
      console.log("Message sent on:");
      console.log(message.dateCreated);
      cb();
    }
    else {
      console.log("Oops! There was an error.");
    }
  });
