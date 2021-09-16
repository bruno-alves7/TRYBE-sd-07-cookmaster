const { ObjectId } = require('mongodb');
const connect = require('../config/connection');

const getAll = async () =>
  connect()
    .then((db) => db.collection('recipes').find().toArray());

const create = async (name, ingredients, preparation, userId) => {
    const { insertedId } = await connect().then((db) =>
      db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
    return { _id: insertedId, name, ingredients, preparation, userId };
  };

  const getById = async (id) => { 
    if (ObjectId.isValid(id)) {
    const recipe = connect()
    .then((db) => db.collection('recipes')
    .findOne(ObjectId(id)));
    return recipe;
    }
    return null;
  };

  const update = async (data) => {
    const { id, name, ingredients, preparation } = data;
    await connect().then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } }));
    const newRecipe = await getById(id);
    return newRecipe;
  };

  const remove = async (id) => {
    const removed = await connect()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
    return removed;
  };

  const addImage = async (data) => {
    const { id, name, ingredients, preparation } = data;
  
    await connect().then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) },
    { $set: { name, ingredients, preparation, image: `localhost:3000/images/${id}.jpeg` } }));
  
    return { _id: id, name, ingredients, preparation, image: `localhost:3000/images/${id}.jpeg` };
  };
  
module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  addImage,
};