'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');
const Boom = require('@hapi/boom');

module.exports = class Movies extends Model {
  static createNotFoundError(queryContext, props) {
    return Boom.notFound();
  }

  static get tableName() {
    return 'movies';
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer().greater(0),
      title: Joi.string().min(1).example('Titanic').description('Titre du film'),
      discription: Joi.string().min(5).example('Rommance : Histoire du titanic, l imposant rafiot qui à coullé en 1912').description('Description du film'),
      releaseDate: Joi.date(),
      director: Joi.string().min(3).example("James Cameron").description("Nom du réalisateur"),
      createdAt: Joi.date(),
      updatedAt: Joi.date()
    })
  }

  $beforeInsert(queryContext) {
    this.updatedAt = new Date();
    this.createdAt = this.updatedAt;
  }

  $beforeUpdate(opt, queryContext) {
    this.updatedAt = new Date();
  }
}