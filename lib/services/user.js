'use strict';

require('dotenv').config();
const Boom = require('@hapi/boom');

const { Service } = require('@hapipal/schmervice'); 
const anthocrypt = require('@anthonylaval946/iut-encrypt');
const Jwt = require('@hapi/jwt');
const tokenKey = process.env.API_KEY;

module.exports = class UserService extends Service {
  async login(user) {
    try {
      const { User } = this.server.models();
      const userSearch = await User.query().findOne({
        mail: user.mail
      });
      const isValidPassword = await anthocrypt.compare(user.password, userSearch.password);
  
      if (isValidPassword){
        const token = generateToken(userSearch);
        return {token: token}
      }
      return {login: "invalid password"};
    } catch (error) {
      return {statusCode: 401, "error": "Unauthorized"};
    }

  }

  async create(user) {
    const { User } = this.server.models();
    const passwordEncrypt = await anthocrypt.hash(user.password);
    user.password = passwordEncrypt;
    return User.query().insertAndFetch(user);
  }

  async update(user) {
    const { User } = this.server.models();
    if (user.password) {
      const passwordEncrypt = await anthocrypt.hash(user.password);
      user.password = passwordEncrypt;
    }
    return User.query().patch(user).findById(user.id);
  }

  getAll() {
    const { User } = this.server.models();
    return User.query().select();
  }

  async deleteUserById(request) {
    const { User } = this.server.models();
    const { id } = request.payload;
    await User.query().deleteById(id);
  }

  async getAllFavorites(request) {
    const { Favories } = this.server.models();

    return Favories.query().select().where('idUser', '=', request.auth.credentials.id);
  }

  async addFavorite(idUser, idMovie) {
    const { Movies, Favories } = this.server.models();

    await Movies.query().findById(idMovie).throwIfNotFound();

    const favorite = await Favories.query().select().where({
      'idUser': idUser,
      'idMovie': idMovie
    });

    if (favorite.length !== 0) {
      throw Boom.conflict();
    }

    return Favories.query().insertAndFetch({'idUser': idUser, 'idMovie': idMovie});
  }

  async removeFavorite(idUser, idMovie) {
    const { Movies, Favories } = this.server.models();

    await Movies.query().findById(idMovie).throwIfNotFound();

    const favorite = await Favories.query().select().where({
      'idUser': idUser,
      'idMovie': idMovie
    });

    if (favorite.length === 0) {
      throw Boom.conflict();
    }

    return Favories.query().delete().where({
      'idUser': idUser,
      'idMovie': idMovie
    })
  }
}

function generateToken(user) {
  return Jwt.token.generate(
    {
        aud: 'urn:audience:iut',
        iss: 'urn:issuer:iut',
        id: user.id,
        userName: user.userName,
        firstName: user.firstName,
        scope: user.role,
        lastName: user.lastName,
        email: user.mail,
    },
    {
        key: tokenKey, // La clé qui est définit dans lib/auth/strategies/jwt.js
        algorithm: 'HS512'
    },
    {
        ttlSec: 14400 // 4 hours
    }
  );
};
