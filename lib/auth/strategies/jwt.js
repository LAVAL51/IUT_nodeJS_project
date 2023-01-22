'use strict';

module.exports = {
    scheme: 'jwt',
    options: {
      keys: 'KecPqFmdio2dba5D9Z1A7FD3zeZ1Aad5DLAcc4eD2a3deggEdd5A',
      verify: {
        aud: 'urn:audience:iut',
        iss: 'urn:issuer:iut',
        sub: false,
        nbf: true,
        exp: true,
        maxAgeSec: 14400, // 4 hours
        timeSkewSec: 15
      },
      validate: async (artifacts, request, h) => {

        return {
              isValid: true,
              credentials:  artifacts.decoded.payload
          };
      }
    }
};
