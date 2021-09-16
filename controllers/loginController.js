const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const newSecret = 'secret123';

const generateToken = (result, jwtConfig) => {
  const { email, role, id } = result;
  const token = jwt.sign({ email, role, id }, newSecret, jwtConfig);
  return token;
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginService.validations(email, password);
    if (result) {
      const jwtConfig = {
        expiresIn: 60 * 60,
        algorithm: 'HS256',
      };
      const token = generateToken(result, jwtConfig);
      return res.status(200).json({ token });
    }
  } catch (error) {
    const { message } = error;
    return res.status(401).json({ message });
  }
};

module.exports = {
  login,
};