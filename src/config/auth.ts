export default {
  jwt: {
    secret: 'MinhaHashSecret', //process.env.APP_SECRET-comentado para fins de test,
    expiresIn: '1d',
  },
};
