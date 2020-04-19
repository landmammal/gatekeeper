const db = require("../models");
const User = db.User;
// compares user input to db input and creates a session for them.
exports.loginUser = async (req, res, next) => {};

// adds users to db, validates inputs and creates sessions
exports.registerUser = async (req, res, next) => {
  // if (
  //   req.body.email &&
  //   req.body.fullname &&
  //   req.body.password &&
  //   req.body.confirmPassword
  // ) {
  //   // confirm passwords match
  //   if (req.body.password !== req.body.confirmPassword) {
  //     let err = new Error("Passwords don't match.");
  //     err.status = 400;
  //     return next(err);
  //   }
  //   // create object with form input
  //   let userDetails = {
  //     email: req.body.email,
  //     fullname: req.body.fullname,
  //     password: req.body.password,
  //   };
  //   // insert new user into mongo db
  //   await User.create(userDetails, (err, user) => {
  //     if (err) {
  //       return next(err);
  //     } else {
  //       // jwt token
  //       req.session.userId = user._id;
  //       return res.redirect("/");
  //     }
  //   });
  // } else {
  //   let err = new Error("All fields required.");
  //   err.status = 400;
  //   return next(err);
  // }
};
