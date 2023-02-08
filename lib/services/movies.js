'use strict';

const { Service } = require('@hapipal/schmervice'); 

module.exports = class MoviesService extends Service {
  async create(movie) {
    const { Movies } = this.server.models();
    movie.releaseDate = new Date(movie.releaseDate);
    return Movies.query().insertAndFetch(movie);
  }

  async getAll() {
    const { Movies } = this.server.models(); 
    return Movies.query().select();
  }

  async update(movie) {
    const { Movies } = this.server.models();
    if (movie.releaseDate) {
      movie.releaseDate = new Date(movie.releaseDate);
    }
    return Movies.query().patch(movie).findById(movie.id);
  }

  async deleteMovieById(movie) {
    const { Movies } = this.server.models();
    await Movies.query().deleteById(movie.id);
  }
};
