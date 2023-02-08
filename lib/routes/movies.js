'use strict';

const Joi = require('joi');

module.exports = [
  {
    method: 'get',
    path: '/movies',
    options: {
      auth: {
        scope: ['user', 'admin'],
      },
      tags: ['api'],
    },
    handler: async (request, h) => {
      const { moviesService } = request.services();
      return await moviesService.getAll();
    },
  },

  {
    method: 'post',
    path: '/movies',
    options: {
      auth: {
        scope: ['admin'],
      },
      tags: ['api'],
      validate: {
        payload: Joi.object({
          title: Joi.string().min(1).example('Titanic').description('Titre du film'),
          discription: Joi.string().min(5).example('Rommance : Histoire du titanic, l imposant rafiot qui à coullé en 1912').description('Description du film'),
          releaseDate: Joi.string().example('1998-01-07').description('Date de sortie du film'),
          director: Joi.string().min(3).example("James Cameron").description("Nom du réalisateur"),
        })
      }
    },
    handler: async (request, h) => {
      const { moviesService } = request.services();
      const response = await moviesService.create(request.payload);
      return response;
    }
  },

  {
    method: 'patch',
    path: '/movies/{id}',
    options: {
      auth: {
        scope: ['admin'],
      },
      tags: ['api'],
      validate: {
        payload: Joi.object({
          id: Joi.number().integer().required().example(1).description('Id unique du film'),
          title: Joi.string().min(1).example('Titanic').description('Titre du film'),
          discription: Joi.string().min(5).example('Rommance : Histoire du titanic, l imposant rafiot qui à coullé en 1912').description('Description du film'),
          releaseDate: Joi.string().example('1998-01-07').description('Date de sortie du film'),
          director: Joi.string().min(3).example("James Cameron").description("Nom du réalisateur"),
        })
      }
    },
    handler: async (request, h) => {
      const { moviesService } = request.services();
      await moviesService.update(request.payload);
      return 'Movie edited';
    }
  },

  {
    method: 'delete',
    path: '/movies/{id}',
    options: {
      auth: {
        scope: ['admin'],
      },
      tags: ['api'],
      validate: {
        payload: Joi.object({
          id: Joi.number().integer().required().example(1).description('Id unique de l\'utilisateur'),
        })
      },
    },
    handler: async (request, h) => {
      const { moviesService } = request.services();
      await moviesService.deleteMovieById(request.payload);
      return 'Movie is been deleted';
    },
  }
];
