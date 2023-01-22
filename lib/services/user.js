'use strict';

const { Service } = require('@hapipal/schmervice'); 
const anthocrypt = require('@anthonylaval946/iut-encrypt');
const Jwt = require('@hapi/jwt');
const tokenKey = 'KecPqFmdio2dba5D9Z1A7FD3zeZ1Aad5DLAcc4eD2a3deggEdd5A';

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

  getAll(request) {
    const { User } = request.models();
    return User.query().select();
  }

  async deleteUserById(request) {
    const { id } = request.payload;
    const { User } = request.models();
    await User.query().deleteById(id);
  }
}

function generateToken(user) {
  return Jwt.token.generate(
    {
        aud: 'urn:audience:iut',
        iss: 'urn:issuer:iut',
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
