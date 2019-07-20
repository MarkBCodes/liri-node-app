require("dotenv").config();

var keys = require("../liri-node-app/keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
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
function displayConcertInfo(paramInput) {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    paramInput +
    "/events?app_id=deabd5f7-3bc2-45c9-88c9-f3e8390c3bbc";
  request(queryUrl, function(error, response, body) {
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
      console.log("Error occurred.");
    }
  });
}

//Spotify
function displaySongInfo(paramInput) {
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
      // console.log(JSON.stringify(music, null, 2));

      for (var i = 0; i < music.length; i++) {
        console.log("**********SONG INFO*********");
        fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
        console.log(i);
        fs.appendFileSync("log.txt", i + "\n");
        console.log("Song name: " + music[i].name);
        fs.appendFileSync("log.txt", "song name: " + music[i].name + "\n");
        console.log("Preview song: " + music[i].preview_url);
        fs.appendFileSync(
          "log.txt",
          "preview song: " + music[i].preview_url + "\n"
        );
        console.log("Album: " + music[i].album.name);
        fs.appendFileSync("log.txt", "album: " + music[i].album.name + "\n");
        console.log("Artist(s): " + music[i].artists[0].name);
        fs.appendFileSync(
          "log.txt",
          "artist(s): " + music[i].artists[0].name + "\n"
        );
        console.log("*****************************");
        fs.appendFileSync("log.txt", "*****************************\n");
      }
    }
  );
}

//OMDB

function displayMovieInfo(inputParameter) {
  if (inputParameter === undefined) {
    inputParameter = "Mr. Nobody";
    console.log("=====================");
    fs.appendFileSync("log.txt", "-----------------------\n");
    console.log(
      "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/"
    );
    fs.appendFileSync(
      "log.txt",
      "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" +
        "\n"
    );
    console.log("It's on Netflix!");
    fs.appendFileSync("log.txt", "It's on Netflix!\n");
  }
  var queryUrl =
    "http://www.omdbapi.com/?t=" +
    inputParameter +
    "&y=&plot=short&apikey=286db962";
  request(queryUrl, function(error, response, body) {
    //if successful...
    if (!error && response.statusCode === 200) {
      var movie = JSON.parse(body);
      console.log("**********MOVIE INFO*********");
      fs.appendFileSync("log.txt", "**********MOVIE INFO*********\n");
      console.log("Title: " + movie.Title);
      fs.appendFileSync("log.txt", "Title: " + movie.Title + "\n");
      console.log("Release Year: " + movie.Year);
      fs.appendFileSync("log.txt", "Release Year: " + movies.Year + "\n");
      console.log("IMDB Rating: " + movie.imdbRating);
      fs.appendFileSync("log.txt", "IMDB Rating: " + movie.imdbRating + "\n");
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
      console.log("Error occurred.");
    }
  });
}

//Rotten Tomatoes rating
function getRottenTomatoesRatingObject(data) {
  return data.Ratings.find(function(item) {
    return item.Source === "Rotten Tomatoes";
  });
}

function getRottenTomatoesRatingValue(data) {
  return getRottenTomatoesRatingObject(data).Value;
}

//function for reading out of random.txt file
function sumInfo() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var dataArray = data.split(",");
    UserInputs(dataArray[0], dataArray[1]);
  });
}
