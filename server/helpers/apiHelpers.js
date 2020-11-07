const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file

let getMoviesByTitle = (title, cb) => {


axios(`http://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`)
  .then((res) => {
    cb(res.data.results);
  }).catch((err) =>{
    console.log(err);
  });

};
let getMoviesByGenre = (genre, cb) => {


  axios(`http://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}&sort_by=popularity.asc&vote_count.gte=10`)
    .then((res) => {
      cb(res.data.results);
    }).catch((err) =>{
      console.log(err);
    });
  
  };



module.exports.getMoviesByGenre = getMoviesByGenre;
module.exports.getMoviesByTitle = getMoviesByTitle;