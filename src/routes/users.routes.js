const { Router } = require("express");

const UsersController = require("../controller/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRouter = Router();

const userController = new UsersController();

usersRouter.post("/", userController.create);
usersRouter.put("/", ensureAuthenticated, userController.update)

module.exports = usersRouter