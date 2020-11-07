const axios = require('axios');
import React from 'react';

class MovieItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {faved: this.props.faved, x: 0, y: 0,
        src: this.props.movie.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${this.props.movie.poster_path}` :
        this.props.movie.backdrop_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${this.props.movie.backdrop_path}` :
    "https://lh3.googleusercontent.com/97gnjRiv2zIRnDupzfxYFoI-6zlIK3jKgb6KOCDf_tjWkY9epbITdSFIbiKhuccOqQ=w300"};
    this.over = this.over.bind(this);
    this.out = this.out.bind(this);
    this.faved = this.faved.bind(this);
    this.fave = this.fave.bind(this);
  }

  // Make an onClick for each list item. If the movies shown is the search results, 
  // onClick add it to the database (do it in the main app, and pass down the function)
  over(event) {
    //this.setState({overview: true, x: event.clientX, y: event.clientY});
  }
  out() {
    //this.setState({overview: true});
  }
  faved() {
    if (this.state.faved) {
    return (<div style={{position: 'absolute'}}>&#x2714;</div>)
    }
  }
//   (<div style={{position: 'absolute',
//     backgroundColor: 'white',
//     fontSize: '0.65rem',
//     width: '200px',
//     left: this.state.x,
//     top: this.state.y}}>
//         {this.props.movie.overview}</div>);
  fave() {
      if (this.state.faved) {
        axios.post(`/delete?id=${this.props.movie.id}`).then(() => {
            this.props.deleteFave(this.props.movie.id);
            this.setState({faved: false});
        });
      } else {
    axios({ method: 'post',
        url: `/save?id=${this.props.movie.id}`,
    data: this.props.movie}).then(() => {
        this.props.addFave(this.props.movie);
        this.setState({faved: true});
    });
}
  }
  render() {
    return (
        <li className="movie_item"  onClick={this.fave}>
            <img src={this.state.src} onMouseOver={this.over} onMouseOut={this.out}/>
            <div className="movie_description">
            <h2>{this.props.movie.title}</h2>
            {this.faved()}
              <section className="movie_details">
                <div className="movie_year">
                  <span className="title">Release Date</span>
                    <span>{this.props.movie.release_date}</span>
                </div>
                <div className="movie_rating">
                  <span className="title">Rating</span>
                  <span>{this.props.movie.vote_average}</span>
                </div>
              </section>
            </div>
          </li>
    );
  }
}

export default MovieItem;