const { Router } = require("express");

const NotesController = require("../controller/NotesController");

const notesRouter = Router();

const noteController = new NotesController();

notesRouter.post("/:user_id", noteController.create);
notesRouter.get("/:id", noteController.show);
notesRouter.delete("/:id", noteController.delete)

module.exports = notesRouter