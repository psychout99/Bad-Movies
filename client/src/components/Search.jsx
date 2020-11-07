const axios = require('axios');
import React from 'react';
const _ = require('underscore');
const { API_KEY } = require('../../../config.js');

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
    this.getGenres.bind(this);
    this.getGenres();
  }
  getGenres() {
    axios(`http://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`).then((data) => {
      this.setState({genres: data.data.genres});
    })
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
  }
  
  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.props.getGenres}>
          <option>Genres</option>
          {_.map(this.state.genres, (genre) => {
            return (<option key={genre.id} value={genre.id}>{genre.name}</option>);
          })}
        </select>
        <br/><br/>

        <input onChange={this.props.setSearch}></input><button onClick={this.props.getMovies}>Search</button>

      </div>
    );
  }
}

export default Search;