const db = require("../models");
const Tickets = db.tickets;

// Create and Save a new Project
exports.create = (req, res) => {
  // Validate request
  
  if (!req.body.description) {
    console.log(req.body)
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a user
  const ticket = new Tickets({
    status: req.body.status,
    description: req.body.description,
    projectId: req.body.projectId,
    assignUsers: req.body.assignUsers ? [...req.body.assignUsers] : []
  });
  // Save user in the database
  ticket
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
    const description = req.query.description;
    var condition = description ? { description: { $regex: new RegExp(description), $options: "i" } } : {};
    Tickets.find(condition)
      .then(data => {
        res.send(data);
        
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Ticktes."
        });
      });
};
// Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  // var condition = id ? { _id: { $regex: new RegExp(userName), $options: "i" } } : {};
  Tickets.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tickets with Tickedid= " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tickets with Ticketid=" + id });
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
  Tickets.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Ticket with id=${id}. Maybe Ticket was not found!`
        });
      } else res.send(req.body);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Ticket with id=" + id
      });
    });
};
// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Tickets.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Ticket with id=${id}. Maybe Users was not found!`
        });
      } else {
        res.send(id);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id
      });
    });
};

