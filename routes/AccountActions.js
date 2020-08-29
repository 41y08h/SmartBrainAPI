const Router = require("express").Router();

const signUpUser = require("../controllers/SignUpUser");
const signInUser = require("../controllers/SignInUser");

Router.post("/signup", (req, res) => signUpUser(req, res));
Router.post("/signin", (req, res) => signInUser(req, res));

module.exports = Router;
