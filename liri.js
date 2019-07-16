require("dotenv").config();

var keys = require("./keys.js");

var spotify = new spotify(keys.spotify);
var Spotify = require("node-spotify-api");
var fs = require("fs");
var request = require("request");

//input capture
var userChoices = process.argv[2];
var paramInput = process.argv[3];
