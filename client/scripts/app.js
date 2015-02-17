// YOUR CºDE HERE:

var message = {
  'username': 'aaa',
  'text': 'aa',
  'roomname': 'aa'
};
var mostRecent ='';

window.getUserInput = function () {
  message.username = $('#username').val();
  message.text = $('#text').val();
  message.roomname = $('#roomname').val();
  console.log('romeName', message.roomname, 'text', message.text, 'username', message.username)
  postData();
}



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
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: {'order':'-createdAt'},
    //data: JSON.parse(message),
    contentType: 'application/json',
    success: function (data) {
      //console.log(data.results);
      mostRecent = data.results[0].createdAt;
      populateData(data.results.length-1, data.results);
    },
    error: function (data) {
      console.error('chatterbox: Failed to get message');
    }
  });
};


var updateData = function () {
  console.log(mostRecent);
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: {'where' : JSON.stringify({
      "createdAt" : {'$gt': mostRecent}
    })},
    //data: JSON.parse(message),
    contentType: 'application/json',
    success: function (data) {
      //console.log(data);
      if (data.results.length){// if the list is updated with new data
        populateData(data.results.length-1, data.results);
        mostRecent = data.results[0].createdAt;
      }
    },
    error: function (data) {
      console.error('chatterbox: Failed to get message');
    }
  });
};

var clearScreen = function(){
  $('#content').remove();
  $('#main').append('<div id = "content"></div>');
};

getData();


var populateData = function (counter, serverData) {
  var testing = function(counter){
    var str = serverData[counter].username + ': ' + serverData[counter].text + ' (' + serverData[counter].roomname + ')';
    $('#content').prepend('<p></p>')
    $('p:first-child').text(str);

  };
  setInterval(function(){

    if(counter >= 0){
      testing(counter);
    }
    counter--;
  }, 20);

};








