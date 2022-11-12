import Auth from '../models/Auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    //hash the user password
    bcrypt.hash(password, 10, async (err, hash) => {
      let auth = new Auth(username, email, hash);

      //check if user already exists
      let [user, _] = await Auth.checkExisting(username, email);
      if (user.length) return res.status(409).json('User already exists!');

      //save the user to the database
      auth = await auth.save();
      return res.status(200).json('User has been created');
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  let { username, email, password } = req.body;

  try {
    //check if user exists
    let [user, _] = await Auth.checkExisting(username, email);
    if (user.length === 0) return res.status(404).json('User not found!');
    // Load hash from DB and compare to the front end value
    bcrypt.compare(password, user[0].password, (err, result) => {
      if (!result)
        return res.status(400).json('Username or Password is incorrect!');

      const token = jwt.sign({ id: user[0].id }, process.env.JWT_KEY);
      const { password, ...other } = user[0];
      res
        .cookie('access_token', token, {
          sameSite: 'none',
          // httpOnly: true,
          secure: true,
        })
        .status(200)
        .json(other);
    });
  } catch (error) {
    return res.json(err);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out');
};
