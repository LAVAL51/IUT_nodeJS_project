'use strict';

const Joi = require('joi');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '0.0.0.0',
    port: 3306,
    user: 'root',
    password: 'hapi',
    database: 'user'
  }
})

module.exports = [
  {
    method: 'get',
    path: '/users',
    options: {
        tags: ['api'],
    },
    handler: async (request, h) => {
      const { User } = request.models();

      const user = await knex.select('id', 'firstname', 'lastname', 'createdAt', 'updatedAt')
      .from('user'); // knex.select('*').from('user');
      // return { Users : user};
      return user;
    },
  },
  {
    method: 'post',
    path: '/user',
    options: {
        tags: ['api'],
        validate: {
          payload: Joi.object({
            firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user')
          })
        }
    },
    handler: async (request, h) => {
      const user = await User.query().insertAndFetch({ 
        firstName: request.payload.firstName,
        lastName: request.payload.lastName});
        return user;
    }
  },
];

// {






  // method: 'post',
  // path: '/user',
  // options: {
  //   tags: ['api'],
  //   validate: {
  //     payload: Joi.object({
  //       firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
  //       lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user')
  //     })
  //   }
  // },

  // handler: async (request, h) => {
  //   const {User} = request.models();

  //   const user = await User.query().insertAndFetch({ firstName: request.payload.firstName, lastName: request.payload.lastName });
  //   return user;
  // }
// };
