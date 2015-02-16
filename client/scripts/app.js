// YOUR CODE HERE:

//request data from the server
//
//  convert the data using JSON.parse
//display the data index.html
//
//
// display messages retrieved fromt he parse server
//
// setup a way to refresh the displayed messages (either auto or button)
//  Ajax
//  $.ajax(j'kwerie)
//
// be careful to use proper escaping. ESCAPING.
//   don't get hacked
//
// if you XSS attack, make it educational
//
// allow users to select username
//
// ** Send messages to parse server
//   convert messages to string using JSON.stringify
//
// ** Append messages to #main
//
window.displayMessage = function(message){
  // escape the characters into a new message
  // var safeMessage = //message with escaped characters
  for(var i =0; i < message.length; i++) {
    var str = message[i].username + ': ' + message[i].text + ' (' + message[i].roomname + ')';
    $('#main').append('<p>' + str + '</p>');
  }
};

// $.ajax({
//   url: 'https://api.parse.com/1/classes/chatterbox.jsonp',
//   type: 'GET',
//   dataType: 'jsonp',
//   success: displayMessage
// });

$.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  //data: JSON.parse(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message gotten');
    console.log(data);
    //append the data ºuº
    displayMessage(data.results);
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to get message');
  }
});



