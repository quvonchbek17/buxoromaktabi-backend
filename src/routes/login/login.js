const { Login } = require("../../controllers/login/login")

const LoginRouter = require('express').Router();
const validate = require("../../middlewares/validation/validate")
const login = require("../../middlewares/validation/login/login")


LoginRouter.post("/", validate(login),  Login);


module.exports = LoginRouter;