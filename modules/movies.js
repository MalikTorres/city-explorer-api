'use strict';
const axios = require('axios');

let cache = {};

// TODO: need to create a key for the data that I am going to store
// TODO: if the thing exists AND within a valid timeframe ... send the data from cache
// TODO: if the thing does not exist - call my API and cache that return from the API

async function getMovies(request, response, next) {
  try {

    let cityInfo = request.query.searchQuery;

    let key = `${cityInfo}-Movie`; // key = seattle-Movie
    //2.628e+9
    if (cache[key] && (Date.now() - cache[key].timestamp) < 10000) {

      // console.log('Cache was hit!');

      response.status(200).send(cache[key].data);

    } else {
      // console.log('No items in cache');

      // https://api.themoviedb.org/3/search/movie?api_key=<your MOVIE DB KEY>&query=<city info from frontend>
      // http://localhost:3001/movies?searchQuery=Seattle
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityInfo}`;

      const movieResults = await axios.get(url);

      let movieInfo = movieResults.data.results.map(movie => new Movie(movie));

      // **** BUILD IT INTO CACHE ****

      cache[key] = {
        data: movieInfo,
        timestamp: Date.now()
      };
      response.status(200).send(movieInfo);
    }

  } catch (error) {
    next(error.message);
  }

  // console.log(cache);
}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title,
    this.overview = movieObj.overview;
  }
}


module.exports = getMovies;




/* 

  // https://api.themoviedb.org/3/search/movie?api_key=<your MOVIE DB KEY>&query=<city info from frontend>
    // http://localhost:3001/movies?searchQuery=Seattle
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityInfo}`;

    const movieResults = await axios.get(url);

    let movieInfo = movieResults.data.results.map(movie => new Movie(movie));

    response.status(200).send(movieInfo);





*/