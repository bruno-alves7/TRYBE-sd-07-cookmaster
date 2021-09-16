const userModel = require('../models/userModel');
const recipesService = require('./recipesService');

const ERR_MESSAGE = 'Invalid entries. Try again.';

const validateName = (name) => {
  if (!name) {
    throw new Error(ERR_MESSAGE);
  }
  return name;
};

const validateEmail = (email) => {
  if (!email) {
    throw new Error(ERR_MESSAGE);
  }
  if (email) {
    const regexEmail = /\S+@\S+\.\S+/;
    if (!regexEmail.test(email)) {
      throw new Error(ERR_MESSAGE);
    }
  }
};

const validatePassword = (password) => {
  if (!password) {
    throw new Error(ERR_MESSAGE);
  }
};

const checkingEmailExists = async (email1) => {
  const emailFunded = await userModel.getByEmail(email1);
  const MESSAGE = 'Email already registered';
  if (emailFunded !== null) {
    throw new Error(MESSAGE);
  }
};

const createUser = async (name, email, password) => {
  validateName(name);
  validateEmail(email);
  validatePassword(password);
  await checkingEmailExists(email);
  const user = await userModel.create(name, email, password);
  return user;
};

const createAdmin = async (name, email, password, token) => {
  const userIdToken = await recipesService.getUserIdByToken(token);
  if (userIdToken.role === 'admin') {
    validateName(name);
    validateEmail(email);
    validatePassword(password);
    await checkingEmailExists(email);
    const user = await userModel.createAdmin(name, email, password);
    return user;
  }
   throw new Error('role invalid');
};

module.exports = {
  createUser,
  createAdmin,
};
