'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {
  static get tableName() {
    return 'user';
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer().greater(0),
      firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
      lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
      userName: Joi.string().min(3).example('johny').description('Username of the user'),
      password: Joi.string().min(8).example('Qkf5fAbSm').description('Password of the user'),
      mail: Joi.string().email({tlds: {allow: false}}).example('tartampion@gmail.com').description('Email of the user'),
      createdAt: Joi.date(),
      updatedAt: Joi.date()
    });
  }
s
  $beforeInsert(queryContext) {
    this.updatedAt = new Date();
    this.createdAt = this.updatedAt;
  }

  $beforeUpdate(opt, queryContext) {
    this.updatedAt = new Date();
  }
};