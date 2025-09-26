export default () => ({
  JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY,
  JWT_ACCESS_EXPIRESIN: '1h',
  JWT_REFESH_KEY: process.env.JWT_RESFRESH_KEY,
  JWT_REFESH_EXPIRESIN: '48h',
  JWT_VERIFY_KEY: process.env.JWT_VERIFY_KEY,
  JWT_VERIFY_EXPIRESIN: '15m',
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
});
