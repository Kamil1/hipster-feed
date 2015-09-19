#! /usr/bin/env node
var https = require('https');

var userArgs = process.argv.slice(2);

var clientID = userArgs[0];
var clientSecret = userArgs[1];
var access_token = userArgs[2];

https.get('https://api.instagram.com/v1/users/self/feed?access_token=' + access_token, function(res) {
  var body = '';

  res.on('data', function(chunk) {
  	body += chunk;
  });

  res.on('end', function() {
  	var response = JSON.parse(body);
  	for (var i = 0; i < response["data"].length; i++) {
  		url=response["data"][i]["images"]["low_resolution"]["url"];
  	}
  });

}).on('error', function(e) {
  console.error(e);
});