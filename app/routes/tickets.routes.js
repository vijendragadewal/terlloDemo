module.exports = app => {
    const tickets = require("../controllers/tickets.controller.js");
    var router = require("express").Router();
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
   
    // Create a new tickets
    router.post("/", tickets.create);
    // Retrieve all tickets
    router.get("/", tickets.findAll);
    // // Retrieve a single tickets with id
     router.get("/:id", tickets.findOne);
    // // Update a tickets with id
     router.put("/:id", tickets.update);
    // // Delete a tickets with id
     router.delete("/:id", tickets.delete);
     
    app.use('/api/tickets', router);
  };