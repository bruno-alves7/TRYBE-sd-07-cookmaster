const jwt = require('jsonwebtoken');
const modelUser = require('../models/userModel');

const newSecret = 'secret123';

const validateToken = async (request, response, next) => {
  const token = request.headers.authorization;
  if (!token) {
    const ERROR = 401;
    return response.status(ERROR).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, newSecret);
    const user = await modelUser.getByEmail(decoded.email);

    if (!user) {
      const ERROR = 401;
      return response.status(ERROR).json({ message: 'missing auth token' });
    }
    request.user = user;
    next();
  } catch (error) {
    return response.status(401).json({ message: error.message });
  }
};

module.exports = validateToken;
