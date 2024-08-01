const { Router } = require("express");

const UsersController = require("../controller/UsersController");

const usersRouter = Router();

const userController = new UsersController();

usersRouter.post("/", userController.create)

module.exports = usersRouter