const connect = require('../config/connection');

const getAll = async () =>
  connect()
    .then((db) => db.collection('users').find().toArray());

const getByEmail = async (email) => { 
  const emailFunded = connect()
  .then((db) => db.collection('users')
  .findOne({ email }));
  return emailFunded;
};

const create = async (name, email, password) => {
    const role = 'user';
    const { insertedId } = await connect().then((db) =>
      db.collection('users').insertOne({ name, email, password, role }));
    return { _id: insertedId, name, email, password, role };
  };

  const createAdmin = async (name, email, password) => {
    const role = 'admin';
    const { insertedId } = await connect().then((db) =>
      db.collection('users').insertOne({ name, email, password, role }));
    return { _id: insertedId, name, email, password, role };
  };

module.exports = {
  getByEmail,
  create,
  getAll, 
  createAdmin,
};