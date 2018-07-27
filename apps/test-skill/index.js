module.change_code = 1;
'use strict';

const alexa = require( 'alexa-app' );
const app = new alexa.app( 'test-skill' );
const axios = require('axios');


app.launch( function( request, response ) {
	response.say( 'Welcome to your test skill' ).reprompt( 'Way to go. You got it to run. Bad ass.' ).shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};

app.intent('sayNumber',
  {
    "slots":{"number":"NUMBER"}
	,"utterances":[ 
		"say the number {number}",
		"give me the number {number}",
		"tell me the number {number}",
		"I want to hear you say the number {number}"]
  },
  function(request,response) {
    var number = request.slot('number');
    response.say("You asked for the number "+number);
  }
);

app.intent('sayChickenNumber',
  {
    "slots":{"number":"NUMBER"}
	,"utterances":[ 
		"chicken {number}"]
  },
  function(request,response,done) {
    var APIResponse = (done) => {
      axios.get(`https://securetestapi.herokuapp.com/alexa`)
      .then(res => {
        APIResponse = res.data;
        console.log("----------------------- LOGGING ----------------------")
        console.log(APIResponse);
        console.log("----------------------- LOGGING2 ---------------------")
        console.log(APIResponse);
        var number = request.slot('number');
        done(null,APIResponse);
      })
      .catch(error => done(error, false));
  };
    var number = request.slot('number');
    console.log("----------------------- LOGGING3 ---------------------")
    console.log(APIResponse());
    response.say('You said you wanted to buy ' + number + '. '+ APIResponse());

  }
);

module.exports = app;