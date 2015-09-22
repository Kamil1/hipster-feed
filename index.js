#! /usr/bin/env node
var https = require('https');
var readline = require('readline');
var ImageToAscii = require('image-to-ascii');
var size = require('window-size');


// GLOBAL VARIABLES

var userArgs = process.argv.slice(2);
var access_token = userArgs[0];

var rl = readline.createInterface({
  		input: process.stdin,
  		output: process.stdout
	});

// INPUT LOGIC

if(!userArgs[0]) {
	console.log("Welcome to Hipster Feed! Type -help to learn more!");
} else if(userArgs[0] == "-h") {
	console.log("This is where the help section would go");
} else {
	renderFeed();
}

// FUNCTIONS

/*
** Renders first page of user's Instagram feed
*/
function renderFeed() {
	var options = {
		path : "",
		pxWidth: 6,
		aRatio : false
	}

	https.get('https://api.instagram.com/v1/users/self/feed?access_token=' + access_token, function(res) {
  	var body = '';

  	res.on('data', function(chunk) {
  		body += chunk;
  	});

  	res.on('end', function() {
  		var response = JSON.parse(body);
  		for (var i = 0; i < response["data"].length; i++) {
  			options.path = response["data"][i]["images"]["standard_resolution"]["url"];
  			ImageToAscii(options, function(err, converted) {
  				console.log(err || converted);
  			});
  		}
  	});

	}).on('error', function(e) {
  		console.error(e);
	});
}