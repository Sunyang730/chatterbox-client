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
//var app = {};
var message = {
  'username': 'aaa',
  'text': 'aa',
  'roomname': 'aa'
};

window.getUserInput = function () {
  message.username = $('#username').val();
  message.text = $('#text').val();
  message.roomname = $('#roomname').val();
  console.log('romeName', message.roomname, 'text', message.text, 'username', message.username)
  postData();
}


/*window.submitClick = function (name, txt, room) {
  //set message's fields to the arguments
  message['username'] = escapeChar(name);
  message['text'] = escapeChar(txt);
  message['roomname'] = escapeChar(room);
}*/

// most recent to oldest
window.displayMessage = function(message){
  // escape the characters into a new message
  // var safeMessage = //message with escaped characters
  //$('#content').text('');
  for(var i = 0; i < message.length; i++) {
    var str = message[i].username + ': ' + message[i].text + ' (' + message[i].roomname + ')';
    str = escapeChar(str);
    $('#content').append('<p>' + str + '</p>');
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
var postData = function() {
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
};

// get messages
var getData = function () {


  $.ajax({
  // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    type: 'GET',
    //data: JSON.parse(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message gotten');
      console.log(data);
      var serverData = data.results;
      //append the data to main using the above global function ºuº
      //displayMessage(data.results);
      funcWrapper(serverData.length-1, serverData);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
};

var clearScreen = function(){
  $('#content').remove();
  $('#main').append('<div id = "content"></div>');
};

//setInterval(getData, 10);
getData();

var funcWrapper = function (counter, serverData) {
var test;


var testing = function(counter){
  console.log(counter);
  var str = serverData[counter].username + ': ' + serverData[counter].text + ' (' + serverData[counter].roomname + ')';
  $('#content').prepend('<p></p>')
  $('p:first-child').text(str);

};
setInterval(function(){

  if(counter >= 0){
    testing(counter);
  }
  counter--;
  //getData();

}, 200);

};








