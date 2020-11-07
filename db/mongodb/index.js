const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/badmovies');


let movieSchema = mongoose.Schema({
  id: Number,
  title: String,
  overview: String,
  poster_path: String,
  backdrop_path: String,
  release_date: String,
  vote_avg: Number
});

let Movies = mongoose.model('Movies', movieSchema);

let save = (movie, cb) => {
  Movies.find({id: movie.id}).exec().then((data) => {
    if (!data.length > 0) {
  Movies.create({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    release_date: movie.release_date,
    vote_avg: movie.vote_average
  }).then(cb)}});
}

let drop = (id, cb) => {
  Movies.findOneAndDelete({id: id}).exec().then(cb);
}

let getFaves = (cb) => {
  Movies.find().exec().then(cb);
}

module.exports.getFaves = getFaves;
module.exports.save = save;
module.exports.drop = drop;