const db = require("../models");
const Users = db.users;
const bcrypt = require('bcryptjs')
// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  
  if (!req.body.userName) {
    console.log(req.body)
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a user
  const user = new Users({
    userName: req.body.userName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    isAdmin: req.body.isAdmin ? req.body.isAdmin : false

  });
  // Save user in the database
  user
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the USER."
      });
    });
};
// Retrieve all users from the database.
exports.findAll = (req, res) => {
    const userName = req.query.userName;
    var condition = userName ? { userName: { $regex: new RegExp(userName), $options: "i" } } : {};
    Users.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving USER."
        });
      });
};
// Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  // var condition = id ? { _id: { $regex: new RegExp(userName), $options: "i" } } : {};
  Users.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with userName " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving users with userName=" + id });
    });
};
// Update a user by the id in the request
exports.update = (req, res) => {
 if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};
// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Users.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Users with id=${id}. Maybe Users was not found!`
        });
      } else {
        res.send({
          message: "Users was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

