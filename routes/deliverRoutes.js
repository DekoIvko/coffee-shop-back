const express = require("express");
const bodyParser = require("body-parser");

// controllers
const get_delivers = require("../controllers/get_delivers");
const add_delivers = require("../controllers/add_delivers");

module.exports = function () {
  const app = express.Router();
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.get("/delivers", (req, res) => {
    get_delivers.ServiceCall(req, res);
  });

  app.post("/add-deliver", (req, res) => {
    add_delivers.ServiceCall(req, res);
  });

  return app;
};
