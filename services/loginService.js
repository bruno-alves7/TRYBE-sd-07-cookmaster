const loginModel = require('../models/loginModel');

let ERR_MESSAGE = 'All fields must be filled';

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
    ERR_MESSAGE = 'All fields must be filled';
    throw new Error(ERR_MESSAGE);
  }
};

const checkingEmail = async (email, password) => {
  const account = await loginModel.getByEmail(email);
  if (!account || account.password !== password) {
    ERR_MESSAGE = 'Incorrect username or password';
    throw new Error(ERR_MESSAGE);
  }
  return account;
};

const validations = async (email, password) => {
  validateEmail(email);
  validatePassword(password);
  const user = await checkingEmail(email, password);
  return user;
};

module.exports = {
  validations,
};