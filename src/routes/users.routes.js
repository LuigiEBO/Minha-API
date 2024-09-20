const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload")

const UsersController = require("../controller/UsersController");
const AvatarController = require("../controller/AvatarController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRouter = Router();
const upload = multer(uploadConfig.MULTER);

const userController = new UsersController();
const avatarController = new AvatarController();

usersRouter.post("/", userController.create);
usersRouter.put("/", ensureAuthenticated, userController.update);
usersRouter.patch("/avatar", ensureAuthenticated, upload.single("avatar"), avatarController.update)

module.exports = usersRouter