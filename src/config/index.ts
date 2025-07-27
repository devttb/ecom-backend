export const config = {
  JWT: {
    ACCESS: {
      SECRETKEY: process.env.JWT_ACCESS_KEY || 'access',
      EXPIRESIN: '1h',
    },
    REFESH: {
      SECRETKEY: process.env.JWT_RESFRESH_KEY || 'refresh',
      EXPIRESIN: '48h',
    },
  },
  SALT_ROUNDS: process.env.SALT_ROUNDS || '10',
};
