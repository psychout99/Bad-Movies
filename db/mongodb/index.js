const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/badmovies');


let movieSchema = mongoose.Schema({

});

let Movies = mongoose.model('Movies', movieSchema);

let save = (movie, cb) => {
  Movies.create({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    release_date: movie.release_date,
    vote_avg: movie.vote_average
  }).then(cb);
}

let drop = (movie, cb) => {
  Movies.findOneAndDelete({id: movie.id}).exec().then(cb);
}

let getFaves = (cb) => {
  Movies.find.exec().then(cb);
}

module.exports.getFaves = getFaves;
module.exports.save = save;
module.exports.drop = drop;