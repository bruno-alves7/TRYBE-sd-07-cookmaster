const connect = require('../config/connection');

const getByEmail = async (email) => { 
    const emailFunded = connect()
    .then((db) => db.collection('users')
    .findOne({ email }));
    return emailFunded;
  };

module.exports = {
    getByEmail, 
  };