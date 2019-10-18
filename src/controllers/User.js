const { findByOne, create } = require('../models/Query');
const {
  messageResponse,
  generatePassword,
  verifyPassword,
  generateToken
} = require('../helpers/index');
class User {
  /**
   *
   * @param {req} req
   * @param {res} res
   * @return {object}
   */
  async create(req, res) {
    try {
      const tableName = 'users';
      const { username, email, password } = req.body;
      const genPassword = await generatePassword(password);
      const columns = ['username', 'email', 'password'];
      const values = [username.toLowerCase(), email, genPassword];
      const save = await create(tableName, columns, values);
      const message = {
        success: true,
        message: 'Your account has been created successfully',
        data: save
      };
      return messageResponse(res, 201, message);
    } catch (error) {
      const errorMessage = {
        error: 'sorry something wrong please try again.'
      };
      return messageResponse(res, 500, errorMessage);
    }
  }

  /**
   *
   * @param {req} req
   * @param {res} res
   * @return {object}
   */
  async login(req, res) {
    try {
      const tableName = 'users';
      const column = 'email';
      const { email, password } = req.body;
      const checkEmail = await findByOne(tableName, column, email);
      if (!checkEmail) {
        const errors = {
          error: 'sorry we dont have account associated to this email'
        };
        return messageResponse(res, 404, errors);
      }
      // check password
      const checkPassword = await verifyPassword(password, checkEmail.password);
      const errors = {
        error: 'Authentication failed. email and password are incorrect'
      };
      if (!checkPassword) return messageResponse(res, 401, errors);
      const payload = {
        id: checkEmail.id,
        username: checkEmail.username
      };
      const token = await generateToken(payload);
      //
      const returnInformation = {
        success: true,
        message: `Welcome ${checkEmail.username}`,
        token
      };
      return messageResponse(res, 200, returnInformation);
    } catch (error) {
      const errorMessage = {
        error: 'An error occurred while login to your account.'
      };
      return messageResponse(res, 500, errorMessage);
    }
  }

  /**
   *
   * @param {req} req
   * @param {res} res
   * @return {object}
   */
  LoggedInUser(req, res) {
    const { username, email, isAdmin } = req.user;
    const user = {
      username,
      email,
      isAdmin
    };
    return messageResponse(res, 200, user);
  }
}

module.exports = new User();
