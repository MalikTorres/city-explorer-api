'use strict';
const axios = require('axios');

async function getMovies(request, response, next) {
  try {

    let cityInfo = request.query.searchQuery;
    // https://api.themoviedb.org/3/search/movie?api_key=<your MOVIE DB KEY>&query=<city info from frontend>
    // http://localhost:3001/movies?searchQuery=Seattle
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityInfo}`;

    const movieResults = await axios.get(url);

    let movieInfo = movieResults.data.results.map(movie => new Movie(movie));

    response.status(200).send(movieInfo);

  } catch (error) {
    next(error.message);
  }


}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title,
    this.overview = movieObj.overview;
  }
}


module.exports = getMovies;




