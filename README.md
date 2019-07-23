# Liri-Node-App

## Role

> Mark Bullard worked as the developer of this project.

### Technologies Used

> The following are the technologies used during the creation of this Node application, which runs in the console of the user's system.

- JavaScript
- Node
- Bands in Town API
- Spotify API
- OMDB API

### Why this is useful?

"Clearly state the problem the app is trying to solve (i.e. what is it doing and why)"...

> This application has the purposes of aiding the user in discovering information about when their favorite bands are in town or where they'll be next, to look up the information about their favorite movie, or to hear different variations of their favoirte song. In a world where there are fancy applications that will flood the space within your eyes, the candy we're all used to, this application does it in a very simple way...without all the pazsaz...as a node application run through the users concole.

### Application Functionality

"Give a high-level overview of how the app is organized"

> This application is built to use Node.js, using a packages to connect through three APIs (Bands in Town, Spotify, and OMDB) called in the code. It runs in the console, returns information from the APIs via the use of commands and keywords.

### How it works..

"Give start-to-finish instructions on how to run the app"

> With the code preped, keys and credenetials applied, and a txt file to log results...

- navigate to your console
- type in "node <app.js filename>.js" then any one of the following commands:
  - concert-this
  - spotify-this-song
  - movie-this
  - do-what-it-says
- after typing in any one of the following commands, type in the band, movie, or song of your chosing the application will return information on that query.

  For example "node liri.js concert-this Cher" returns:

  ![alt text](https://github.com/Gudbrandr42/liri-node-app/blob/master/media/BandsInTownResults.PNG?raw=true)

  - The above is a list of shows for the artist and the dates and locations for the upcoming events.

  The next example is for Spotify. "node liri.js spotifty-this-song bawitdaba" shows results like this:

  ![alt text](https://github.com/Gudbrandr42/liri-node-app/blob/master/media/SpotifyResults.PNG?raw=true)

  - The results turns this way to similar songs, covers of the desired song, and the actual song itself. This is the behavior of how searching on spotify works as well. I have found that null values for songs are due to albums coming up, where the songs are listed so there is no preview given. This is also common in the search on the GUI side with the actual Spotify App.

  Lastly is OMDB, where "node liri.js movie-this Hackers" returns a singular search result of the movie in question:

  ![alt text](https://github.com/Gudbrandr42/liri-node-app/blob/master/media/OMDBResults.PNG?raw=true)

  - the results show the desired movie, based on the title.
