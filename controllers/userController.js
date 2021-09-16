const userService = require('../services/userService');

const CREATE = 201;
const ERROR = 400;
const ERRORCREATE = 403;
const CONFLICT = 409;

const userCreate = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const user = await userService.createUser(
      name,
      email,
      password,
    );
    
    return response.status(CREATE).json({ user });
  } catch (error) {
    console.error(error);

    const { message } = error;
    if (message.includes('registered')) {
      return response.status(CONFLICT).json({ message });
    }
    return response.status(ERROR).json({ message: error.message });
  }
};

const adminCreate = async (request, response) => {
  const token = request.headers.authorization;
  try {
    const { name, email, password } = request.body;
    const user = await userService.createAdmin(
      name, email, password, token,
    );
    
    return response.status(CREATE).json({ user });
  } catch (error) {
    console.error(error);

    const { message } = error;
    if (message.includes('registered')) {
      return response.status(CONFLICT).json({ message });
    }
    return response.status(ERRORCREATE).json({ message: 'Only admins can register new admins' });
  }
};

module.exports = {
  userCreate,
  adminCreate,
};
