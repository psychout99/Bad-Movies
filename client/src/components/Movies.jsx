import React from 'react';
import MovieItem from './MovieItem.jsx';
const _ = require('underscore');

class Movies extends React.Component {
  constructor(props) {
    super(props)
  }

  // Make an onClick for each list item. If the movies shown is the search results, 
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)
  
  render() {
    return (
      <ul className="movies">
        {_.map(this.props.movies, (movie) => {
          return <MovieItem key={movie.id} movie={movie} 
          addFave={this.props.addFave} 
          deleteFave={this.props.deleteFave} 
          faved={this.props.showFaves}/>;
        })});
      </ul>
    );
  }
}

export default Movies;