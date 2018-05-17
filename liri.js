var keys = require("./keys.js");


var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var getMyTweets = function () {

    var client = new Twitter(keys.twitterKeys);

    var params = { screen_name: 'Ivan Ivanov' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            for (let i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(" ");
                console.log(tweets[i].text);

            }
        }
    });

}

var artistName = (artist) => {
    return artist.name;
}


var nameSong = (songName) => {
    var callingSpotify = new Spotify(keys.spotifyKeys);
    callingSpotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items;
        for (let i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("artist(s): " + songs[i].artists.map(
                artistName));
            console.log("song name: " + songs[i].name)
            console.log("preview song: " + songs[i].preview_url);
            console.log("album :" + songs[i].album.name);
            console.log("------------------------------");
        }

    });
}
var pick = function (caseData, functionData) {
    switch (caseData) {
        case "my-tweets":
            getMyTweets();
            break;
        case "spotify-this-song":
            nameSong(functionData);
            break;
        default:
            console.log("LIRI Does not know that");

    }
}

var runThis = function (argOne, argTwo) {
    pick(argOne, argTwo);

};

runThis(process.argv[2], process.argv[3]);
