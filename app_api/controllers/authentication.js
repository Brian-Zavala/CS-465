const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ "message": "All fields required" });
  }

  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save()
    .then(() => {
      const token = user.generateJwt();
      res
        .status(200)
        .json({ token });
    })
    .catch((err) => {
      res
        .status(400)
        .json(err);
    });
};

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ "message": "All fields required" });
  }

  // Use Passport to authenticate the user
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res
        .status(404)
        .json(err);
    }
    // If login is successful, return a JWT to the client
    if (user) {
      const token = user.generateJwt();
      res
        .status(200)
        .json({ token });
    } else {
      res
        .status(401)
        .json(info);
    }
  })(req, res);
};

// Helper method to look up a user based on the JWT payload
const getUser = (req, res, callback) => {
  if (req.auth && req.auth.email) {
    User
      .findOne({ email: req.auth.email })
      .exec()
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ "message": "User not found" });
        }
        callback(req, res, user.name);
      })
      .catch((err) => {
        return res
          .status(404)
          .json(err);
      });
  } else {
    return res
      .status(404)
      .json({ "message": "User not found" });
  }
};

module.exports = {
  register,
  login,
  getUser
};
