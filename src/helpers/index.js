const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const { secretOrKey } = process.env;
// return message response
exports.messageResponse = (res, status, data) => {
  return res.status(status).json(data);
};

// generate password hash
exports.generatePassword = async (value) => {
  const password = await bcrypt.hashSync(value, 10);
  return password;
};

// verify password
exports.verifyPassword = async (value, dbPassword) => {
  const password = await bcrypt.compareSync(value, dbPassword);
  return password;
};

//generate token
exports.generateToken = async (payload) => {
  console.log(payload);
  const token = await jwt.sign(payload, secretOrKey, { expiresIn: '24h' });
  return token;
};

exports.checkToken = async (token) => {
  const decoded = await jwt.verify(token, secretOrKey);
  return decoded;
};
