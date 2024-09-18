const { Router } = require("express");

const NotesController = require("../controller/NotesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const notesRouter = Router();

const noteController = new NotesController();

notesRouter.use(ensureAuthenticated)

notesRouter.post("/", noteController.create);
notesRouter.get("/:id", noteController.show);
notesRouter.delete("/:id", noteController.delete)

module.exports = notesRouter