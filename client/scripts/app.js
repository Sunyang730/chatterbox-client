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

var message = {
  'username': 'shawndrost',
  'text': 'trololo',
  'roomname': '4chan'
};


// most recent to oldest
window.displayMessage = function(message){
  // escape the characters into a new message
  // var safeMessage = //message with escaped characters
  for(var i = 0; i < message.length; i++) {
    var str = message[i].username + ': ' + message[i].text + ' (' + message[i].roomname + ')';
    str = escapeChar(str);
    $('#content').prepend('<p>' + str + '</p>');
  }
};



// make a parse function to escape characters ?
//   go through message string
//   if you encounter one of the special characters
//     add \ to it
//   return string
window.escapeChar = function (str) {

  if ( typeof str.length === 'undefined') {
    return '';
  }

  var safeMessage = "";
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) === ';' || str.charAt(i) === '\\' ||
      str.charAt(i) === '<' || str.charAt(i) === '>' ||
      str.charAt(i) === ':' || str.charAt(i) === '&' ||
      str.charAt(i) === '"' || str.charAt(i) === "'" ||
      str.charAt(i) === '`' || str.charAt(i) === '~' ||
      str.charAt(i) === ',' || str.charAt(i) === '!' ||
      str.charAt(i) === '@' || str.charAt(i) === '$' ||
      str.charAt(i) === '%' || str.charAt(i) === '(' ||
      str.charAt(i) === ')' || str.charAt(i) === '=' ||
      str.charAt(i) === '+' || str.charAt(i) === '{' ||
      str.charAt(i) === '}' || str.charAt(i) === '[' ||
      str.charAt(i) === ']') {
      // append \ before it
      safeMessage += "\\" + str.charAt(i);

    } else {
      safeMessage += str.charAt(i);
    }
  }
  return safeMessage;
}

//post messages
$.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});


// get messages
var getData = function () {
  $.ajax({
  // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    //data: JSON.parse(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message gotten');
      console.log(data);
      //append the data to main using the above global function ºuº
      displayMessage(data.results);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
};

//setInterval(getData, 10);
getData();



