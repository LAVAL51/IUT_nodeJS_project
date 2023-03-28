'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');
const { ext } = require('@hapipal/toys');

module.exports = class Favories extends Model {
  static get tableName() {
    return 'favoris';
  }

  static get joiSchema() {
    return Joi.object({
      idUser: Joi.number().integer().greater(0),
      idMovie: Joi.number().integer().greater(0)
    })
  }

  static get idColumn() {
    return ['idUser', 'idMovie'];
  }
}