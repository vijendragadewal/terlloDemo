module.exports = app => {
    const projects = require("../controllers/project.controller.js");
    var router = require("express").Router();
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
   
    // Create a new project
    router.post("/", projects.create);
    // Retrieve all project
    router.get("/", projects.findAll);
    // // Retrieve a single project with id
     router.get("/:id", projects.findOne);
    // // Update a project with id
     router.put("/:id", projects.update);
    // // Delete a project with id
     router.delete("/:id", projects.delete);
     
    app.use('/api/projects', router);
  };