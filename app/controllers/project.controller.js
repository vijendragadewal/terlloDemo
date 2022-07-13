const db = require("../models");
const Projects = db.projects;

// Create and Save a new Project
exports.create = (req, res) => {
  // Validate request
  
  if (!req.body.projectName) {
    console.log(req.body)
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a user
  const project = new Projects({
    projectName: req.body.projectName,
    description: req.body.description,
    assignUsers: req.body.assignUsers ? [...req.body.assignUsers] : []
  });
  // Save user in the database
  project
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
    const projectName = req.query.projectName;
    var condition = projectName ? { projectName: { $regex: new RegExp(projectName), $options: "i" } } : {};
    Projects.find(condition)
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
  Projects.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with Project " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving users with Project=" + id });
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
  console.log('PROJECT UPDATE======>',req.body)
  Projects.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Projects.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
        res.status(404).send({
          message: `Cannot delete Project with id=${id}. Maybe Users was not found!`
        });
      } else {
        res.send({
          message: "Project was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id
      });
    });
};

