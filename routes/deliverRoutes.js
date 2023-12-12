const express = require("express");
const bodyParser = require("body-parser");
const EventEmitter = require("events");

// controllers
const get_delivers = require("../controllers/get_delivers");
const add_delivers = require("../controllers/add_delivers");

module.exports = function () {
  const emitter = new EventEmitter();
  const app = express.Router();
  app.use(bodyParser.json()); //  application/json
  app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded

  app.get("/delivers", (req, res) => {
    get_delivers.ServiceCall(req, res);
  });

  app.post("/add-deliver", async (req, res) => {
    console.log("deko deliver routes");
    emitter.on("add-deliver", (stream) => {
      console.log("stream ", stream);
    });
    add_delivers.ServiceCall(req, res);
  });

  return app;
};
