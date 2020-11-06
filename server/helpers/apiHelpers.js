const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file

let getMoviesByGenre = (genre, cb) => {


axios(`http://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${genre}`)
  .then((res) => {
    console.log(res);
    cb();
  }).catch((err) =>{
    console.log(err);
  });

};



module.exports.getMoviesByGenre = getMoviesByGenre;