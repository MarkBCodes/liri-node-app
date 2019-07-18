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
//Bands in Town
function concertInforResult(paramInput) {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    paramInput +
    "/events?app_id=deabd5f7-3bc2-45c9-88c9-f3e8390c3bbc";
  if (!error && response.statusCode === 200) {
    var shows = JSON.parse(body);
    for (var i = 0; i < shows.length; i++) {
      console.log("==========CONCERT DETAILS==========");
      fs.appendFileSync("log.txt", "**********CONCERT INFO*********\n");
      console.log(i);
      fs.appendFileSync("log.txt", i + "\n");
      console.log("Venue: " + shows[i].venue.name);
      fs.appendFileSync("log.txt", "Venue: " + shows[i].venue.name + "\n");
      console.log("Location: " + shows[i].venue.city);
      fs.appendFileSync("log.txt", "Location: " + shows[i].venue.city + "\n");
      console.log("Event Date: " + shows[i].datetime);
      fs.appendFileSync("log.txt", "Event Date: " + shows[i].datetime + "\n");
      console.log("================================");
      fs.appendFileSync("log.txt", "*****************************" + "\n");
    }
  } else {
    console.log("Error!");
  }
}

//Spotify
function songInfo(paramInput) {
  //default song
  if (paramInput === undefined) {
    paramInput = "The Sign";
  }
  spotify.search(
    {
      type: "track",
      query: paramInput
    },
    function(err, data) {
      if (err) {
        console.log("Error Occured: " + err);
        return;
      }
      var music = data.tracks.items;

      for (var i = 0; i < music.lenght; i++) {
        console.log("===========SONG DETAILS===========");
        fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
        console.log(i);
        fs.appendFileSync("log.txt", i + "\n");
        console.log("Title: " + music[i].name);
        fs.appendFileSync("log.txt", "Title: " + music[i].name + "\n");
        console.log("Preview: " + music[i].preview_url);
        fs.appendFileSync("log.txt", "preview: " + music[i].preview_url + "\n");
        console.log("Album: " + music[i].album.name);
        fs.appendFileSync("log.txt", "Album: " + music[i].album.name + "\n");
        console.log("Artist: " + music[i].artist.name);
        fs.appendFileSync(
          "log.txt",
          "Artist: " + music[i].artists[0].name + "\n"
        );
        console.log("===============================");
        fs.appendFileSync("log.txt", "*****************************\n");
      }
    }
  );
}

//OMDB
function movieInfo(paramInput) {
  //default result if undefined
  if (paramInput === undefined) {
    paramInput = "Mr. Nobody";
    console.log("=====================");
    console.log(
      "Check out the info on 'Mr. Nobody', here: http://www.imdb.com/title/tt0485947/"
    );
    console.log("It's probably still on Netflix");
  }
  var queryUrl =
    "http://www.omdbapi.com/?i=" +
    paramInput +
    "&y=&plot=short&apikey=286db962";
  request(queryurl, function(error, response, body) {
    // if successful
    if (!error && response.statusCode === 200) {
      var movie = JSON.parse(body);
      console.log("==========MOVIE DETAILS==========");
      fs.appendFileSync("log.txt", "==========MOVIE DETAILS==========\n");
      console.log("Title: " + movie.Title);
      fs.appendFileSync("log.txt", "Title: " + movie.Title + "\n");
      console.log("Released: " + movie.Year);
      fs.appendFileSync("log.txt", "Released: " + movie.Year + "\n");
      console.log("IMDB Rating: " + movie.ImdbRating);
      fs.appendFileSync("IMDB Rating: " + movie.ImdbRating + "\n");
      console.log(
        "Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movie)
      );
      fs.appendFileSync(
        "log.txt",
        "Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movie) + "\n"
      );
      console.log("Country of Production: " + movie.Country);
      fs.appendFileSync(
        "log.txt",
        "Country of Production: " + movie.Country + "\n"
      );
      console.log("Language: " + movie.Language);
      fs.appendFileSync("log.txt", "Language: " + movie.Language + "\n");
      console.log("Plot: " + movie.Plot);
      fs.appendFileSync("log.txt", "Plot: " + movie.Plot + "\n");
      console.log("Actors: " + movie.Actors);
      fs.appendFileSync("log.txt", "Actors: " + movie.Actors + "\n");
      console.log("*****************************");
      fs.appendFileSync("log.txt", "*****************************\n");
    } else {
      console.log("Error!");
    }
  });
}

function giveSomeInfo() {
  resizeBy.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var dataArray = data.split(",");
    inputOfUser(dataArray[0], dataArray[1]);
  });
}
