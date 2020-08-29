const Router = require("express").Router();
const getProfile = require("../controllers/GetProfile");
const updateProfile = require("../controllers/UpdateProfile");

Router.get("/:token", (req, res) => getProfile(req, res));
Router.post("/:token", (req, res) => updateProfile(req, res));

module.exports = Router;
