const {Router} = require("express");

const SessionsControler =  require("../controller/SessionsController");
const sessionscontroller = new SessionsControler();

const sessionRoutes = Router();

sessionRoutes.post("/", sessionscontroller.create);

module.exports = sessionRoutes;