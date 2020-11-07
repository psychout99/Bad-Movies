import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{title: "De Wae", id: 1, release_date:'2020',vote_average:10.0}],
      favorites: {},
      showFaves: false,
      title: ''
    };
    this.getMovies = this.getMovies.bind(this);
    this.addFave = this.addFave.bind(this);
    this.deleteFave = this.deleteFave.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getGenres = this.getGenres.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.getAllFaves = this.getAllFaves.bind(this);
    this.getAllFaves();
    // you might have to do something important here!
  }
  getAllFaves() {
    axios('/faves').then((results) => {
      //console.log(results);
      for (var movie of results.data) {
        this.addFave(movie);
      }
    });
  }

  getGenres(event) {
    var index = event.target.options.selectedIndex;
    if (index > 0) {
    var id = event.target.options[index].value;
    axios(`/genres?genre=${id}`).then((results) => {
      this.setState({movies: results.data});
    });
  }
  }
  setSearch(event) {
    this.setState({title: event.target.value});
  }

  getMovies() {
    this.setState({showFaves: false});
    // make an axios request to your server on the GET SEARCH endpoint
    axios(`/search?title=${this.state.title}`).then((results) => {
      this.setState({movies: results.data});
    });
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }
  addFave(movie) {
    var faves = this.state.favorites;
    faves[movie.id] = movie;
    this.setState({favorites: faves});
  }
  deleteFave(id) {
    var faves = this.state.favorites;
    delete faves[id];
    this.setState({favorites: faves});
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search getGenres={this.getGenres} 
          swapFavorites={this.swapFavorites} 
          showFaves={this.state.showFaves} 
          setSearch={this.setSearch} 
          getMovies={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} 
          showFaves={this.state.showFaves}
          addFave={this.addFave}
          deleteFave={this.deleteFave}
          showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));