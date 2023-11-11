const express = require("express");
const bodyParser = require("body-parser");

// controllers
const get_coffees = require("../controllers/get_coffees");
const get_my_coffees = require("../controllers/get_my_coffees");
const add_coffee = require("../controllers/add_coffee");
const update_coffee = require("../controllers/update_coffee");
const remove_coffee = require("../controllers/remove_coffee");

module.exports = function () {
  const app = express.Router();
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.get("/coffees", (req, res) => {
    get_coffees.ServiceCall(req, res);
  });

  app.get("/my-coffees", (req, res) => {
    get_my_coffees.ServiceCall(req, res);
  });

  app.post("/add-coffee", async (req, res) => {
    add_coffee.ServiceCall(req, res);
  });

  app.post("/update-coffee", async (req, res) => {
    update_coffee.ServiceCall(req, res);
  });

  app.post("/remove-coffee", async (req, res) => {
    remove_coffee.ServiceCall(req, res);
  });

  return app;
};
