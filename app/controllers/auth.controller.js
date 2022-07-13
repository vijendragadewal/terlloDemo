const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { users } = require("../models");

exports.signup = (req, res) => {
  const user = new users({
    userName: req.body.userName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    isAdmin: req.body.isAdmin,
  });

  user.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ msg: "User Register Successfully...." });
  });
};

exports.signin = (req, res) => {
  console.log(req.body);
  users
    .findOne({
      userName: req.body.userName,
    })
    .populate("-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({user:{ id: user.id,userName: user.userName, isAdmin: user.isAdmin, }}, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user.id,
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin,
        accessToken: token,
      });
    });
};
