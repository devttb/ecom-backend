export default () => ({
  PORT: process.env.PORT,
  ROOT_URL: process.env.ROOT_URL || 'http://localhost:3000',
});
