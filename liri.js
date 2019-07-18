require("dotenv").config();

var keys = require("./keys.js");

var spotify = new spotify(keys.spotify);
var Spotify = require("node-spotify-api");
var fs = require("fs");
var request = require("request");

//input capture
var userChoices = process.argv[2];
var paramInput = process.argv[3];

inputOfUser(userChoices, paramInput);

//Switch for commands
function inputOfUser(userChoices, paramInput) {
  switch (userChoices) {
    case "concert-this":
      displayConcertInfo(paramInput);
      break;
    case "spotify-this-song":
      displaySongInfo(paramInput);
      break;
    case "movie-this":
      displayMovieInfo(paramInput);
      break;
    case "do-what-it-says":
      sumInfo();
      break;
    default:
      console.log(
        "Invalid! Type in any of the following: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says"
      );
  }
}
//Bands in Town function for concert query results
function concertInforResult(paramInput) {
  if (!error && response.statuscode === 200) {
    var shows = JSON.parse(body);
    for (var i = 0; i < shows.length; i++) {}
  }
}
