const express = require("express");
const bodyParser = require("body-parser");
const EventEmitter = require("node:events");

// controllers
const get_delivers = require("../controllers/get_delivers");
const add_delivers = require("../controllers/add_delivers");
// const remove_all_myCoffees = require("../controllers/remove_all_myCoffees");

module.exports = function () {
  const emitter = new EventEmitter();
  const app = express.Router();
  app.use(bodyParser.json()); //  application/json
  app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded

  app.get("/delivers", (req, res) => {
    get_delivers.ServiceCall(req, res);
  });

  app.post("/add-deliver", (req, res) => {
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
    // await emitter.on("remove-myOrders", (myCoffees) => {
    // remove_all_myCoffees.ServiceCall(myCoffees);
    // console.log(myCoffees);
    // });
    add_delivers.ServiceCall(req, res);
    // console.log("bbbbbbbbbbbbb");
  });

  return app;
};
