const route = require('express').Router();
const userController = require("../controllers/user.controller");
const { validID, validUser } = require('../middlewares/global.middleweres')

route.post("/", userController.create);
route.get("/", userController.findAll);
route.get("/:id", validID, validUser, userController.findById);
route.patch("/:id", validID, validUser, userController.update);


module.exports = route;