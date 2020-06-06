require("dotenv/config");
const jwt = require("jsonwebtoken");

const db = require("../models");

// const User = db.User;
// compares user input to db input and creates a session for them.
exports.loginUser = async (req, res, next) => {};

// adds users to db, validates inputs and creates sessions
exports.registerUser = async (req, res, next) => {
  if (
    req.body.email &&
    req.body.fullname &&
    req.body.password &&
    req.body.confirmPassword
  ) {
    // confirm passwords match
    if (req.body.password !== req.body.confirmPassword) {
      let err = new Error("Passwords don't match.");
      err.status = 400;
      return next(err);
    }
    // create object with form input
    const userDetails = {
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password,
    };
    // insert new user into mongo db
    await db.User.create(userDetails, (err, user) => {
      if (err) {
        throw new Error("A User with that email is already register.");

        // return next(err);
      } else {
        // jwt token
        const payload = {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
        };

        jwt.sign({ payload }, "secret", { expiresIn: "1h" }, function (
          err,
          token
        ) {
          if (err) throw err;
          res.json({ user, token });
        });
      }
    });
  } else {
    let err = new Error(
      "All fields required [fullname, email, password, confirmPassword]."
    );
    err.status = 400;
    return next(err);
  }
};
