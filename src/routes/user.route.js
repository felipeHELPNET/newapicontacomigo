const route = require('express').Router();
const userController = require("../controllers/user.controller");

route.post("/", userController.create);
route.get("/", userController.findAll);
route.get("/:id", userController.findById);
route.patch("/:id", userController.update);


module.exports = route;