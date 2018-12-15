/*
 * Check Login MiddleWare
 * used for checking jwt token in the header and check if it's valid and if it's valid allow user
 * to access some routes
 */
const jwt = require('jsonwebtoken');
const User = require('../models/users');

let checkLogin = (req, res, next) => {
    // check if headers has authorization field that held the token
    if (req.headers.authorization === undefined) {
      res.status(401).send('permission denied');
    } else {
      // obtain token from request header
      const jwt_token = String(req.headers.authorization).split('bearer ')[1];
      console.log('jwt_token', jwt_token);
      try {
        // check if token is valid or not
        const data = jwt.decode(jwt_token, process.env.JWT_SECRET);
        console.log('valid token', data);
        User.findById(data._id).then(user => {
          // do some checks like if user has permission or not ex: user.level == '1' etc....
          next();
        }).catch(err => {
          // when user not found
          res.status(401).send(err);
        })
      } catch (err) {
        // when token is invalid or expired etc...
        console.log('err', err);
      }
    }
  };
  
  
  module.exports = checkLogin;